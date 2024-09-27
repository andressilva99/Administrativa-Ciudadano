import React, { useState, useEffect, useCallback } from 'react';
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
  Snackbar,
  Alert,
  DialogActions,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { FindRoles } from '../../core/use-cases/role/FindRoles';
import { RoleRepository } from '../../infrastructure/repository/RoleRepository';
import { ApiService } from '../../infrastructure/http/ApiService';
import { IRole, PermissionItem } from '../../core/entities/role/IRole';
import EditRole from './EditRole';
import RoleById from './RoleById';

// Función para formatear los permisos en una cadena
const formatPermissions = (permissionsList: PermissionItem[]): string => {
  return permissionsList.map(permission => permission.name).join(', ');
};

const RoleTable: React.FC = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [idModule] = useState<string>("MAIN");
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [editRoleId, setEditRoleId] = useState<number | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Estado para mensajes de error
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [viewRoleId, setViewRoleId] = useState<number | null>(null);
  const [openViewDialog, setOpenViewDialog] = useState<boolean>(false);

  const findRol = useCallback(() => {
    const apiService = new ApiService();
    const roleRepository = new RoleRepository(apiService);
    return new FindRoles(roleRepository);
  }, []);

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    setError(null); // Limpiar errores anteriores
    try {
      const data = await findRol().findRoles(idModule, page, size);
      setRoles(data.list);
      setTotal(data.total);
    } catch (err) {
      if (typeof err === "string") {
        console.error('Error fetching roles:', err);
        setError(err);
      } else {
        console.error('Unknown error fetching roles:', err);
        setError('Unknown error occurred');
      }
      setOpenSnackbar(true); // Mostrar el Snackbar en caso de error
    } finally {
      setLoading(false);
    }
  }, [idModule, page, size, findRol]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (roleId: number) => {
    setEditRoleId(roleId);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditRoleId(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleViewClick = (roleId: number) => {
    setViewRoleId(roleId);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setViewRoleId(null);
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
                <TableCell>ID DE MÓDULO</TableCell>
                <TableCell>NOMBRE</TableCell>
                <TableCell>DESCRIPCIÓN</TableCell>
                <TableCell>ACTIVO</TableCell>                
                <TableCell>ACCIONES</TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.id}</TableCell>
                  <TableCell>{role.idModule}</TableCell>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>{role.enabled ? 'Yes' : 'No'}</TableCell>                  
                  <TableCell>
                  <IconButton onClick={() => handleViewClick(role.id)}> {/* Cambia a ID */}
                      <VisibilityIcon sx={{ color: 'secondary.main' }} />
                    </IconButton>
                    <IconButton onClick={() => handleEditClick(role.id)}>
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
        <DialogTitle>Editar Rol</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {editRoleId !== null && (
            <EditRole
              roleId={editRoleId}
              onCancel={handleCloseEditDialog}
            />
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog} maxWidth="md" fullWidth>
  <DialogTitle>Detalles del Rol</DialogTitle>
  <DialogContent style={{ paddingBottom: 0 }}>
    {viewRoleId && <RoleById id={viewRoleId} />}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseViewDialog} color="secondary">
      Salir
    </Button>
  </DialogActions>
</Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error || 'Unknown error occurred'}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RoleTable;
