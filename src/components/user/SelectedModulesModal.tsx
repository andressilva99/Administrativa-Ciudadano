import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { ApiService } from '../../infrastructure/http/ApiService';
import { ModuleRepository } from '../../infrastructure/repository/ModuleRepository';
import { RoleRepository } from '../../infrastructure/repository/RoleRepository';

const apiService = new ApiService();
const moduleRepository = new ModuleRepository(apiService);
const roleRepository = new RoleRepository(apiService);

interface SelectModulesProps {
  userId: number;
  selectedRoleIds: number[];
  onSave: (updatedModules: number[]) => void;
  onClose: () => void;
}

const SelectModulesModal: React.FC<SelectModulesProps> = ({
  userId,
  selectedRoleIds,
  onSave,
  onClose,
}) => {
  const [modules, setModules] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [loadingModules, setLoadingModules] = useState<boolean>(false);
  const [loadingRoles, setLoadingRoles] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [pendingRole, setPendingRole] = useState<number | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      setLoadingModules(true);
      try {
        const data = await moduleRepository.findModules(0, 100);
        const filteredModules = data.list.filter(
          (module: any) => module.moduleType === 'NATIVO_INTERNO',
        );
        setModules(filteredModules);
      } catch (error) {
        setMessage({ type: 'error', text: 'Error al obtener los módulos' });
      } finally {
        setLoadingModules(false);
      }
    };

    fetchModules();
  }, []);

  const handleFetchRoles = async (moduleCode: string) => {
    setLoadingRoles(true);
    
    try {
      const data = await roleRepository.findRoles(moduleCode, 0, 100);
      setRoles(
        data.list.map((role) => ({
          ...role,
          id: role.id,
        }))
      );
      console.log(data);
      setMessage(null);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error al obtener los roles' });
      console.error('Error fetching roles', err);
    } finally {
      setLoadingRoles(false);
    }
  };

  const handleModuleClick = (module: any) => {
    if (selectedModule === module.id) {
      setSelectedModule(null);
    } else {
      setSelectedModule(module.id);
      handleFetchRoles(module.code);
    }
  };

  const handleRoleToggle = (roleId: number) => {
    setPendingRole((prev) => (prev === roleId ? null : roleId));
  };

  const saveChanges = async () => {
    if (pendingRole === null) return;
    
    try {
      const isAssigned = selectedRoleIds.includes(pendingRole);
      console.log(pendingRole);

      if (isAssigned) {
        await roleRepository.unsetRole(userId, pendingRole);
        setMessage({ type: 'success', text: 'Rol quitado con éxito' });

        const updatedRoles = selectedRoleIds.filter((id) => id !== pendingRole);
        onSave(updatedRoles);
      } else {
        await roleRepository.setRole(userId, pendingRole);
        setMessage({ type: 'success', text: 'Rol asignado con éxito' });

        const updatedRoles = [...selectedRoleIds, pendingRole];
        onSave(updatedRoles);
      }

      setTimeout(() => {
        setMessage(null);
        setPendingRole(null);
      }, 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error al asignar/quitar el rol' });
      
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const memoizedModules = useMemo(() => {
    return modules.map((module) => (
      <React.Fragment key={module.id}>
        <ListItem onClick={() => handleModuleClick(module)}>
          <ListItemText primary={module.name} />
          <Button variant="outlined">
            {selectedModule === module.id ? 'Ocultar Roles' : 'Mostrar Roles'}
          </Button>
        </ListItem>

        {selectedModule === module.id && (
          <List component="div" disablePadding>
            <Typography variant="subtitle1" gutterBottom>
              Roles
            </Typography>
            {loadingRoles ? (
              <CircularProgress />
            ) : (
              roles.map((role) => (
                <ListItem
                  key={role.id}
                  style={{
                    paddingLeft: '10px',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ListItemText primary={role.name} />
                  <Button variant="outlined" onClick={() => handleRoleToggle(role.id)}>
                    {pendingRole === role.id || selectedRoleIds.includes(role.id)
                      ? 'Quitar Rol'
                      : 'Dar Rol'}
                  </Button>
                </ListItem>
              ))
            )}
          </List>
        )}
      </React.Fragment>
    ));
  }, [modules, roles, selectedModule, loadingRoles, pendingRole, selectedRoleIds]);

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Módulos</DialogTitle>
      <DialogContent>
        {message && <Alert severity={message.type}>{message.text}</Alert>}
        {loadingModules ? (
          <CircularProgress />
        ) : (
          <List>{memoizedModules}</List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={saveChanges} color='primary' variant='contained' disabled={pendingRole === null}>
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectModulesModal;
