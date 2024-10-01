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
import { IModule } from '../../core/entities/module/IModule';
import { ModuleRepository } from '../../infrastructure/repository/ModuleRepository';
import { ApiService } from '../../infrastructure/http/ApiService';
import EditModule from './EditModule';
import CreateModule from './CreateModule';
import ModuleById from './ModuleById';

const apiService = new ApiService();
const moduleRepository = new ModuleRepository(apiService);

interface ModuleDetailProps {
  updateTable: boolean; // Prop para controlar la actualización
}

const ModulesDetail: React.FC<ModuleDetailProps> = ( {updateTable} ) => {
  const [modules, setModules] = useState<IModule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [editModuleId, setEditModuleId] = useState<number | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [viewModuleId, setViewModuleId] = useState<number | null>(null);
  const [openViewDialog, setOpenViewDialog] = useState<boolean>(false);


  const getModules = async (fetchAll: boolean = false) => {
    setLoading(true);
    try {
      const currentPage = fetchAll ? 0 : page;
      const pageSize = fetchAll ? total : size;
      const data = await moduleRepository.findModules(currentPage, pageSize);
      setModules(data.list);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getModules();
  }, [page, size, updateTable]);

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

  const handleModuleEditSuccess = () => {
    getModules(true); // Fetch all modules to refresh the table
    handleCloseEditDialog();
  };

  const handleModuleCreated = () => {
    console.log("Módulo creado, actualizando la tabla...");
    getModules(true); // Fetch all modules to refresh the table
    handleCloseCreateDialog();
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleViewClick = (moduleId: number) => {
    setViewModuleId(moduleId);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setViewModuleId(null);
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
               {/* <TableCell>MIN NIVEL NP</TableCell>
                <TableCell>MIN NIVEL LP</TableCell>*/}
                <TableCell>ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modules.map((module) => (
                <TableRow key={module.id}>
                  <TableCell>{module.id}</TableCell>
                  <TableCell>{module.code}</TableCell>
                  <TableCell>{module.name}</TableCell>
                  <TableCell>{module.enabledNp ? 'Sí' : 'No'}</TableCell>
                  <TableCell>{module.enabledLp ? 'Sí' : 'No'}</TableCell>
                  {/*<TableCell>{module.minNpLevel}</TableCell>
                  <TableCell>{module.minLpLevel}</TableCell>*/}
                  <TableCell>
                  <IconButton onClick={() => handleViewClick(module.id)} aria-label="Ver módulo">
                      <VisibilityIcon sx={{ color: 'secondary.main' }} />
                    </IconButton>
                    <IconButton onClick={() => handleEditClick(module.id)} aria-label="Editar módulo">
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
              onSuccess={handleModuleEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog} maxWidth="md" fullWidth>
        <DialogTitle>Crear Módulo</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          <CreateModule
            onModuleCreated={handleModuleCreated}
            onCancel={handleCloseCreateDialog}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openViewDialog} onClose={handleCloseViewDialog} maxWidth="md" fullWidth>
  <DialogTitle>Detalles del Módulo</DialogTitle>
  <DialogContent style={{ paddingBottom: 0 }}>
    {viewModuleId && <ModuleById id={viewModuleId} />}
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

export default ModulesDetail;
