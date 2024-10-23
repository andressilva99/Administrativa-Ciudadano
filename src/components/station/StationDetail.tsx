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
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IStation } from '../../core/entities/station/IStation';
import { findStationUseCase } from '../../core/station/usecases/find.station.usecase';
import { deleteStationUseCase } from '../../core/station/usecases/delete.station.usecases';
import StationById from './StationById';
import EditStation from './EditStation';

interface StationsDetailProps {
  updateTable: boolean;
}

const StationsDetail: React.FC<StationsDetailProps> = ({ updateTable }) => {
  const [stations, setStations] = useState<IStation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [viewStationId, setViewStationId] = useState<number | null>(null);
  const [editStationId, setEditStationId] = useState<number | null>(null);
  const [deleteStationId, setDeleteStationId] = useState<number | null>(null);
  const [openViewDialog, setOpenViewDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

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

  const handleViewClick = (stationId: number) => {
    setViewStationId(stationId);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setViewStationId(null);
  };

  const handleEditClick = (stationId: number) => {
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

  const handleDeleteClick = (stationId: number) => {
    setDeleteStationId(stationId);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteStationId !== null) {
      try {
        await deleteStationUseCase.execute(deleteStationId);
        console.log(`Estación con ID ${deleteStationId} eliminada exitosamente.`);
        getStations(true); // Refresh the station list
      } catch (error) {
        console.error('Error eliminando la estación:', error);
      } finally {
        handleCloseDeleteDialog();
      }
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteStationId(null);
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
                  <TableCell>
                    <IconButton onClick={() => handleViewClick(station.id)} aria-label="Ver estación">
                      <VisibilityIcon sx={{ color: 'secondary.main' }} />
                    </IconButton>
                    <IconButton onClick={() => handleEditClick(station.id)} aria-label="Editar estación">
                      <EditIcon sx={{ color: 'primary.main' }} />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(station.id)} aria-label="Eliminar estación">
                      <DeleteOutlineIcon sx={{ color: 'error.main' }} />
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

      {/* Dialog for Viewing */}
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog} maxWidth="md" fullWidth>
        <DialogTitle>Detalles de la Estación</DialogTitle>
        <DialogContent>
          {viewStationId !== null ? (
            <StationById id={viewStationId} />
          ) : (
            <Typography>No se pudo cargar la estación.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog} color="secondary">
            Salir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Editing */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <DialogTitle>Editar Estación</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {editStationId !== null ? (
            <EditStation
              idStation={editStationId}
              onCancel={handleCloseEditDialog}
              onSuccess={handleStationEditSuccess}
            />
          ) : (
            <Typography>No se pudo cargar la estación para editar.</Typography>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog for Deleting */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Eliminar Estación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar esta estación?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StationsDetail;
