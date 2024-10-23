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
import AddIcon from '@mui/icons-material/Add'; // Importar ícono para agregar estación
import StationsDetail from '../../components/station/StationDetail'; // Componente para mostrar la tabla de estaciones
import StationById from '../../components/station/StationById'; // Componente para buscar estación por ID
import CreateStation from '../../components/station/CreateStation'; // Importar el componente CreateStation

const StationPages: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [stationId, setStationId] = useState<number | null>(null);
  const [showStationById, setShowStationById] = useState(false);
  const [openStationDialog, setOpenStationDialog] = useState(false);
  const [openCreateStationDialog, setOpenCreateStationDialog] = useState(false); // Estado para manejar el diálogo de creación
  const [updateTable, setUpdateTable] = useState(false);

  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setShowStationById(false);
  };

  const handleToggleStationById = () => {
    setShowStationById((prev) => !prev);
    if (showStationById) {
      setStationId(null);
    }
  };

  const handleSearchStationById = () => {
    setOpenStationDialog(true);
    setShowStationById(false);
    handleMenuClose();
  };

  const handleOpenCreateStationDialog = () => {
    setOpenCreateStationDialog(true);
    handleMenuClose();
  };

  const handleCloseStationDialog = () => {
    setOpenStationDialog(false);
    setStationId(null);
  };

  const handleCloseCreateStationDialog = () => {
    setOpenCreateStationDialog(false);
  };

  const handleSuccessCreate = () => {
    handleCloseCreateStationDialog();
    setUpdateTable((prev) => !prev); // Actualizar la tabla después de la creación
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

      <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
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
        <MenuItem onClick={handleOpenCreateStationDialog}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Agregar Estación" />
        </MenuItem>
      </Menu>

      <Dialog open={openStationDialog} onClose={handleCloseStationDialog} fullWidth maxWidth="md">
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

      <Dialog open={openCreateStationDialog} onClose={handleCloseCreateStationDialog} fullWidth maxWidth="md">
        <DialogTitle>Agregar Estación</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          <CreateStation onStationCreated={handleSuccessCreate} onCancel={handleCloseCreateStationDialog} />
        </DialogContent>
        
      </Dialog>

      <Paper style={{ padding: '16px' }}>
        <StationsDetail updateTable={updateTable} />
      </Paper>
    </div>
  );
};

export default StationPages;
