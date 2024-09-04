import React, { useState, useRef, useEffect } from 'react';
import {
  Button, TextField, Box, Menu, MenuItem,
  ListItemIcon, ListItemText, Dialog, DialogActions, DialogContent,
  DialogTitle, IconButton
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import RoleTable from '../../components/Role/RoleDetail';
import RoleById from '../../components/Role/RoleById';
import AddRole from '../../components/Role/AddRole';

const RoleList: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showSearchById, setShowSearchById] = useState(false);
  const [roleId, setRoleId] = useState<number | null>(null);
  const [showAddRole, setShowAddRole] = useState(false);
  const [showRoleDetails, setShowRoleDetails] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setShowSearchById(false);
  };

  const handleSearchById = () => {
    setShowSearchById(prev => !prev);  // Alterna el estado
    setShowAddRole(false);
    setShowRoleDetails(false);
  };

  const handleAddRole = () => {
    setShowAddRole(true);
    setShowSearchById(false);
    setShowRoleDetails(false);
    handleMenuClose();
  };

  const handleCancel = () => {
    setShowSearchById(false);
    setShowAddRole(false);
    setShowRoleDetails(false);
    setRoleId(null);
  };

  const handleRoleAdded = () => {
    // Lógica adicional después de agregar un rol
    setShowAddRole(false);
  };

  const handleSearchRole = () => {
    if (roleId !== null) {
      setShowRoleDetails(true);
    }
  };

  // Manejo de clic fuera del menú
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleMenuClose();
      }
    };

    if (anchorEl) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
        id="action-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        ref={menuRef} // Referencia al menú
      >
        <MenuItem onClick={handleSearchById}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Buscar por ID" />
        </MenuItem>
        {showSearchById && (
          <Box display="flex" alignItems="center" marginLeft="16px">
            <TextField
              label="Ingrese la ID del módulo"
              type="number"
              fullWidth
              onChange={(e) => setRoleId(Number(e.target.value))}
            />
            <IconButton
              color="primary"
              onClick={handleSearchRole}
              style={{ marginLeft: '8px' }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        )}
        <MenuItem onClick={handleAddRole}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Agregar Rol" />
        </MenuItem>
      </Menu>

      <Dialog open={showRoleDetails} onClose={handleCancel} maxWidth="md" fullWidth>
        <DialogTitle>Detalles del Rol</DialogTitle>
        <DialogContent>
          {roleId !== null && <RoleById id={roleId} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Salir
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showAddRole} onClose={handleCancel} maxWidth="md" fullWidth>
        <DialogTitle>Agregar Rol</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          <AddRole onRoleAdded={handleRoleAdded} onCancel={handleCancel} />
        </DialogContent>
      </Dialog>

      {/* La tabla siempre está visible */}
      <RoleTable />
    </div>
  );
};

export default RoleList;
