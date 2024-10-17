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
import AddIcon from '@mui/icons-material/Add'; // Importar el ícono de agregar
import { IBike } from '../../core/entities/bike/IBike';
import { bikeService } from '../../core/bike/service/bike.service';
import BikeById from './BikeById';
import EditBike from './EditBike'; // Asegúrate de que la ruta sea correcta
import CreateBike from './CreateBike'; // Importar el componente para crear bicicletas
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
  const [openViewDialog, setOpenViewDialog] = useState<boolean>(false);
  const [editBikeId, setEditBikeId] = useState<number | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false); // Estado para el diálogo de creación

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

  const handleBikeCreated = () => {
    console.log("Bicicleta creada, actualizando la tabla...");
    getBikes(true); // Fetch all bikes to refresh the table
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
                    <IconButton onClick={() => handleEditClick(bike.id)} aria-label="Editar bicicleta">
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
            <EditBike
              idBicycle={editBikeId}
              onCancel={handleCloseEditDialog}
              onSuccess={handleBikeEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog} maxWidth="md" fullWidth>
        <DialogTitle>Crear Bicicleta</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          <CreateBike
            onBikeCreated={handleBikeCreated}
            onCancel={handleCloseCreateDialog}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BikesDetail;
