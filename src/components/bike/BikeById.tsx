import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Table, TableBody, TableRow, TableCell, TableContainer, TableHead } from '@mui/material';
import { findByIdBikeUseCase } from '../../core/bike/usecases/findId.bike.usecases';
import { ByIdBike, BikeByIdProps } from '../../core/entities/bike/IBike';
import Swal from 'sweetalert2';

const BikeById: React.FC<BikeByIdProps> = ({ id, onCancel}) => {
  const [bike, setBike] = useState<ByIdBike | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const data = await findByIdBikeUseCase.execute(id);
        setBike(data);
      } catch (error) {
        if (error instanceof Error) {
          Swal.fire({
            title: 'Bici no encontrada',
            text: 'No se encontró la bici con el ID proporcionado.',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
          })
          onCancel();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBike();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!bike) return <Typography>No bike found</Typography>;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>*Campo</TableCell>
            <TableCell>Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>*ID:</TableCell>
            <TableCell>{bike.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*Código de Identificación:</TableCell>
            <TableCell>{bike.identificationCode}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*ID de Slot Actual:</TableCell>
            <TableCell>{bike.idCurrentSlot ?? 'N/A'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*ID de Estación Actual:</TableCell>
            <TableCell>{bike.idCurrentStation ?? 'N/A'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*ID de Dispositivo GPS Actual:</TableCell>
            <TableCell>{bike.idGpsDeviceCurrent ?? 'N/A'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*Comentarios:</TableCell>
            <TableCell>{bike.comments ?? 'Sin comentarios'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*Configuración Vacía:</TableCell>
            <TableCell>{bike.configuration.empty ? 'Sí' : 'No'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*Habilitada:</TableCell>
            <TableCell>{bike.enabled ? 'Sí' : 'No'}</TableCell>
          </TableRow>          
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BikeById;
