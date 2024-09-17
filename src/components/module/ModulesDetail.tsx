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
import { IModule } from '../../core/entities/module/IModule';
import { ModuleRepository } from '../../infrastructure/repository/ModuleRepository';
import { ApiService } from '../../infrastructure/http/ApiService';
import EditModule from './EditModule';

const apiService = new ApiService();
const moduleRepository = new ModuleRepository(apiService);

const ModulesDetail: React.FC = () => {
  const [modules, setModules] = useState<IModule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [editModuleId, setEditModuleId] = useState<number | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  useEffect(() => {
    const getModules = async () => {
      setLoading(true);
      try {
        const data = await moduleRepository.findModules(page, size);
        setModules(data.list);
        setTotal(data.total);
        //traigo todo el modulo en consola para controlar
        console.log('Fetched modules:', data.list);
      } catch (error) {
        console.error('Error fetching modules:', error);
      } finally {
        setLoading(false);
      }
    };

    getModules();
  }, [page, size]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (moduleId: number) => {
    setEditModuleId(moduleId);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditModuleId(null);
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
                <TableCell>NOMBRE</TableCell>
                <TableCell>NP ACTIVO</TableCell>
                <TableCell>LP ACTIVO</TableCell>
                <TableCell>MIN NIVEL NP</TableCell>
                <TableCell>MIN NIVEL LP</TableCell>
                <TableCell>ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modules.map((module) => (
                <TableRow key={module.id}>
                  <TableCell>{module.id}</TableCell>
                  <TableCell>{module.code}</TableCell>
                  <TableCell>{module.name}</TableCell>
                  <TableCell>{module.enabledNp  ? 'Sí' : 'No'}</TableCell>
                  <TableCell>{module.enabledLp  ? 'Sí' : 'No'}</TableCell>
                  <TableCell>{module.minNpLevel}</TableCell>
                  <TableCell>{module.minLpLevel}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(module.id)}>
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
        <DialogTitle>Editar Módulo</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {editModuleId !== null && (
            <EditModule
              moduleId={editModuleId}
              onCancel={handleCloseEditDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModulesDetail;
