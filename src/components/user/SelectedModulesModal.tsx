import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ApiService } from '../../infrastructure/http/ApiService';
import { ModuleRepository } from '../../infrastructure/repository/ModuleRepository';
import { RoleRepository } from '../../infrastructure/repository/RoleRepository';

const apiService = new ApiService();
const moduleRepository = new ModuleRepository(apiService);
const roleRepository = new RoleRepository(apiService);

interface SelectModulesProps {
  userId: number;
  selectedModules: number[];
  onSave: (updatedModules: number[]) => void;
  onClose: () => void;
}

const SelectModulesModal: React.FC<SelectModulesProps> = ({
  userId,
  selectedModules,
  onSave,
  onClose,
}) => {
  const [modules, setModules] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [loadingPermissions, setLoadingPermissions] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data = await moduleRepository.findModules(0, 100);
        const filteredModules = data.list.filter(
          (module: any) => module.moduleType === 'NATIVO_INTERNO',
        );
        setModules(filteredModules);
      } catch (error) {
        console.error('Error fetching modules', error);
      }
    };

    fetchModules();
  }, []);

  const handleFetchRoles = async (moduleCode: string) => {
    try {
      const data = await roleRepository.findRoles(moduleCode, 0, 100);
      setRoles(data.list);
    } catch (err) {
      console.error('Error fetching roles', err);
    }
  };

  const handleFetchPermissions = async (roleId: number) => {
    setLoadingPermissions(true);
    try {
      const role = await roleRepository.findRoleById(roleId);
      setPermissions(role.permissionsList);
    } catch (err) {
      console.error('Error fetching permissions', err);
    } finally {
      setLoadingPermissions(false);
    }
  };

  const handlePermissionToggle = (permissionName: string) => {
    if (selectedPermissions.includes(permissionName)) {
      setSelectedPermissions((prev) => prev.filter((name) => name !== permissionName));
    } else {
      setSelectedPermissions((prev) => [...prev, permissionName]);
    }

    setSuccessMessage('Permiso seleccionado con éxito');
  };

  const handleRoleClick = (module: any) => {
    setSelectedModule(module.id);
    handleFetchRoles(module.code);
  };

  const handleRoleSelection = (roleId: number) => {
    setSelectedRoles(roleId);
    handleFetchPermissions(roleId);
  };

  const handleSaveRoles = async () => {
    try {
      const selectedRole = roles.find((role) => role.id === selectedRoles);
      if (selectedRole) {
        const permissionsToUpdate = permissions.map((permission) => ({
          ...permission,
          checked: selectedPermissions.includes(permission.name),
        }));

        const payload = {
          idAdmUser: userId,
          idAdmRole: selectedRole.id,
          permissionsList: permissionsToUpdate,
        };

        await roleRepository.setRole(userId, selectedRole.id);
        setSuccessMessage('Roles y permisos guardados con éxito');

        setTimeout(() => {
          setSelectedRoles(null);
          setSuccessMessage(null);
        }, 2000);
      }
    } catch (err) {
      console.error('Error al guardar los roles', err);
    }
  };

  const handleCloseModuleModal = () => {
    setSelectedRoles(null);
    onClose();
  };

  return (
    <>
      <Dialog open={selectedRoles === null} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Seleccionar Módulos</DialogTitle>
        <DialogContent>
          <List>
            {modules.map((module) => (
              <ListItem key={module.id}>
                <ListItemText primary={module.name} />
                <Button variant="outlined" onClick={() => handleRoleClick(module)}>
                  Agregar Rol
                </Button>
              </ListItem>
            ))}
          </List>

          {selectedModule && (
            <>
              <Typography variant="h6">Seleccionar Rol</Typography>
              <List>
                {roles.map((role) => (
                  <ListItem key={role.id}>
                    <ListItemText primary={role.name} />
                    <Button variant="outlined" onClick={() => handleRoleSelection(role.id)}>
                      Permisos
                    </Button>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>

      {selectedRoles !== null && (
        <Dialog open onClose={handleCloseModuleModal} fullWidth maxWidth="sm">
          <DialogTitle>Gestionar Permisos del Rol</DialogTitle>
          <DialogContent>
            {loadingPermissions ? (
              <CircularProgress />
            ) : (
              <>
                <Typography variant="h6">Permisos</Typography>
                <Grid container spacing={2}>
                  {permissions.map((permission) => (
                    <Grid item xs={12} key={permission.name}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedPermissions.includes(permission.name)}
                            onChange={() => handlePermissionToggle(permission.name)}
                          />
                        }
                        label={permission.description}
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

            {successMessage && <Typography color="primary">{successMessage}</Typography>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSaveRoles} color="primary">
              Guardar Cambios
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default SelectModulesModal;
