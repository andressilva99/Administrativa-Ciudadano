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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import { IUser, UserResponse } from '../../core/entities/user/IUser';
import { UserRepository } from '../../infrastructure/repository/UserRepository';
import { ApiService } from '../../infrastructure/http/ApiService';
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';
import { CustomError } from '../../core/errors/CustomError';

const apiService = new ApiService();
const userRepository = new UserRepository(apiService);

const UsersDetail: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null)
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const getUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: UserResponse = await userRepository.findUsers(firstName);
      setUsers(data.list); // Accede a la lista de usuarios
      setTotal(data.total); // Usa el total de usuarios para la paginación
    } catch (err) {
      if (err instanceof CustomError) {
        setError(err.message)
      } else {
        setError('Ocurrió un error al cargar los usuarios');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [firstName, page, size]); // Dependencias añadidas para paginación

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0); // Reinicia la página al cambiar el tamaño
  };

  const handleEditClick = (userId: number) => {
    setEditUserId(userId);
    setOpenEditDialog(true);
  };
  const handleDeleteClick = (userId: number) => {
    setDeleteUserId(userId);
    setOpenDeleteDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditUserId(null);
    getUsers();
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteUserId(null);
    getUsers();
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div> Error: {error} </div>;
  }

  return (
    <>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>ID</TableCell>
                <TableCell>NOMBRE</TableCell>
                <TableCell>APELLIDO</TableCell>
                <TableCell>EMAIL</TableCell>
                <TableCell>DNI</TableCell>
                <TableCell>TELÉFONO</TableCell>
                <TableCell>ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}> {/* Usar ID en lugar de DNI como clave */}
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.dni}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(user.id)}> {/* Cambia a ID */}
                      <EditIcon sx={{ color: 'primary.main' }} />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(user.id)}> {/* Cambia a ID */}
                      <DeleteIcon sx={{ color: 'error.main' }} />
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

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {editUserId && <EditUser userId={editUserId} onCancel={handleCloseEditDialog} />}
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} maxWidth="md" fullWidth>
        <DialogTitle>Eliminar Usuario</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {deleteUserId && 
            <DeleteUser 
              userId={deleteUserId} 
              onCancel={handleCloseDeleteDialog} 
              onUserDeleted={() => {
                console.log('Usuario Eliminado');
                handleCloseDeleteDialog();
              }} 
            />
          }
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UsersDetail;
