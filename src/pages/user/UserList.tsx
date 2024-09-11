import React, { useEffect, useRef, useState } from 'react';
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
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import UsersDetail from '../../components/user/UsersDetail';
import AddUser from '../../components/user/AddUser';
import UserById from '../../components/user/UserById';

const UsersList: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showSearchById, setShowSearchById] = useState(false);
  const [showSearchByDni, setShowSearchByDni] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [dni, setDni] = useState<string>('');
  const [showAddUser, setShowAddUser] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setShowSearchById(false);
    setShowSearchByDni(false);
  };

  const handleSearchById = () => {
    setShowSearchById(prev => !prev);
    setShowSearchByDni(false);
    setShowAddUser(false);
    setShowUserDetails(false);
  };

  const handleSearchByDni = () => {
    setShowSearchByDni(prev => !prev);
    setShowSearchById(false);
    setShowAddUser(false);
    setShowUserDetails(false);
  };

  const handleAddUser = () => {
    setShowAddUser(true);
    setShowSearchByDni(false);
    setShowSearchById(false);
    setShowUserDetails(false);
    handleMenuClose();
  };

  const handleCancel = () => {
    setShowAddUser(false);
    setShowSearchByDni(false);
    setShowSearchById(false);
    setShowUserDetails(false);
    setUserId(null);
    setDni('');
  };

  const handleUserAdded = () => {
    setShowAddUser(false);
  };

  const handleSearchUserById = () => {
    if ( userId !== null) {
      setShowUserDetails(true);
    }
  };

  const handleSearchUserByDni = () => {
    if ( dni ) {
      setShowUserDetails(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if( menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleMenuClose();
      }
    };

    if (anchorEl) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [anchorEl]);

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
        id='action-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        ref={menuRef}
      >
        <MenuItem onClick={handleSearchById}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary='Buscar por ID' />
        </MenuItem>

        { showSearchById && (
          <Box display="flex" alignItems="center" marginLeft="16px">
            <TextField
              label ="Ingrese la ID del usuario"
              type="number"
              fullWidth
              onChange={(e) => setUserId(Number(e.target.value))} 
            />
            <IconButton
              color='primary'
              onClick={handleSearchUserById}
              style={{ marginLeft: '8px' }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        )}

        <MenuItem onClick={handleSearchByDni}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary='Buscar por DNI' />
        </MenuItem>

        { showSearchByDni && (
          <Box display="flex" alignItems="center" marginLeft="16px">
            <TextField
              label ="Ingrese el DNI del usuario"
              type="string"
              fullWidth
              onChange={(e) => setDni(e.target.value)} 
            />
            <IconButton
              color='primary'
              onClick={handleSearchUserByDni}
              style={{ marginLeft: '8px' }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        )}

        <MenuItem onClick={handleAddUser}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary='Agregar Usuario' />
        </MenuItem>
      </Menu>
      
      <Dialog open={showUserDetails} onClose={handleCancel} maxWidth="md" fullWidth>
        <DialogTitle>Detalles del Usuario</DialogTitle>
        <DialogContent>
          {showUserDetails && userId !== null && (
            <UserById id={userId} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Salir
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={showAddUser} onClose={handleCancel} maxWidth="md" fullWidth>
        <DialogTitle>Agregar Usuario</DialogTitle>
        <DialogContent>
          {showAddUser && (
            <AddUser onUserAdded={handleUserAdded} onCancel=  {handleCancel} />
          )}
        </DialogContent>
      </Dialog>

      <Paper style={{ padding: '16px', marginBottom: '16px' }}>
        <UsersDetail /> {/*render table*/}
      </Paper>
    </div>
  );
};

export default UsersList;
