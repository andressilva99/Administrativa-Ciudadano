import React, { useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Paper,
  TextField,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import BikesDetail from '../../components/bike/BikesDetail';// Asegúrate de que la ruta sea correcta

const BikePages: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [updateTable, setUpdateTable] = useState(false);
  const [moduleId, setModuleId] = useState<number | null>(null);
  const [idModule, setIdModule] = useState<string>('');
  
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchModuleById = () => {
    // Implementar lógica para buscar por ID
    handleMenuClose();
  };

  const handleSearchModuleByCode = () => {
    // Implementar lógica para buscar por código
    handleMenuClose();
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
        <MenuItem onClick={handleSearchModuleById}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Buscar por ID" />
        </MenuItem>
        <MenuItem onClick={handleSearchModuleByCode}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Buscar por Código" />
        </MenuItem>
      </Menu>

      <Paper style={{ padding: '16px' }}>
        <BikesDetail updateTable={updateTable} />
      </Paper>
    </div>
  );
};

export default BikePages;
