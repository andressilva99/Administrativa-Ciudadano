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
import { IBike } from '../../core/entities/bike/IBike'; // Asegúrate de que la ruta sea correcta
import { bikeService } from '../../core/bike/service/bike.service';
import BikeById from './BikeById'; // Asegúrate de que la ruta sea correcta

interface BikesDetailProps {
  updateTable: boolean; // Prop para controlar la actualización
}

const BikesDetail: React.FC<BikesDetailProps> = ({ updateTable }) => {
  const [bikes, setBikes] = useState<IBike[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [viewBikeId, setViewBikeId] = useState<number | null>(null);
  const [openViewDialog, setOpenViewDialog] = useState<boolean>(false);

  const getBikes = async (fetchAll: boolean = false) => {
    setLoading(true);
    try {
      const currentPage = fetchAll ? 0 : page;
      const pageSize = fetchAll ? total : size;
      const data = await bikeService.getByPage(pageSize, currentPage); // Usa el servicio para obtener bicicletas
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
                    <IconButton aria-label="Editar bicicleta">
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
    </>
  );
};

export default BikesDetail;
