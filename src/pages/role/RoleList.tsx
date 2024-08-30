import React, { useState } from 'react';
import {
  Button, TextField, Typography, Box, Menu, MenuItem,
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

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchById = () => {
    setShowSearchById(true);
    setShowAddRole(false);
    setShowRoleDetails(false);
    handleMenuClose();
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
      >
        <MenuItem onClick={handleSearchById}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Buscar por ID" />
        </MenuItem>
        <MenuItem onClick={handleAddRole}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Agregar Rol" />
        </MenuItem>
      </Menu>

      <Dialog open={showSearchById} onClose={handleCancel} maxWidth="sm" fullWidth>
        <DialogTitle>Buscar Rol por ID</DialogTitle>
        <DialogContent>
          <Box display="flex" alignItems="center">
            <TextField
              label="Ingrese la ID del rol"
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Salir
          </Button>
        </DialogActions>
      </Dialog>

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
        <DialogContent>
          <AddRole onRoleAdded={handleRoleAdded} onCancel={handleCancel} />
        </DialogContent>
      </Dialog>

      {!showAddRole && !showSearchById && !showRoleDetails && (
        <RoleTable />
      )}
    </div>
  );
};

export default RoleList;
