import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import { addBikeUseCase } from "../../core/bike/usecases/add.bike.usecases";
import { ABike } from "../../core/entities/bike/IBike";
import Swal from "sweetalert2";

interface CreateBikeProps {
  onBikeCreated: () => void;
  onCancel: () => void;
}

const CreateBike: React.FC<CreateBikeProps> = ({ onBikeCreated, onCancel }) => {
  const [bike, setBike] = useState<ABike>({
    identificationCode: '',
    idCurrentStation: 0,
    idGpsDeviceCurrent: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBike((prevBike) => ({
      ...prevBike,
      [name]: name === 'idCurrentStation' || name === 'idGpsDeviceCurrent' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await addBikeUseCase.execute(bike);
      setSuccess(true);
      onBikeCreated();
      // Reinicia el estado de bike después de crearla
      setBike({
        identificationCode: '',
        idCurrentStation: 0,
        idGpsDeviceCurrent: 0,
      });
      Swal.fire({
        title: '¡Éxito!',
        text: 'La Bici ha sido creado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });;
    } catch (err : any) {
      onCancel();
      console.error('Error al crear la Bici', err);
      const errorMessage = err || 'Hubo un problema al crear la Bici.';
  
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
      <Typography variant="h6">Crear Bicicleta</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Código de Identificación"
          name="identificationCode"
          value={bike.identificationCode}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="ID Estación Actual"
          name="idCurrentStation"
          type="number"
          value={bike.idCurrentStation}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="ID Dispositivo GPS Actual"
          name="idGpsDeviceCurrent"
          type="number"
          value={bike.idGpsDeviceCurrent}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Grid container spacing={2} justifyContent="flex-end" mb={2}>
          <Grid item>
            <Button color="secondary" onClick={onCancel} style={{ marginRight: 8 }}>
              Salir
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? 'Cargando...' : 'Crear Bicicleta'}
            </Button>
          </Grid>
        </Grid>
        {success && <Typography color="primary">Bicicleta creada con éxito.</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </Paper>
  );
};

export default CreateBike;
