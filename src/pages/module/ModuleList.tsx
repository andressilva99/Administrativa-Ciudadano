import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableContainer,
  Box
} from '@mui/material';
import ModulesTable from '../../components/module/ModulesTable';
import ModuleById from '../../components/module/ModuleById';
import ModuleByCode from '../../components/module/ModuleByCode'; // Importar el componente
import EditModule from '../../components/module/EditModule';

const ModuleList: React.FC = () => {
  const [moduleId, setModuleId] = useState<number | null>(null);
  const [moduleCode, setModuleCode] = useState<string>('');
  const [editModuleId, setEditModuleId] = useState<number | null>(null);
  const [showModuleById, setShowModuleById] = useState(false);
  const [showModuleByCode, setShowModuleByCode] = useState(false);
  const [showEditModuleSearch, setShowEditModuleSearch] = useState(false);
  const [openModuleDialog, setOpenModuleDialog] = useState(false);
  const [openModuleByCodeDialog, setOpenModuleByCodeDialog] = useState(false); // Estado para ModuleByCode
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleToggleModuleById = () => {
    setShowModuleById((prev) => !prev);
    if (showModuleById) {
      setModuleId(null); // Resetea el ID cuando se oculta el campo de búsqueda
    }
  };

  const handleSearchModuleById = () => {
    setOpenModuleDialog(true);
    setModuleId(moduleId || 0);
    setShowModuleById(false);
  };

  const handleCloseModuleDialog = () => {
    setOpenModuleDialog(false);
    setModuleId(null);
  };

  const handleToggleModuleByCode = () => {
    setShowModuleByCode((prev) => !prev);
    if (showModuleByCode) {
      setModuleCode(''); // Resetea el código cuando se oculta el campo de búsqueda
    }
  };

  const handleSearchModuleByCode = () => {
    setOpenModuleByCodeDialog(true); // Abrir el diálogo para ModuleByCode
    setShowModuleByCode(false);
  };

  const handleCloseModuleByCodeDialog = () => {
    setOpenModuleByCodeDialog(false);
    setModuleCode('');
  };

  const handleToggleEditModuleSearch = () => {
    setShowEditModuleSearch((prev) => !prev);
    if (showEditModuleSearch) {
      setEditModuleId(null); // Resetea el ID cuando se oculta el campo de búsqueda
    }
  };

  const handleSearchEditModule = () => {
    if (editModuleId !== null) {
      setOpenEditDialog(true);
    }
    setShowEditModuleSearch(false);
  };

  const handleCancelEdit = () => {
    setEditModuleId(null);
    setOpenEditDialog(false);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditModuleId(null);
  };

  return (
    <Container>
      <Paper style={{ padding: '16px', marginBottom: '16px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleToggleModuleById}
              style={{ marginBottom: '8px' }}
            >
              {showModuleById ? 'Cancelar búsqueda por ID' : 'Ver módulo por ID'}
            </Button>
            {showModuleById && (
              <>
                <TextField
                  label="Ingrese la ID del módulo"
                  type="number"
                  fullWidth
                  onChange={(e) => setModuleId(Number(e.target.value))}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSearchModuleById}
                  style={{ marginTop: '8px' }}
                >
                  Buscar
                </Button>
              </>
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleToggleModuleByCode}
              style={{ marginBottom: '8px' }}
            >
              {showModuleByCode ? 'Cancelar búsqueda por código' : 'Ver módulo por código'}
            </Button>
            {showModuleByCode && (
              <>
                <TextField
                  label="Ingrese el código del módulo"
                  fullWidth
                  onChange={(e) => setModuleCode(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSearchModuleByCode}
                  style={{ marginTop: '8px' }}
                >
                  Buscar
                </Button>
              </>
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleToggleEditModuleSearch}
              style={{ marginBottom: '8px' }}
            >
              {showEditModuleSearch ? 'Cancelar búsqueda de edición' : 'Editar Módulo'}
            </Button>
            {showEditModuleSearch && (
              <>
                <TextField
                  label="Ingrese el ID del módulo para editar"
                  type="number"
                  fullWidth
                  onChange={(e) => setEditModuleId(Number(e.target.value))}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSearchEditModule}
                  style={{ marginTop: '8px' }}
                >
                  Buscar
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Paper style={{ padding: '16px', marginBottom: '16px' }}>
        <Typography variant="h6">Módulos</Typography>
        <ModulesTable />
      </Paper>

      <Dialog open={openModuleDialog} onClose={handleCloseModuleDialog} fullWidth maxWidth="md">
        <DialogTitle>Detalle del Módulo</DialogTitle>
        <DialogContent>
          {moduleId !== null && (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <ModuleById id={moduleId} />
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModuleDialog} color="secondary">
            Salir
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setEditModuleId(moduleId);
              setOpenEditDialog(true);
              handleCloseModuleDialog();
            }}
          >
            Editar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openModuleByCodeDialog} onClose={handleCloseModuleByCodeDialog} fullWidth maxWidth="md">
        <DialogTitle>Detalle del Módulo por Código</DialogTitle>
        <DialogContent>
          {moduleCode && (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <ModuleByCode code={moduleCode} />
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModuleByCodeDialog} color="secondary">
            Salir
          </Button>
          {moduleCode && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setEditModuleId(null); // Resetea el ID de edición para evitar conflictos
                setOpenEditDialog(true);
                handleCloseModuleByCodeDialog();
              }}
            >              Editar
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth maxWidth="md">
        <DialogTitle>Editar Módulo</DialogTitle>
        <DialogContent>
          {editModuleId !== null && (
            <EditModule
              moduleId={editModuleId}
              onCancel={handleCancelEdit}
            />
          )}
        </DialogContent>        
      </Dialog>
    </Container>
  );
};

export default ModuleList;
