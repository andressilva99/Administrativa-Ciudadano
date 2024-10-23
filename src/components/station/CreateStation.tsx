import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  MenuItem,
  IconButton,
} from "@mui/material";
import { addStationUseCase } from "../../core/station/usecases/add.station.usecases";
import { AStation } from "../../core/entities/station/IStation";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import Swal from "sweetalert2";

interface CreateStationProps {
  onStationCreated: () => void;
  onCancel: () => void;
}

const diasSemana = [
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
  { value: 7, label: "Domingo" },
];

const CreateStation: React.FC<CreateStationProps> = ({ onStationCreated, onCancel }) => {
  const [station, setStation] = useState<AStation>({
    name: '',
    address: '',
    geolocation: '',
    horariosFuncionamiento: {
      horariosSemana: [],
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStation((prevStation) => ({
      ...prevStation,
      [name]: value,
    }));
  };

  const handleDayChange = (index: number, diaSemana: number) => {
    const updatedDias = [...station.horariosFuncionamiento.horariosSemana];
    updatedDias[index].diaSemana = diaSemana;
    setStation((prev) => ({
      ...prev,
      horariosFuncionamiento: { horariosSemana: updatedDias },
    }));
  };

  const handleAddDay = () => {
    setStation((prev) => ({
      ...prev,
      horariosFuncionamiento: {
        horariosSemana: [
          ...prev.horariosFuncionamiento.horariosSemana,
          { diaSemana: 1, horarios: [] },
        ],
      },
    }));
  };

  const handleRemoveDay = (index: number) => {
    const updatedDias = [...station.horariosFuncionamiento.horariosSemana];
    updatedDias.splice(index, 1);
    setStation((prev) => ({
      ...prev,
      horariosFuncionamiento: { horariosSemana: updatedDias },
    }));
  };

  const handleAddSchedule = (dayIndex: number) => {
    const updatedDias = [...station.horariosFuncionamiento.horariosSemana];
    updatedDias[dayIndex].horarios.push({ horaInicio: [0, 0], horaFin: [0, 0] });
    setStation((prev) => ({
      ...prev,
      horariosFuncionamiento: { horariosSemana: updatedDias },
    }));
  };

  const handleRemoveSchedule = (dayIndex: number, scheduleIndex: number) => {
    const updatedDias = [...station.horariosFuncionamiento.horariosSemana];
    updatedDias[dayIndex].horarios.splice(scheduleIndex, 1);
    setStation((prev) => ({
      ...prev,
      horariosFuncionamiento: { horariosSemana: updatedDias },
    }));
  };

  const handleScheduleChange = (dayIndex: number, scheduleIndex: number, field: "horaInicio" | "horaFin", value: string) => {
    const [hour, minute] = value.split(":").map(Number);
    const updatedDias = [...station.horariosFuncionamiento.horariosSemana];
    updatedDias[dayIndex].horarios[scheduleIndex][field] = [hour, minute];
    setStation((prev) => ({
      ...prev,
      horariosFuncionamiento: { horariosSemana: updatedDias },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await addStationUseCase.execute(station);
      setSuccess(true);
      onStationCreated();
      // Reinicia el estado de station después de crearla
      setStation({
        name: '',
        address: '',
        geolocation: '',
        horariosFuncionamiento: {
          horariosSemana: [],
        },
      });
      Swal.fire({
        title: '¡Éxito!',
        text: 'La Estación ha sido creado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });;
    } catch (err : any) {
      onCancel();
      console.error('Error al crear la Estación', err);
      const errorMessage = err || 'Hubo un problema al crear la Estación.';
  
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6">Crear Estación</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="name"
          value={station.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Dirección"
          name="address"
          value={station.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Geolocalización"
          name="geolocation"
          value={station.geolocation}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <Typography variant="subtitle1" style={{ marginTop: 16 }}>Horarios de Funcionamiento</Typography>
        {station.horariosFuncionamiento.horariosSemana.map((dia, dayIndex) => (
          <Paper key={dayIndex} style={{ padding: 8, marginBottom: 8 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <TextField
                  select
                  label="Día de la semana"
                  value={dia.diaSemana}
                  onChange={(e) => handleDayChange(dayIndex, parseInt(e.target.value, 10))}
                  fullWidth
                >
                  {diasSemana.map((dia) => (
                    <MenuItem key={dia.value} value={dia.value}>{dia.label}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <IconButton onClick={() => handleRemoveDay(dayIndex)}>
                  <RemoveIcon />
                </IconButton>
              </Grid>
            </Grid>

            {dia.horarios.map((horario, scheduleIndex) => (
              <Grid container spacing={2} key={scheduleIndex} style={{ marginTop: 8 }}>
                <Grid item xs={5}>
                  <TextField
                    label="Hora de Inicio"
                    type="time"
                    value={`${String(horario.horaInicio[0]).padStart(2, '0')}:${String(horario.horaInicio[1]).padStart(2, '0')}`}
                    onChange={(e) => handleScheduleChange(dayIndex, scheduleIndex, 'horaInicio', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    label="Hora de Fin"
                    type="time"
                    value={`${String(horario.horaFin[0]).padStart(2, '0')}:${String(horario.horaFin[1]).padStart(2, '0')}`}
                    onChange={(e) => handleScheduleChange(dayIndex, scheduleIndex, 'horaFin', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <IconButton onClick={() => handleRemoveSchedule(dayIndex, scheduleIndex)}>
                    <RemoveIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}

            <Button
              onClick={() => handleAddSchedule(dayIndex)}
              startIcon={<AddIcon />}
              size="small"
              color="primary"
            >
              Agregar Horario
            </Button>
          </Paper>
        ))}

        <Button
          onClick={handleAddDay}
          startIcon={<AddIcon />}
          color="primary"
          variant="outlined"
          style={{ marginBottom: 16 }}
        >
          Agregar Día
        </Button>

        <Grid container spacing={2} justifyContent="flex-end" mb={2}>
          <Grid item>
            <Button color="secondary" onClick={onCancel} style={{ marginRight: 8 }}>
              Salir
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? 'Cargando...' : 'Crear Estación'}
            </Button>
          </Grid>
        </Grid>
        {success && <Typography color="primary">Estación creada con éxito.</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </Paper>
  );
};

export default CreateStation;
