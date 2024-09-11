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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { FindRoles } from '../../core/use-cases/role/FindRoles';
import { RoleRepository } from '../../infrastructure/repository/RoleRepository';
import { ApiService } from '../../infrastructure/http/ApiService';
import { IRole } from '../../core/entities/role/IRole';
import EditRole from './EditRole';

const RoleTable: React.FC = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [idModule] = useState<string>("MAIN");
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [editRoleId, setEditRoleId] = useState<number | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  const findRol = useCallback(() => {
    const apiService = new ApiService();
    const roleRepository = new RoleRepository(apiService);
    return new FindRoles(roleRepository);
  }, []);

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await findRol().findRoles(idModule, page, size);
      setRoles(data.list);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching roles:', error);
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
                <TableCell>ACCIONES</TableCell> {/* Columna de acciones */}
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
    </>
  );
};

export default RoleTable;
