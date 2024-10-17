import React, { useState, useEffect } from 'react';
import {
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead
} from '@mui/material';
import { findByIdStationUseCase } from '../../core/station/usecases/findId.station.usecase';
import { ByIdStation } from '../../core/entities/station/IStation';

interface StationByIdProps {
  id: number; // Propiedad que recibirá el ID de la estación
}

const StationById: React.FC<StationByIdProps> = ({ id }) => {
  const [station, setStation] = useState<ByIdStation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStation = async () => {
      try {
        const data = await findByIdStationUseCase.execute(id);
        setStation(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStation();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!station) return <Typography>No station found</Typography>;

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
            <TableCell>{station.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*Nombre:</TableCell>
            <TableCell>{station.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*Dirección:</TableCell>
            <TableCell>{station.address}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*Geolocalización:</TableCell>
            <TableCell>{station.geolocation}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*Habilitada:</TableCell>
            <TableCell>{station.enabled ? 'Sí' : 'No'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*Eliminada:</TableCell>
            <TableCell>{station.deleted ? 'Sí' : 'No'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*Horarios:</TableCell>
            <TableCell>{station.horarioString}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*Timestamp de Creación:</TableCell>
            <TableCell>{station.tsi}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*Timestamp de Última Actualización:</TableCell>
            <TableCell>{station.tsu}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StationById;
