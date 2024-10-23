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
import Swal from 'sweetalert2';

interface StationByIdProps {
  id: number,
  onCancel: () => void;
}

const StationById: React.FC<StationByIdProps> = ({ id, onCancel }) => {
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
          Swal.fire({
            title: 'Estación no encontrada',
            text: 'No se encontró la estación con el ID proporcionado.',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
          })
          onCancel();
        } 
      } finally {
        setLoading(false);
      }
    };

    fetchStation();
  }, [id]);

  const renderHorariosFuncionamiento = () => {
    if (!station?.configuration?.horariosFuncionamiento) return null;

    return station.configuration.horariosFuncionamiento.horariosSemana.map((dia, index) => (
      <TableRow key={index}>
        <TableCell>*Día Semana:</TableCell>
        <TableCell>{dia.diaSemana}</TableCell>
        <TableCell>Horarios:</TableCell>
        <TableCell>
          {dia.horarios.map((horario, idx) => (
            <div key={idx}>
              {`De ${horario.horaInicio.join(':')} a ${horario.horaFin.join(':')}`}
            </div>
          ))}
        </TableCell>
      </TableRow>
    ));
  };

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
            <TableCell>*TSI:</TableCell>
            <TableCell>{station.tsi}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*TSU:</TableCell>
            <TableCell>{station.tsu}</TableCell>
          </TableRow>
          {/* Render horariosFuncionamiento */}
          <TableRow>
            <TableCell colSpan={2}>
              <Typography variant="h6">Horarios de Funcionamiento:</Typography>
            </TableCell>
          </TableRow>
          {renderHorariosFuncionamiento()}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StationById;
