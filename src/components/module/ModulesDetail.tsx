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
import EditIcon from '@mui/icons-material/Edit'; // Importa el ícono de edición
import { AuthService } from '../../core/application/AuthService';
import EditModule from './EditModule'; // Asegúrate de importar el componente de edición

interface Module {
  id: number;
  code: string;
  moduleType: string;
  name: string;
  enabledNp: boolean;
  enabledLp: boolean;
  minNpLevel: number;
  minLpLevel: number;
  configuraciones: {
    empty: boolean;
  };
}

interface ModuleResponse {
  list: Module[];
  total: number;
  size: number;
}

const fetchModules = async (page: number, size: number): Promise<ModuleResponse> => {
  const authService = new AuthService();
  const response = await authService.findModules(page, size);
  return response;
};

const ModulesDetail: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
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
        const data: ModuleResponse = await fetchModules(page, size);
        setModules(data.list);
        setTotal(data.total);
      } catch (error) {
        console.error('Error fetching modules:', error);
      } finally {
        setLoading(false);
      }
    };

    getModules();
  }, [page, size]);

  const handleChangePage = (event: unknown, newPage: number) => {
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
                <TableCell>Código</TableCell>
                <TableCell>Tipo de módulo</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>NP Habilitado</TableCell>
                <TableCell>LP Habilitado</TableCell>
                <TableCell>Min Nivel NP</TableCell>
                <TableCell>Min Nivel LP</TableCell>
                <TableCell>Acciones</TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {modules.map((module) => (
                <TableRow key={module.id}>
                  <TableCell>{module.id}</TableCell>
                  <TableCell>{module.code}</TableCell>
                  <TableCell>{module.moduleType}</TableCell>
                  <TableCell>{module.name}</TableCell>
                  <TableCell>{module.enabledNp ? 'Sí' : 'No'}</TableCell>
                  <TableCell>{module.enabledLp ? 'Sí' : 'No'}</TableCell>
                  <TableCell>{module.minNpLevel}</TableCell>
                  <TableCell>{module.minLpLevel}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(module.id)}>
                      <EditIcon />
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
          {editModuleId && (
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
