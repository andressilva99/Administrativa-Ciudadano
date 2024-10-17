import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Grid,
  Dialog,
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

      setStation(prevStation => ({
        ...prevStation!,
        [name]: value,
      }));
    }
  };

  const handleHorarioChange = (
    dayIndex: number,
    horarioIndex: number,
    field: string,
    value: string
  ) => {
    if (station) {
      const updatedHorarios = [...station.horariosFuncionamiento.horariosSemana];
      updatedHorarios[dayIndex].horarios[horarioIndex] = {
        ...updatedHorarios[dayIndex].horarios[horarioIndex],
        [field]: value,
      };

      setStation(prevStation => ({
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
          idStation: station.id,
          name: station.name,
          address: station.address,
          geolocation: station.geolocation,
          horariosFuncionamiento: station.horariosFuncionamiento,
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
           {/*} {station.horariosFuncionamiento.horariosSemana.map((dia, dayIndex) => (
              <div key={dayIndex}>
                <Typography variant="subtitle1">Día de la semana: {dia.diaSemana}</Typography>
                {dia.horarios.map((horario, horarioIndex) => (
                  <Grid container spacing={2} key={horarioIndex}>
                    <Grid item xs={6}>
                      <TextField
                        label="Hora Inicio"
                        value={horario.horaInicio}
                        onChange={(e) => handleHorarioChange(dayIndex, horarioIndex, 'horaInicio', e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Hora Fin"
                        value={horario.horaFin}
                        onChange={(e) => handleHorarioChange(dayIndex, horarioIndex, 'horaFin', e.target.value)}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                ))}
              </div>
            ))}*/}
            <Grid container spacing={2} justifyContent="flex-end" mb={2}>
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
