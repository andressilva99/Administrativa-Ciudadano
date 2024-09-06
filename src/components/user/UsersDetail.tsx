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
import { IUser, UserResponse } from '../../core/entities/user/IUser';
import { UserRepository } from '../../infrastructure/repository/UserRepository';
import { ApiService } from '../../infrastructure/http/ApiService';

const apiService = new ApiService();
const userRepository = new UserRepository(apiService);

const UsersDetail: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const data: UserResponse = await userRepository.findUsers(firstName);
        setUsers(data.list); // Accede a la lista de usuarios
        setTotal(data.total); // Usa el total de usuarios para la paginación
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [firstName, page, size]); // Dependencias añadidas para paginación

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0); // Reinicia la página al cambiar el tamaño
  };

  const handleEditClick = (userId: string) => {
    setEditUserId(userId);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditUserId(null);
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
                    <IconButton onClick={() => handleEditClick(user.id.toString())}> {/* Cambia a ID */}
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

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {/* 
          Aquí deberías integrar un componente o formulario para editar el usuario,
          usando editUserId para saber qué usuario editar.
          */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UsersDetail;
