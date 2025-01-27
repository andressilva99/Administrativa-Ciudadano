import AddIcon from '@mui/icons-material/Add';
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
import CreateModule from '../../components/module/CreateModule'; // Asegúrate de que la ruta sea correcta
import EditModule from '../../components/module/EditModule';
import ModuleByCode from '../../components/module/ModuleByCode';
import ModuleById from '../../components/module/ModuleById';
import ModulesDetail from '../../components/module/ModulesDetail';
import { useSelector } from 'react-redux';
import { selectUserPermissions, selectUserRoot } from '../../store/reducers/slices/userSlice';

const ModuleList: React.FC = () => {
  const [moduleId, setModuleId] = useState<number | null>(null);
  const [idModule, setidModule] = useState<string>('');
  const [editModuleId, setEditModuleId] = useState<number | null>(null);
  const [showModuleById, setShowModuleById] = useState(false);
  const [showModuleByCode, setShowModuleByCode] = useState(false);
  const [showEditModuleSearch, setShowEditModuleSearch] = useState(false);
  const [openModuleDialog, setOpenModuleDialog] = useState(false);
  const [openModuleByCodeDialog, setOpenModuleByCodeDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false); // Estado para el diálogo de creación
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [updateTable, setUpdateTable] = useState(false);
  const openMenu = Boolean(anchorEl);

  const userPermissions = useSelector(selectUserPermissions) || [];
  const isRoot = useSelector(selectUserRoot);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setShowModuleById(false);
    setShowModuleByCode(false);
    setShowEditModuleSearch(false);
  };

  const handleToggleModuleById = () => {
    setShowModuleById((prev) => !prev);
    setShowModuleByCode(false);
    setShowEditModuleSearch(false);
    if (showModuleById) {
      setModuleId(null);
    }
  };

  const handleSearchModuleById = () => {
    setOpenModuleDialog(true);
    setShowModuleById(false);
    handleMenuClose();
  };

  const handleCloseModuleDialog = () => {
    setOpenModuleDialog(false);
    setModuleId(null);
  };

  const handleToggleModuleByCode = () => {
    setShowModuleByCode((prev) => !prev);
    setShowModuleById(false);
    setShowEditModuleSearch(false);
    if (showModuleByCode) {
      setidModule('');
    }
  };

  const handleSearchModuleByCode = () => {
    setOpenModuleByCodeDialog(true);
    setShowModuleByCode(false);
    handleMenuClose();
  };

  const handleCloseModuleByCodeDialog = () => {
    setOpenModuleByCodeDialog(false);
    setidModule('');
  };

  // const handleToggleEditModuleSearch = () => {
  //   setShowEditModuleSearch((prev) => !prev);
  //   setShowModuleById(false);
  //   setShowModuleByCode(false);
  //   if (showEditModuleSearch) {
  //     setEditModuleId(null);
  //   }
  // };

  // const handleSearchEditModule = () => {
  //   if (editModuleId !== null) {
  //     setOpenEditDialog(true);
  //   }
  //   setShowEditModuleSearch(false);
  //   handleMenuClose();
  // };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditModuleId(null);
  };

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
    handleMenuClose();
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleModuleAdded = () => {
    // Lógica adicional después de agregar un rol
    setUpdateTable((prev) => !prev);
    setOpenCreateDialog(false);
  };
  const handleSuccess = () => {
    // Lógica después de la actualización exitosa
    handleCloseEditDialog();
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
        {isRoot || userPermissions.includes('MODULE_VIEW_N') ? (
          <MenuItem onClick={handleToggleModuleById}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Buscar por ID" />
          </MenuItem>
        ) : null}
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
        {isRoot || userPermissions.includes('MODULE_VIEW_N') ? (
          <MenuItem onClick={handleToggleModuleByCode}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Buscar por Código" />
          </MenuItem>
        ) : null}
        {showModuleByCode && (
          <Box display="flex" alignItems="center" marginLeft="16px">
            <TextField
              label="Ingrese el código del módulo"
              fullWidth
              onChange={(e) => setidModule(e.target.value)}
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

        {/* {isRoot || userPermissions.includes('MODULE_EDIT') ? (
          <MenuItem onClick={handleToggleEditModuleSearch}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Editar Módulo" />
          </MenuItem>
        ) : null}
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
        )} */}

        {isRoot || userPermissions.includes('MODULE_ADD') ? (
          <MenuItem onClick={handleOpenCreateDialog}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Crear Módulo" />
          </MenuItem>
        ) : null}
      </Menu>
      <Dialog open={openModuleDialog} onClose={handleCloseModuleDialog} fullWidth maxWidth="md">
        <DialogTitle>Detalle del Módulo</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {moduleId !== null && (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <ModuleById id={moduleId} onCancel={handleCloseModuleDialog} />
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModuleDialog} color="secondary">
            Salir
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openModuleByCodeDialog}
        onClose={handleCloseModuleByCodeDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Detalle del Módulo por Código</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {idModule && (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <ModuleByCode code={idModule} onCancell={handleCloseModuleByCodeDialog}/>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModuleByCodeDialog} color="secondary">
            Salir
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth maxWidth="md">
        <DialogTitle>Editar Módulo</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          {editModuleId !== null && (
            <EditModule
              moduleId={editModuleId}
              onCancel={handleCloseEditDialog} // Asegúrate de pasar esta función
              onSuccess={handleSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog} fullWidth maxWidth="md">
        <DialogTitle>Crear Módulo</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          <CreateModule
            onModuleCreated={() => handleModuleAdded()} // Callback para cuando se cree un módulo
            onCancel={() => handleCloseCreateDialog()} // Callback para cancelar
          />
        </DialogContent>
      </Dialog>
      <ModulesDetail updateTable={updateTable} /> {/* Pasa updateTable a RoleTable */}
    </div>
  );
};

export default ModuleList;
