import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { EditBikeProps, EBike } from '../../core/entities/bike/IBike';
import { BikeService } from '../../core/bike/service/bike.service';

const bikeService = new BikeService();

const EditBike: React.FC<EditBikeProps> = ({ idBicycle, onCancel, onSuccess }) => {
  const [bike, setBike] = useState<EBike | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBike = async () => {
      setLoading(true);
      try {
        const data = await bikeService.findById(idBicycle);
        setBike({
          ...data,
          idBicycle: data.id,
          enabled: data.enabled
        });
      } catch (err) {
        console.error('Error fetching bike', err);
        setError('Error fetching bike');
      } finally {
        setLoading(false);
      }
    };

    fetchBike();
  }, [idBicycle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (bike) {
      const { name, type, value, checked } = e.target;

      const updatedValue = type === 'checkbox' ? checked : value;

      setBike(prevBike => ({
        ...prevBike!,
        [name]: updatedValue
      }));
    }
  };

  const handleSubmit = async () => {
    if (bike) {
      setLoading(true);
      setError(null);
      setSuccess(false);
      try {
        const payload = {
          id: null,
          idBicycle: bike.idBicycle,
          identificationCode: bike.identificationCode,
          idCurrentStation: bike.idCurrentStation ?? null,
          enabled: bike.enabled
        };

        console.log('Cuerpo de la solicitud:', payload);

        await bikeService.editBike(payload);
        setSuccess(true);
        onSuccess();
      } catch (err) {
        if (typeof err === "string") {
          console.error('Error updating bike', err);
          setError(err);
        } else {
          console.error('Unknown error updating bike', err);
          setError('Unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card>
      <CardContent style={{ paddingBottom: 0 }}>
        {loading && <Typography variant="body1">Cargando bicicleta...</Typography>}
        {bike && (
          <>
            <TextField
              label="ID de bicicleta"
              name="idBicycle"
              value={bike.idBicycle || ''}
              onChange={handleChange}
              type="number"
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label="Código de identificación"
              name="identificationCode"
              value={bike.identificationCode || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="ID de estación actual"
              name="idCurrentStation"
              value={bike.idCurrentStation || ''}
              onChange={handleChange}
              type="number"
              fullWidth
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="enabled"
                  checked={bike.enabled}
                  onChange={handleChange}
                />
              }
              label="Habilitado"
            />
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
                  {loading ? <CircularProgress size={24} /> : 'Actualizar Bicicleta'}
                </Button>
              </Grid>
            </Grid>
            {success && (
              <Typography variant="body1" color="success.main">
                Bicicleta actualizada exitosamente!
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

export default EditBike;
