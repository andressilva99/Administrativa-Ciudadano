import AddIcon from '@mui/icons-material/Add'; // Importar ícono para agregar bicicleta
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
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
import React, { useState } from 'react';
import BikeByCode from '../../components/bike/BikeByCode';
import BikeById from '../../components/bike/BikeById';
import BikesDetail from '../../components/bike/BikesDetail';
import CreateBike from '../../components/bike/CreateBike'; // Importar el componente CreateBike
import EditBike from '../../components/bike/EditBike';
import { useSelector } from 'react-redux';
import { selectUserPermissions, selectUserRoot } from '../../store/reducers/slices/userSlice';

const BikePages: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [bikeId, setBikeId] = useState<number | null>(null);
  const [bikeCode, setBikeCode] = useState<string | null>(null);
  const [editBikeId, setEditBikeId] = useState<number | null>(null);
  const [showBikeById, setShowBikeById] = useState(false);
  const [showBikeByCode, setShowBikeByCode] = useState(false);
  const [showEditBikeSearch, setShowEditBikeSearch] = useState(false);
  const [openBikeDialog, setOpenBikeDialog] = useState(false);
  const [openBikeByCodeDialog, setOpenBikeByCodeDialog] = useState(false);
  const [openEditBikeDialog, setOpenEditBikeDialog] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [openCreateBikeDialog, setOpenCreateBikeDialog] = useState(false); // Nuevo estado para crear bicicleta

  const openMenu = Boolean(anchorEl);

  const userPermissions = useSelector(selectUserPermissions) || [];
  const isRoot = useSelector(selectUserRoot);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setShowBikeById(false);
    setShowBikeByCode(false);
    setShowEditBikeSearch(false);
  };

  const handleToggleBikeById = () => {
    setShowBikeById((prev) => !prev);
    if (showBikeById) {
      setBikeId(null);
    }
  };

  const handleToggleBikeByCode = () => {
    setShowBikeByCode((prev) => !prev);
    if (showBikeByCode) {
      setBikeCode(null);
    }
  };

  // const handleToggleEditBikeSearch = () => {
  //   setShowEditBikeSearch((prev) => !prev);
  //   if (showEditBikeSearch) {
  //     setEditBikeId(null);
  //   }
  // };

  const handleSearchBikeById = () => {
    setOpenBikeDialog(true);
    setShowBikeById(false);
    handleMenuClose();
  };

  const handleSearchBikeByCode = () => {
    setOpenBikeByCodeDialog(true);
    setShowBikeByCode(false);
    handleMenuClose();
  };

  const handleSearchEditBike = () => {
    if (editBikeId !== null) {
      setOpenEditBikeDialog(true);
    }
    setShowEditBikeSearch(false);
    handleMenuClose();
  };

  const handleCreateBike = () => {
    setOpenCreateBikeDialog(true);
    handleMenuClose();
  };

  const handleCloseBikeDialog = () => {
    setOpenBikeDialog(false);
    setBikeId(null);
    setAnchorEl(null);
    setShowBikeById(false);
    setShowBikeByCode(false);
    setShowEditBikeSearch(false);
  };

  const handleCloseBikeByCodeDialog = () => {
    setOpenBikeByCodeDialog(false);
    setBikeCode(null);
    setAnchorEl(null);
    setShowBikeById(false);
    setShowBikeByCode(false);
    setShowEditBikeSearch(false);
  };

  const handleCloseEditBikeDialog = () => {
    setOpenEditBikeDialog(false);
    setEditBikeId(null);
  };

  const handleSuccessEdit = () => {
    handleCloseEditBikeDialog();
    setUpdateTable((prev) => !prev);
  };

  const handleCloseCreateBikeDialog = () => {
    setOpenCreateBikeDialog(false);
  };

  const handleBikeCreated = () => {
    handleCloseCreateBikeDialog();
    setUpdateTable((prev) => !prev);
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
        {isRoot || userPermissions.includes('BICIS_VIEW_N') ? (
          <MenuItem onClick={handleToggleBikeById}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Buscar por ID" />
          </MenuItem>
        ) : null}
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

        {isRoot || userPermissions.includes('BICIS_VIEW_N') ? (
          <MenuItem onClick={handleToggleBikeByCode}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Buscar por Código" />
          </MenuItem>
        ) : null}
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

        {isRoot || userPermissions.includes('BICIS_EDIT') ? (
          <MenuItem onClick={handleToggleEditBikeSearch}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Editar Bicicleta por ID" />
          </MenuItem>
        ) : null}
        {showEditBikeSearch && (
          <Box display="flex" alignItems="center" marginLeft="16px">
            <TextField
              label="Ingrese la ID de la bicicleta para editar"
              type="number"
              fullWidth
              onChange={(e) => setEditBikeId(Number(e.target.value))}
            />
            <IconButton
              color="primary"
              onClick={handleSearchEditBike}
              style={{ marginLeft: '8px' }}
            >
              <EditIcon />
            </IconButton>
          </Box>
        )}

        {isRoot || userPermissions.includes('BICIS_ADD') ? (
          <MenuItem onClick={handleCreateBike}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Crear Bicicleta" />
          </MenuItem>
        ) : null}
      </Menu>

      <Dialog
        open={openCreateBikeDialog}
        onClose={handleCloseCreateBikeDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Crear Bicicleta</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          <CreateBike onBikeCreated={handleBikeCreated} onCancel={handleCloseCreateBikeDialog} />
        </DialogContent>
      </Dialog>

      <Dialog open={openBikeDialog} onClose={handleCloseBikeDialog} fullWidth maxWidth="md">
        <DialogTitle>Detalle de la Bicicleta por ID</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {bikeId !== null && (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <BikeById id={bikeId} onCancel={handleCloseBikeDialog}/>
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

      <Dialog
        open={openBikeByCodeDialog}
        onClose={handleCloseBikeByCodeDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Detalle de la Bicicleta por Código</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {bikeCode && (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <BikeByCode identificationCode={bikeCode} onCancel={handleCloseBikeByCodeDialog}/>
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

      <Dialog open={openEditBikeDialog} onClose={handleCloseEditBikeDialog} fullWidth maxWidth="md">
        <DialogTitle>Editar Bicicleta</DialogTitle>
        <DialogContent>
          {editBikeId !== null && (
            <EditBike
              idBicycle={editBikeId}
              onSuccess={handleSuccessEdit}
              onCancel={handleCloseEditBikeDialog} // Agregar esta línea
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditBikeDialog} color="secondary">
            Salir
          </Button>
        </DialogActions>
      </Dialog>

      <BikesDetail updateTable={updateTable} />
    </div>
  );
};

export default BikePages;
