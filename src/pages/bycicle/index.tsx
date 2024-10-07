import { BrowserMultiFormatReader } from '@zxing/browser';
import React, { useState } from 'react';
import { CustomError } from '../../core/errors/CustomError';
import { BicycleUseCase } from '../../core/use-cases/bicycle/BicycleUseCase';
import { ApiService } from '../../infrastructure/http/ApiService';
import { BycicleRepo } from '../../infrastructure/repository/BicycleRepository';

const ByciclePage: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [citizen, setCitizen] = useState<any>(null);  // Para almacenar la info del ciudadano
  const [bicycles, setBicycles] = useState<any[]>([]); // Lista de bicicletas disponibles
  const [stationId, setStationId] = useState<number>(0);
  const [selectedBicycle, setSelectedBicycle] = useState<any>(null); // Bicicleta seleccionada
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const reader = new BrowserMultiFormatReader();

  // Inicialización del caso de uso
  const apiService = new ApiService();
  const bicycleRepo = new BycicleRepo(apiService);
  const bycicleUseCase = new BicycleUseCase(bicycleRepo);

  // Manejo del escaneo de la cámara
  const startScan = async () => {
    try {
      setIsScanning(true);
      const videoInputDevices = await BrowserMultiFormatReader.listVideoInputDevices();
  
      if (videoInputDevices.length === 0) {
        setError('No se encontraron cámaras.');
        return;
      }
  
      const selectedDeviceId = videoInputDevices[0].deviceId;
  
      reader.decodeFromVideoDevice(
        selectedDeviceId,
        'video', // ID del elemento <video> donde se mostrará la cámara
        (result, err) => {
          if (result) {
            setResult(result.getText());
            parseResult(result.getText());
            stopScan();  // Detener el escaneo al obtener un resultado
          }
          if (err && !(err instanceof CustomError)) {
            setError('Error al escanear el código. Asegúrate de que el código sea legible.');
            console.error(err);
          }
        }
      );
    } catch (err) {
      setError('Error al iniciar la cámara.');
      console.error(err);
    }
  };
  
  const stopScan = () => {
    setIsScanning(false);
    const videoElement = document.getElementById('video') as HTMLVideoElement;
    if (videoElement && videoElement.srcObject) {
      const stream = videoElement.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop()); // Detiene todas las pistas (cámara)
      videoElement.srcObject = null; // Libera el stream de la cámara
    }
  };
  

  const parseResult = async (_text: string) => {
    let dni = extractDNI(_text);

    if (dni) {
      try {
        const citizenData = await bycicleUseCase.scanDNI(dni); // Escaneo del DNI
        setCitizen(citizenData);
        setError('');

        if (stationId) {
          const availableBicycles = await bycicleUseCase.getAvailableBicycles(stationId); // Consulta de bicicletas
          setBicycles(availableBicycles);
        } else {
          setError('Por favor, selecciona una estación.');
        }
      } catch (err) {
        setError('Error al procesar el DNI o al obtener bicicletas.');
        console.error('Error en el proceso:', err);
      }
    } else {
      setError('Formato no válido. Verifica que el código sea legible.');
    }
  };

  // Método auxiliar para extraer el DNI del texto escaneado
  const extractDNI = (text: string): string | null => {
    let data = text.split('@');
    let dni = '';

    if (data.length === 8 || data.length === 9) {
      dni = data[4].trim();
    } else if (data.length === 15) {
      dni = data[1].trim();
    }

    // Valida que el DNI sea numérico y esté en un rango adecuado
    if (/^\d{7,8}$/.test(dni)) {
      return dni;
    } else {
      setError('DNI no válido. Asegúrate de que el código sea correcto.');
      return null;
    }
  };

  // Confirmar la entrega de la bicicleta seleccionada
  const handleConfirm = async () => {
    if (citizen && selectedBicycle) {
      try {
        await bycicleUseCase.confirmBicycleRequest(citizen.id, selectedBicycle.id);
        alert('Entrega confirmada');
      } catch (err) {
        setError('Error al confirmar la entrega.');
      }
    } else {
      setError('Por favor seleccione una bicicleta.');
    }
  };

  return (
    <div>
      <h1>Escanear DNI desde la cámara</h1>
      <div>
        {!isScanning ? (
          <button onClick={startScan}>Iniciar Escaneo</button>
        ) : (
          <button onClick={stopScan}>Detener Escaneo</button>
        )}
      </div>
      <div>
        <video id="video" width="300" height="200" style={{ border: '1px solid black' }}></video>
      </div>
      <div id="result">
        {error && <p className="error">{error}</p>}
        {result && <p className="success">{result}</p>}
      </div>

      {citizen && (
        <div>
          <h2>Ciudadano: {citizen.nombrePersona} {citizen.apellido}</h2>

          <label htmlFor="stationId">ID de la estación:</label>
          <input
            type="text"
            id="stationId"
            value={stationId}
            onChange={(e) => setStationId(Number(e.target.value))}
            placeholder="Ingresa el ID de la estación"
          />

          <h3>Bicicletas Disponibles:</h3>
          <ul>
            {bicycles.map((bike) => (
              <li key={bike.id} onClick={() => setSelectedBicycle(bike)}>
                Código: {bike.identificationCode} - Estado: {bike.enabled ? 'Habilitada' : 'Deshabilitada'}
              </li>
            ))}
          </ul>
          <button onClick={handleConfirm}>Confirmar Entrega</button>
        </div>
      )}
    </div>
  );
};

export default ByciclePage;
