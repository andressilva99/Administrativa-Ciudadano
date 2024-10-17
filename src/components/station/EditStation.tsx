import React, { useState, useEffect, ChangeEvent } from 'react';
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

const EditStation: React.FC<EditStationProps> = ({ idStation, onCancel, onSuccess }) => {
  const [station, setStation] = useState<EStation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStation = async () => {
      setLoading(true);
      setError(null); // Limpiar el error al comenzar a cargar
      try {
        const data = await stationService.findById(idStation);
        setStation(data); // Asignar directamente el objeto station
      } catch (err) {
        console.error('Error fetching station', err);
        setError('Error fetching station');
      } finally {
        setLoading(false);
      }
    };

    fetchStation();
  }, [idStation]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (station) {
      const { name, value } = e.target;

      setStation((prevStation) => ({
        ...prevStation!,
        [name]: value,
      }));
    }
  };

  const handleHorarioChange = (
    diaSemanaIndex: number,
    horarioIndex: number,
    field: 'horaInicio' | 'horaFin',
    value: string // Recibir como string
  ) => {
    if (station && station.horariosFuncionamiento.horariosSemana) {
      const updatedHorarios = [...station.horariosFuncionamiento.horariosSemana];
  
      const [hour, minute] = value.split(':').map(Number); // Convertir a número
      updatedHorarios[diaSemanaIndex].horarios[horarioIndex][field] = [hour, minute]; // Asignar como tupla
  
      setStation((prevStation) => ({
        ...prevStation!,
        horariosFuncionamiento: {
          ...prevStation!.horariosFuncionamiento,
          horariosSemana: updatedHorarios,
        },
      }));
    }
  };
  const handleSubmit = async () => {
    if (station) {
      setLoading(true);
      setError(null);
      setSuccess(false);
      try {
        const payload = {
          id: null,
          idStation: station.idStation,
          name: station.name,
          address: station.address,
          geolocation: station.geolocation,
          horariosFuncionamiento: {
            horariosSemana: station.horariosFuncionamiento.horariosSemana.map(dia => ({
              diaSemana: dia.diaSemana, // Asegúrate de que 'díaSemana' esté bien escrito
              horarios: dia.horarios.map(horario => ({
                horaInicio: horario.horaInicio,
                horaFin: horario.horaFin,
              })),
            })),
          },
        };

        console.log('Cuerpo de la solicitud:', payload);

        await stationService.editStation(payload);
        setSuccess(true);
        onSuccess();
      } catch (err) {
        console.error('Error updating station', err);
        setError('Error updating station');
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
              value={station.idStation || ''}
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

            <Typography variant="h6" gutterBottom>
              Horarios de Funcionamiento
            </Typography>
            {station.horariosFuncionamiento.horariosSemana?.map((dia, diaSemanaIndex) => (
              <div key={diaSemanaIndex}>
                <Typography variant="subtitle1">Día: {dia.diaSemana}</Typography>
                {dia.horarios?.map((horario, horarioIndex) => (
                  <Grid container spacing={2} key={horarioIndex}>
                    <Grid item xs={6}>
  <TextField
    label="Hora de Inicio"
    type="time"
    value={`${String(horario.horaInicio[0]).padStart(2, '0')}:${String(horario.horaInicio[1]).padStart(2, '0')}`}
    onChange={(e) => handleHorarioChange(diaSemanaIndex, horarioIndex, 'horaInicio', e.target.value)} // Aquí puedes pasar el valor directamente
    fullWidth
  />
</Grid>
<Grid item xs={6}>
  <TextField
    label="Hora de Fin"
    type="time"
    value={`${String(horario.horaFin[0]).padStart(2, '0')}:${String(horario.horaFin[1]).padStart(2, '0')}`}
    onChange={(e) => handleHorarioChange(diaSemanaIndex, horarioIndex, 'horaFin', e.target.value)} // Aquí puedes pasar el valor directamente
    fullWidth
  />
</Grid>
                  </Grid>
                ))}
              </div>
            ))}
            <Grid container spacing={2} justifyContent="flex-end" mt={2}>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={onCancel}
                >
                  Salir
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
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
