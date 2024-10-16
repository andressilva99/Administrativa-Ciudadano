import React, { useState, useEffect } from 'react';
import {
  Typography,
  CircularProgress,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Table,
} from '@mui/material';
import { IBike } from '../../core/entities/bike/IBike';
import { findByCodeBikeUseCase } from '../../core/bike/usecases/findCode.bike.usecases';

interface BikeByCodeProps {
  identificationCode: string;
}

const BikeByCode: React.FC<BikeByCodeProps> = ({ identificationCode }) => {
  const [bike, setBike] = useState<IBike | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBike = async () => {
      try {
        const data = await findByCodeBikeUseCase.execute(identificationCode);
        setBike(data);
      } catch (error) {
        console.error('Error fetching bike:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    getBike();
  }, [identificationCode]);

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
            <TableCell>*Identificación:</TableCell>
            <TableCell>{bike.identificationCode}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*ID de Slot Actual:</TableCell>
            <TableCell>{bike.idCurrentSlot || 'N/A'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*ID de Estación Actual:</TableCell>
            <TableCell>{bike.idCurrentStation || 'N/A'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*ID de GPS Actual:</TableCell>
            <TableCell>{bike.idGpsDeviceCurrent || 'N/A'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*Comentarios:</TableCell>
            <TableCell>{bike.comments || 'N/A'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*Configuración Vacía:</TableCell>
            <TableCell>{bike.configuration.empty ? 'Yes' : 'No'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*Habilitado:</TableCell>
            <TableCell>{bike.enabled ? 'Yes' : 'No'}</TableCell>
          </TableRow>          
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BikeByCode;
