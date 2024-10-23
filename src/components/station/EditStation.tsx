import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Grid,
} from '@mui/material';
import { EditStationProps, EStation } from '../../core/entities/station/IStation';
import { stationService } from '../../core/station/service/station.service';
import Swal from 'sweetalert2';

const EditStation: React.FC<EditStationProps> = ({ idStation, onCancel, onSuccess }) => {
  const [station, setStation] = useState<EStation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStation = async () => {
      setLoading(true);
      try {
        const data = await stationService.findById(idStation);
        setStation({
          ...data,
          idStation: data.idStation,
        });
      } catch (err) {
        console.error('Error fetching station', err);
        setError('Error fetching station');
      } finally {
        setLoading(false);
      }
    };

    fetchStation();
  }, [idStation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (station) {
      const { name, value } = e.target;
      setStation((prevStation) => ({
        ...prevStation!,
        [name]: value,
      }));
    }
  };

  const handleHorarioChange = (
    dayIndex: number,
    horarioIndex: number,
    field: 'horaInicio' | 'horaFin',
    value: string
  ) => {
    if (station) {
      const updatedHorarios = [...station.configuration.horariosFuncionamiento.horariosSemana];
      const [hours, minutes] = value.split(':').map(Number);
  
      // Validar si hours y minutes son números y están dentro del rango válido
      if (!isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
        const newHorarioValue: [number, number] = [hours, minutes]; // Convertir a [number, number]
  
        if (field === 'horaInicio') {
          updatedHorarios[dayIndex].horarios[horarioIndex].horaInicio = newHorarioValue; // Mantener como [number, number]
        } else if (field === 'horaFin') {
          updatedHorarios[dayIndex].horarios[horarioIndex].horaFin = newHorarioValue; // Mantener como [number, number]
        }
        setStation((prevStation) => ({
          ...prevStation!,
          configuration: {
            ...prevStation!.configuration,
            horariosFuncionamiento: {
              horariosSemana: updatedHorarios,
            },
          },
        }));
      } else {
        setError("Por favor, ingrese un formato de hora válido (HH:MM).");
      }
    }
  };
  const diaSemanaMap: { [key: number]: string } = {
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sábado',
    7: 'Domingo',
  };

  const handleSubmit = async () => {
    if (station) {
      setLoading(true);
      setError(null);
      setSuccess(false);
      try {
        const payload = {
          id: null,
          idStation: station.id,
          name: station.name,
          address: station.address,
          geolocation: station.geolocation,
          configuration: {
            ...station.configuration,
            horariosFuncionamiento: {
              horariosSemana: station.configuration.horariosFuncionamiento.horariosSemana.map(dia => ({
                diaSemana: dia.diaSemana,
                horarios: dia.horarios.map(horario => ({
                  horaInicio: horario.horaInicio, // Debería estar en formato "HH:MM:SS"
                  horaFin: horario.horaFin,       // Debería estar en formato "HH:MM:SS"
                })),
              })),
            },
          },
        };
  
        console.log('Cuerpo de la solicitud:', payload);
  
        await stationService.editStation(payload);
        setSuccess(true);
        onSuccess();
        Swal.fire({
          title: '¡Éxito!',
          text: 'La Estación ha sido editado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
      });
      } catch (err: any) {
        onCancel();
        console.error('Error al actualizar la Estación', err);
        const errorMessage = err || 'Hubo un problema al editar la Estación.';
    
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Aceptar'
      });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card>
      <CardContent style={{ paddingBottom: 0 }}>
        {loading && <Typography variant="body1">Cargando estación...</Typography>}
        {station && (
          <>
            <TextField
              label="ID de estación"
              name="idStation"
              value={station.id || ''}
              onChange={handleChange}
              type="number"
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label="Nombre"
              name="name"
              value={station.name || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Dirección"
              name="address"
              value={station.address || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Geolocalización"
              name="geolocation"
              value={station.geolocation || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

{station.configuration.horariosFuncionamiento.horariosSemana.map((dia, dayIndex) => (
  <div key={dayIndex}>
     <Typography variant="subtitle1">Día de la semana: {diaSemanaMap[dia.diaSemana] || dia.diaSemana}</Typography>
    <div style={{ marginBottom: '16px' }} /> 
    
    {dia.horarios.map((horario, horarioIndex) => (
      <Grid container spacing={2} key={horarioIndex}>
        <Grid item xs={6}>
          <TextField
            label="Hora Inicio (HH:MM)"
            type="time"
            value={`${String(horario.horaInicio[0]).padStart(2, '0')}:${String(horario.horaInicio[1]).padStart(2, '0')}`} // Asegurando el formato HH:MM
            onChange={(e) => {
              handleHorarioChange(dayIndex, horarioIndex, 'horaInicio', e.target.value); // No agregar ":00", ya que el input tipo time lo maneja
            }}
            fullWidth
            inputProps={{
              step: 300, // 5 minutos
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Hora Fin (HH:MM)"
            type="time"
            value={`${String(horario.horaFin[0]).padStart(2, '0')}:${String(horario.horaFin[1]).padStart(2, '0')}`} // Asegurando el formato HH:MM
            onChange={(e) => {
              handleHorarioChange(dayIndex, horarioIndex, 'horaFin', e.target.value); // No agregar ":00"
            }}
            fullWidth
            inputProps={{
              step: 300, // 5 minutos
            }}
          />
        </Grid>
      </Grid>
    ))}
  </div>
))}

            <Grid container spacing={2} justifyContent="flex-end" mb={2} mt={1}>
              <Grid item>
                <Button variant="outlined" color="secondary" onClick={onCancel}>
                  Salir
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Actualizar Estación'}
                </Button>
              </Grid>
            </Grid>
            {success && (
              <Typography variant="body1" color="success.main">
                Estación actualizada exitosamente!
              </Typography>
            )}
            {error && (
              <Typography variant="body1" color="error.main">
                {error}
              </Typography>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EditStation;
