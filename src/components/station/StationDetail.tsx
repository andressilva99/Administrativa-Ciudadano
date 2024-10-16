import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TablePagination,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IStation } from '../../core/entities/station/IStation'; // Asegúrate de que la ruta sea correcta
import { findStationUseCase } from '../../core/station/usecases/find.station.usecase'; // Asegúrate de que la ruta sea correcta
//import StationById from './StationById'; // Componente para ver detalles de la estación
//import EditStation from './EditStation'; // Componente para editar la estación

interface StationsDetailProps {
  updateTable: boolean;
}

const StationsDetail: React.FC<StationsDetailProps> = ({ updateTable }) => {
  const [stations, setStations] = useState<IStation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [viewStationId, setViewStationId] = useState<string | null>(null);
  const [openViewDialog, setOpenViewDialog] = useState<boolean>(false);
  const [editStationId, setEditStationId] = useState<string | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  const getStations = async (fetchAll: boolean = false) => {
    setLoading(true);
    try {
      const currentPage = fetchAll ? 0 : page;
      const pageSize = fetchAll ? total : size;
      const data = await findStationUseCase.execute(pageSize, currentPage);
      setStations(data.list);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching stations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStations();
  }, [page, size, updateTable]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewClick = (stationId: string) => {
    setViewStationId(stationId);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setViewStationId(null);
  };

  const handleEditClick = (stationId: string) => {
    setEditStationId(stationId);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditStationId(null);
  };

  const handleStationEditSuccess = () => {
    getStations(true);
    handleCloseEditDialog();
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Habilitada</TableCell>
                <TableCell>Horario</TableCell>
                <TableCell>Tsi</TableCell>
                <TableCell>Tsu</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stations.map((station) => (
                <TableRow key={station.id}>
                  <TableCell>{station.id}</TableCell>  
                  <TableCell>{station.name}</TableCell>
                  <TableCell>{station.address}</TableCell>
                  <TableCell>{station.enabled ? 'Sí' : 'No'}</TableCell>
                  <TableCell>{station.horarioString}</TableCell>
                  <TableCell>{station.tsi}</TableCell>
                  <TableCell>{station.tsu}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleViewClick(station.tsi)} aria-label="Ver estación">
                      <VisibilityIcon sx={{ color: 'secondary.main' }} />
                    </IconButton>
                    <IconButton onClick={() => handleEditClick(station.tsi)} aria-label="Editar estación">
                      <EditIcon sx={{ color: 'primary.main' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={size}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/*<Dialog open={openViewDialog} onClose={handleCloseViewDialog} maxWidth="md" fullWidth>
        <DialogTitle>Detalles de la Estación</DialogTitle>
        <DialogContent>
          {viewStationId && <StationById id={viewStationId} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog} color="secondary">
            Salir
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <DialogTitle>Editar Estación</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {editStationId !== null && (
            <EditStation
              idStation={editStationId}
              onCancel={handleCloseEditDialog}
              onSuccess={handleStationEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>*/}
    </>
  );
};

export default StationsDetail;
