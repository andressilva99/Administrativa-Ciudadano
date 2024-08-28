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
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModulesTable from '../../components/module/ModulesTable';
import ModuleById from '../../components/module/ModuleById';
import ModuleByCode from '../../components/module/ModuleByCode';
import EditModule from '../../components/module/EditModule';

const ModuleList: React.FC = () => {
  const [moduleId, setModuleId] = useState<number | null>(null);
  const [moduleCode, setModuleCode] = useState<string>('');
  const [editModuleId, setEditModuleId] = useState<number | null>(null);
  const [showModuleById, setShowModuleById] = useState(false);
  const [showModuleByCode, setShowModuleByCode] = useState(false);
  const [showEditModuleSearch, setShowEditModuleSearch] = useState(false);
  const [openModuleDialog, setOpenModuleDialog] = useState(false);
  const [openModuleByCodeDialog, setOpenModuleByCodeDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleToggleModuleById = () => {
    setShowModuleById((prev) => !prev);
    if (showModuleById) {
      setModuleId(null);
    }
  };

  const handleSearchModuleById = () => {
    setOpenModuleDialog(true);
    setModuleId(moduleId || 0);
    setShowModuleById(false);
    handleMenuClose();
  };

  const handleCloseModuleDialog = () => {
    setOpenModuleDialog(false);
    setModuleId(null);
  };

  const handleToggleModuleByCode = () => {
    setShowModuleByCode((prev) => !prev);
    if (showModuleByCode) {
      setModuleCode('');
    }
  };

  const handleSearchModuleByCode = () => {
    setOpenModuleByCodeDialog(true);
    setShowModuleByCode(false);
    handleMenuClose();
  };

  const handleCloseModuleByCodeDialog = () => {
    setOpenModuleByCodeDialog(false);
    setModuleCode('');
  };

  const handleToggleEditModuleSearch = () => {
    setShowEditModuleSearch((prev) => !prev);
    if (showEditModuleSearch) {
      setEditModuleId(null);
    }
  };

  const handleSearchEditModule = () => {
    if (editModuleId !== null) {
      setOpenEditDialog(true);
    }
    setShowEditModuleSearch(false);
    handleMenuClose();
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
              onClick={handleMenuClick}
              style={{ marginBottom: '8px' }}
            >
              <MoreVertIcon style={{ marginRight: '8px' }} />
              Acciones
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleToggleModuleById}>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="Buscar por ID" />
              </MenuItem>
              {showModuleById && (
                <Box display="flex" alignItems="center" marginLeft="16px">
                  <TextField
                    label="Ingrese la ID del módulo"
                    type="number"
                    fullWidth
                    onChange={(e) => setModuleId(Number(e.target.value))}
                  />
                  <IconButton
                    color="primary"
                    onClick={handleSearchModuleById}
                    style={{ marginLeft: '8px' }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Box>
              )}
              <MenuItem onClick={handleToggleModuleByCode}>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="Buscar por Código" />
              </MenuItem>
              {showModuleByCode && (
                <Box display="flex" alignItems="center" marginLeft="16px">
                  <TextField
                    label="Ingrese el código del módulo"
                    fullWidth
                    onChange={(e) => setModuleCode(e.target.value)}
                  />
                  <IconButton
                    color="primary"
                    onClick={handleSearchModuleByCode}
                    style={{ marginLeft: '8px' }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Box>
              )}
              <MenuItem onClick={handleToggleEditModuleSearch}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Editar Módulo" />
              </MenuItem>
              {showEditModuleSearch && (
                <Box display="flex" alignItems="center" marginLeft="16px">
                  <TextField
                    label="Ingrese el ID del módulo para editar"
                    type="number"
                    fullWidth
                    onChange={(e) => setEditModuleId(Number(e.target.value))}
                  />
                  <IconButton
                    color="primary"
                    onClick={handleSearchEditModule}
                    style={{ marginLeft: '8px' }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Box>
              )}
            </Menu>
          </Grid>
        </Grid>
      </Paper>

      <Paper style={{ padding: '16px', marginBottom: '16px' }}>
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
            >
              Editar
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
