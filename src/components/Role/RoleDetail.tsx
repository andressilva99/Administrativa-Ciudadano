import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRole, IRoleAdd, RoleResponse } from '../../core/entities/role/IRole';
import { ApiService } from '../../infrastructure/http/ApiService';
import { RoleRepository } from '../../infrastructure/repository/RoleRepository';
import { selectUserPermissions, selectUserRoot } from '../../store/reducers/slices/userSlice';
import AddRole from './AddRole';
import EditRole from './EditRole';
import RoleById from './RoleById';

interface RoleTableProps {
  updateTable: boolean; // Prop para controlar la actualización
}

const RoleTable: React.FC<RoleTableProps> = ({ updateTable }) => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [idModule] = useState<string>('MAIN');
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [editRoleId, setEditRoleId] = useState<number | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [viewRoleId, setViewRoleId] = useState<number | null>(null);
  const [openViewDialog, setOpenViewDialog] = useState<boolean>(false);
  const [openCopyDialog, setOpenCopyDialog] = useState<boolean>(false);
  const [initialRoleData, setInitialRoleData] = useState<IRoleAdd | null>(null);

  const userPermissions = useSelector(selectUserPermissions) || [];
  const isRoot = useSelector(selectUserRoot);

  const apiService = new ApiService();
  const roleRepository = new RoleRepository(apiService);

  const getRoles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: RoleResponse = await roleRepository.findRoles(idModule, page, size);
      setRoles(data.list);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoles();
  }, [idModule, page, size, updateTable]);

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

  const handleRoleEditSuccess = () => {
    getRoles(); // Refresh the roles after editing
    handleCloseEditDialog();
  };

  const handleCopyClick = (role: IRole) => {
    const { idModule, name, description, permissionsList } = role;
    const roleToCopy: IRoleAdd = {
      idModule,
      name,
      description,
      permissionsList: permissionsList.map((p) => ({
        name: p.name,
        description: p.description,
        active: p.active ?? false, // Asignar un valor booleano si `active` no está definido
      })),
    };
    setInitialRoleData(roleToCopy);
    setOpenCopyDialog(true);
  };

  const handleCloseCopyDialog = () => {
    setOpenCopyDialog(false);
    setInitialRoleData(null);
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
                    {isRoot || userPermissions.includes('ADMROLE_VIEW_1') ? (
                      <IconButton onClick={() => handleViewClick(role.id)}>
                        <VisibilityIcon sx={{ color: 'secondary.main' }} />
                      </IconButton>
                    ) : null}
                    {isRoot || userPermissions.includes('ADMROLE_EDIT') ? (
                      <IconButton onClick={() => handleEditClick(role.id)}>
                        <EditIcon sx={{ color: 'primary.main' }} />
                      </IconButton>
                    ) : null}
                    {isRoot || userPermissions.includes('ADMROLE_ADD') ? (
                      <IconButton onClick={() => handleCopyClick(role)}>
                        <FileCopyIcon sx={{ color: 'primary.main' }} />
                      </IconButton>
                    ) : null}
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
              onEditSuccess={handleRoleEditSuccess}
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

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error || 'Unknown error occurred'}
        </Alert>
      </Snackbar>
      <Dialog open={openCopyDialog} onClose={handleCloseCopyDialog} maxWidth="md" fullWidth>
        <DialogTitle>Copiar Rol</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {initialRoleData && (
            <AddRole
              onRoleAdded={getRoles} // Refrescar la tabla de roles después de añadir
              onCancel={handleCloseCopyDialog}
              roleToCopy={initialRoleData} // Pasar los datos iniciales al componente AddRole
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RoleTable;
