import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TextField,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit'; // Importar el ícono de edición
import StationsDetail from '../../components/station/StationDetail'; // Componente para mostrar la tabla de estaciones
//import StationById from '../../components/station/StationById'; // Componente para buscar estación por ID
//import StationByCode from '../../components/station/StationByCode'; // Componente para buscar estación por código
//import EditStation from '../../components/station/EditStation'; // Componente de edición

const StationPages: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [stationId, setStationId] = useState<number | null>(null);
  const [stationCode, setStationCode] = useState<string | null>(null);
  const [editStationId, setEditStationId] = useState<number | null>(null); // Estado para manejar la edición por ID
  const [showStationById, setShowStationById] = useState(false);
  const [showStationByCode, setShowStationByCode] = useState(false);
  const [showEditStationSearch, setShowEditStationSearch] = useState(false); // Nuevo estado para manejar el campo de edición por ID
  const [openStationDialog, setOpenStationDialog] = useState(false);
  const [openStationByCodeDialog, setOpenStationByCodeDialog] = useState(false);
  const [openEditStationDialog, setOpenEditStationDialog] = useState(false); // Estado para manejar el diálogo de edición
  const [updateTable, setUpdateTable] = useState(false);

  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setShowStationById(false);
    setShowStationByCode(false);
    setShowEditStationSearch(false);
  };

  const handleToggleStationById = () => {
    setShowStationById((prev) => !prev);
    if (showStationById) {
      setStationId(null);
    }
  };

  const handleToggleStationByCode = () => {
    setShowStationByCode((prev) => !prev);
    if (showStationByCode) {
      setStationCode(null);
    }
  };

  const handleToggleEditStationSearch = () => { // Función para alternar la búsqueda para editar
    setShowEditStationSearch((prev) => !prev);
    if (showEditStationSearch) {
      setEditStationId(null);
    }
  };

  const handleSearchStationById = () => {
    setOpenStationDialog(true);
    setShowStationById(false);
    handleMenuClose();
  };

  const handleSearchStationByCode = () => {
    setOpenStationByCodeDialog(true);
    setShowStationByCode(false);
    handleMenuClose();
  };

  const handleSearchEditStation = () => { // Función para abrir el diálogo de edición por ID
    if (editStationId !== null) {
      setOpenEditStationDialog(true);
    }
    setShowEditStationSearch(false);
    handleMenuClose();
  };

  const handleCloseStationDialog = () => {
    setOpenStationDialog(false);
    setStationId(null);
  };

  const handleCloseStationByCodeDialog = () => {
    setOpenStationByCodeDialog(false);
    setStationCode(null);
  };

  const handleCloseEditStationDialog = () => {
    setOpenEditStationDialog(false);
    setEditStationId(null);
  };

  const handleSuccessEdit = () => { // Función para manejar el éxito de la edición
    handleCloseEditStationDialog();
    setUpdateTable((prev) => !prev); // Actualizar la tabla después de la edición
  };

  return (
    <div>
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
        <MenuItem onClick={handleToggleStationById}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Buscar por ID" />
        </MenuItem>
        {showStationById && (
          <Box display="flex" alignItems="center" marginLeft="16px">
            <TextField
              label="Ingrese la ID de la estación"
              type="number"
              fullWidth
              onChange={(e) => setStationId(Number(e.target.value))}
            />
            <IconButton
              color="primary"
              onClick={handleSearchStationById}
              style={{ marginLeft: '8px' }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        )}

        <MenuItem onClick={handleToggleStationByCode}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Buscar por Código" />
        </MenuItem>
        {showStationByCode && (
          <Box display="flex" alignItems="center" marginLeft="16px">
            <TextField
              label="Ingrese el Código de la estación"
              fullWidth
              onChange={(e) => setStationCode(e.target.value)}
            />
            <IconButton
              color="primary"
              onClick={handleSearchStationByCode}
              style={{ marginLeft: '8px' }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        )}

        <MenuItem onClick={handleToggleEditStationSearch}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Editar Estación por ID" />
        </MenuItem>
        {showEditStationSearch && (
          <Box display="flex" alignItems="center" marginLeft="16px">
            <TextField
              label="Ingrese la ID de la estación para editar"
              type="number"
              fullWidth
              onChange={(e) => setEditStationId(Number(e.target.value))}
            />
            <IconButton
              color="primary"
              onClick={handleSearchEditStation}
              style={{ marginLeft: '8px' }}
            >
              <EditIcon />
            </IconButton>
          </Box>
        )}
      </Menu>

      {/*<Dialog open={openStationDialog} onClose={handleCloseStationDialog} fullWidth maxWidth="md">
        <DialogTitle>Detalle de la Estación por ID</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {stationId !== null && (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <StationById id={stationId} />
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStationDialog} color="secondary">
            Salir
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openStationByCodeDialog} onClose={handleCloseStationByCodeDialog} fullWidth maxWidth="md">
        <DialogTitle>Detalle de la Estación por Código</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {stationCode && (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <StationByCode identificationCode={stationCode} />
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStationByCodeDialog} color="secondary">
            Salir
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditStationDialog} onClose={handleCloseEditStationDialog} fullWidth maxWidth="md">
        <DialogTitle>Editar Estación</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {editStationId !== null && (
            <EditStation idStation={editStationId} onSuccess={handleSuccessEdit} onCancel={handleCloseEditStationDialog} />
          )}
        </DialogContent>
      </Dialog>*/}

      <Paper style={{ padding: '16px' }}>
        <StationsDetail updateTable={updateTable} />
      </Paper>
    </div>
  );
};

export default StationPages;
``
