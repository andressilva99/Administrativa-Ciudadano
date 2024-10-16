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
  TextField
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import BikesDetail from '../../components/bike/BikesDetail';
import BikeById from '../../components/bike/BikeById';
import BikeByCode from '../../components/bike/BikeByCode'; // Importa el nuevo componente para buscar por código

const BikePages: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [bikeId, setBikeId] = useState<number | null>(null);
  const [bikeCode, setBikeCode] = useState<string | null>(null); // Nuevo estado para buscar por código
  const [showBikeById, setShowBikeById] = useState(false);
  const [showBikeByCode, setShowBikeByCode] = useState(false); // Nuevo estado para mostrar el campo de búsqueda por código
  const [openBikeDialog, setOpenBikeDialog] = useState(false);
  const [openBikeByCodeDialog, setOpenBikeByCodeDialog] = useState(false); // Nuevo estado para manejar el diálogo de búsqueda por código
  const [updateTable, setUpdateTable] = useState(false);
  
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setShowBikeById(false);
    setShowBikeByCode(false); // Cerrar el campo de búsqueda por código
  };

  const handleToggleBikeById = () => {
    setShowBikeById((prev) => !prev);
    if (showBikeById) {
      setBikeId(null);
    }
  };

  const handleToggleBikeByCode = () => { // Función para alternar la visibilidad del campo de búsqueda por código
    setShowBikeByCode((prev) => !prev);
    if (showBikeByCode) {
      setBikeCode(null);
    }
  };

  const handleSearchBikeById = () => {
    setOpenBikeDialog(true);
    setShowBikeById(false);
    handleMenuClose();
  };

  const handleSearchBikeByCode = () => { // Función para abrir el diálogo de búsqueda por código
    setOpenBikeByCodeDialog(true);
    setShowBikeByCode(false);
    handleMenuClose();
  };

  const handleCloseBikeDialog = () => {
    setOpenBikeDialog(false);
    setBikeId(null);
  };

  const handleCloseBikeByCodeDialog = () => { // Función para cerrar el diálogo de búsqueda por código
    setOpenBikeByCodeDialog(false);
    setBikeCode(null);
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
        <MenuItem onClick={handleToggleBikeById}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Buscar por ID" />
        </MenuItem>
        {showBikeById && (
          <Box display="flex" alignItems="center" marginLeft="16px">
            <TextField
              label="Ingrese la ID de la bicicleta"
              type="number"
              fullWidth
              onChange={(e) => setBikeId(Number(e.target.value))}
            />
            <IconButton
              color="primary"
              onClick={handleSearchBikeById}
              style={{ marginLeft: '8px' }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        )}

        {/* Opción para buscar por código */}
        <MenuItem onClick={handleToggleBikeByCode}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Buscar por Código" />
        </MenuItem>
        {showBikeByCode && (
          <Box display="flex" alignItems="center" marginLeft="16px">
            <TextField
              label="Ingrese el Código de la bicicleta"
              fullWidth
              onChange={(e) => setBikeCode(e.target.value)}
            />
            <IconButton
              color="primary"
              onClick={handleSearchBikeByCode}
              style={{ marginLeft: '8px' }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        )}
      </Menu>

      <Dialog open={openBikeDialog} onClose={handleCloseBikeDialog} fullWidth maxWidth="md">
        <DialogTitle>Detalle de la Bicicleta por ID</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {bikeId !== null && (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <BikeById id={bikeId} />
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBikeDialog} color="secondary">
            Salir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para mostrar bicicleta por código */}
      <Dialog open={openBikeByCodeDialog} onClose={handleCloseBikeByCodeDialog} fullWidth maxWidth="md">
        <DialogTitle>Detalle de la Bicicleta por Código</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {bikeCode && (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <BikeByCode identificationCode={bikeCode} />
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBikeByCodeDialog} color="secondary">
            Salir
          </Button>
        </DialogActions>
      </Dialog>

      <Paper style={{ padding: '16px' }}>
        <BikesDetail updateTable={updateTable} />
      </Paper>
    </div>
  );
};

export default BikePages;
