import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
  IconButton,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import UsersDetail from '../../components/user/UsersDetail';
//import EditUser from '../../components/user/EditUser'; // Asegúrate de tener este componente

const UsersList: React.FC = () => {
  const [searchUserId, setSearchUserId] = useState<string>('');
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [openUserDialog, setOpenUserDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchUserById = () => {
    setOpenUserDialog(true);
    handleMenuClose();
  };

  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
    setSearchUserId('');
  };

  const handleEditUser = () => {
    setOpenEditDialog(true);
    handleMenuClose();
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditUserId(null);
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
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
      
        <MenuItem onClick={handleSearchUserById}>
        <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Agregar Usuario" />
        </MenuItem>
       {/*}
        <MenuItem onClick={handleEditUser}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Editar Usuario" />
        </MenuItem>*/}
      </Menu>

      <Paper style={{ padding: '16px', marginBottom: '16px' }}>
        <UsersDetail />
      </Paper>

      <Dialog open={openUserDialog} onClose={handleCloseUserDialog} fullWidth maxWidth="md">
        <DialogTitle>Agregar Usuario</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {searchUserId && (
            <div>
              {/* Aquí podrías incluir un componente para mostrar los detalles del usuario */}
              {/* Asegúrate de tener una función que cargue los detalles del usuario */}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUserDialog} color="secondary">
            Salir
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setEditUserId(searchUserId);
              setOpenEditDialog(true);
              handleCloseUserDialog();
            }}
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth maxWidth="md">
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>{/*
          {editUserId && (
            <EditUser
              userId={editUserId}
              onCancel={handleCloseEditDialog}
            />
          )}*/}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            Salir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersList;
