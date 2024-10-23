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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IBike } from '../../core/entities/bike/IBike';
import { bikeService } from '../../core/bike/service/bike.service';
import BikeById from './BikeById';
import EditBike from './EditBike';
import CreateBike from './CreateBike';
import { deleteBikeUseCase } from '../../core/bike/usecases/delete.bike.usecases';

interface BikesDetailProps {
  updateTable: boolean;
}

const BikesDetail: React.FC<BikesDetailProps> = ({ updateTable }) => {
  const [bikes, setBikes] = useState<IBike[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [viewBikeId, setViewBikeId] = useState<number | null>(null);
  const [editBikeId, setEditBikeId] = useState<number | null>(null);
  const [openViewDialog, setOpenViewDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [deleteBikeId, setDeleteBikeId] = useState<number | null>(null);

  const getBikes = async (fetchAll: boolean = false) => {
    setLoading(true);
    try {
      const currentPage = fetchAll ? 0 : page;
      const pageSize = fetchAll ? total : size;
      const data = await bikeService.getByPage(pageSize, currentPage);
      setBikes(data.list);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching bikes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBikes();
  }, [page, size, updateTable]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewClick = (bikeId: number) => {
    setViewBikeId(bikeId);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setViewBikeId(null);
  };

  const handleEditClick = (bikeId: number) => {
    setEditBikeId(bikeId);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditBikeId(null);
  };

  const handleBikeEditSuccess = () => {
    getBikes(true);
    handleCloseEditDialog();
  };

  const handleDeleteClick = (bikeId: number) => {
    setDeleteBikeId(bikeId);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteBikeId !== null) {
      try {
        await deleteBikeUseCase.execute(deleteBikeId);
        console.log(`Bicicleta con ID ${deleteBikeId} eliminada exitosamente.`);
        getBikes(true); // Refresh the bike list
      } catch (error) {
        console.error('Error eliminando la bicicleta:', error);
      } finally {
        handleCloseDeleteDialog();
      }
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteBikeId(null);
  };

  const handleBikeCreated = () => {
    getBikes(true);
    handleCloseCreateDialog();
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
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
                <TableCell>ID</TableCell>
                <TableCell>CÓDIGO</TableCell>
                <TableCell>ID DE ESTACIÓN ACTUAL</TableCell>
                <TableCell>COMENTARIOS</TableCell>
                <TableCell>ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bikes.map((bike) => (
                <TableRow key={bike.id}>
                  <TableCell>{bike.id}</TableCell>
                  <TableCell>{bike.identificationCode}</TableCell>
                  <TableCell>{bike.idCurrentStation}</TableCell>
                  <TableCell>{bike.comments || 'Sin comentarios'}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleViewClick(bike.id)} aria-label="Ver bicicleta">
                      <VisibilityIcon sx={{ color: 'secondary.main' }} />
                    </IconButton>
                    <IconButton onClick={() => handleEditClick(bike.id)} aria-label="Editar bicicleta">
                      <EditIcon sx={{ color: 'primary.main' }} />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(bike.id)} aria-label="Eliminar bicicleta">
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

      {/* Dialogs */}
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog} maxWidth="md" fullWidth>
        <DialogTitle>Detalles de la Bicicleta</DialogTitle>
        <DialogContent>
          {viewBikeId && <BikeById id={viewBikeId} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog} color="secondary">
            Salir
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <DialogTitle>Editar Bicicleta</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {editBikeId !== null && (
            <EditBike idBicycle={editBikeId} onCancel={handleCloseEditDialog} onSuccess={handleBikeEditSuccess} />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog} maxWidth="md" fullWidth>
        <DialogTitle>Crear Bicicleta</DialogTitle>
        <DialogContent>
          <CreateBike onBikeCreated={handleBikeCreated} onCancel={handleCloseCreateDialog} />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>¿Está seguro de que desea eliminar esta bicicleta?</DialogContent>
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

export default BikesDetail;
