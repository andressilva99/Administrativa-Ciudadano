import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography, Paper } from '@mui/material';
import ModulesTable from '../../components/ModulesTable';
import ModuleById from '../../components/ModuleById';
import ModuleDetail from '../../components/ModuleDetail';
import EditModule from '../../components/EditModule';

const ModuleList: React.FC = () => {
  const [moduleId, setModuleId] = useState<number | null>(null);
  const [moduleCode, setModuleCode] = useState<string>('');
  const [editModuleId, setEditModuleId] = useState<number | null>(null);
  const [showModuleById, setShowModuleById] = useState(false);
  const [showModuleByCode, setShowModuleByCode] = useState(false);
  const [showEditModuleSearch, setShowEditModuleSearch] = useState(false);
  const [showEditModule, setShowEditModule] = useState(false);

  const handleToggleModuleById = () => {
    setShowModuleById((prev) => !prev);
    if (showModuleById) {
      setModuleId(null); // Resetea el ID cuando se oculta el campo de búsqueda
    }
  };

  const handleSearchModuleById = () => {
    setModuleId(moduleId || 0);
    setShowModuleById(false);
  };

  const handleToggleModuleByCode = () => {
    setShowModuleByCode((prev) => !prev);
    if (showModuleByCode) {
      setModuleCode(''); // Resetea el código cuando se oculta el campo de búsqueda
    }
  };

  const handleSearchModuleByCode = () => {
    setModuleCode(moduleCode);
    setShowModuleByCode(false);
  };

  const handleToggleEditModuleSearch = () => {
    setShowEditModuleSearch((prev) => !prev);
    if (showEditModuleSearch) {
      setEditModuleId(null); // Resetea el ID cuando se oculta el campo de búsqueda
    }
  };

  const handleSearchEditModule = () => {
    if (editModuleId !== null) {
      setShowEditModule(true);
    }
    setShowEditModuleSearch(false);
  };

  const handleCancelEdit = () => {
    setEditModuleId(null);
    setShowEditModule(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Module Management
      </Typography>

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

      {showEditModule && (
        <Paper style={{ padding: '16px', marginBottom: '16px' }}>
          <EditModule
            moduleId={editModuleId || 0}
            onCancel={handleCancelEdit}
          />
        </Paper>
      )}

      <Paper style={{ padding: '16px', marginBottom: '16px' }}>
        <Typography variant="h6">Módulos</Typography>
        <ModulesTable />
      </Paper>

      <Paper style={{ padding: '16px', marginTop: '16px' }}>
        {moduleId !== null && <ModuleById id={moduleId} />}
        {moduleCode && <ModuleDetail code={moduleCode} />}
      </Paper>
    </Container>
  );
};

export default ModuleList;
