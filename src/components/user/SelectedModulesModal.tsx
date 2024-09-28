import React, { useEffect, useState } from 'react';
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
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [loadingRoles, setLoadingRoles] = useState<boolean>(false);
  const [message, setMessage] = useState<{type: 'success'| 'error'; text: string} | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data = await moduleRepository.findModules(0, 100);
        const filteredModules = data.list.filter(
          (module: any) => module.moduleType === 'NATIVO_INTERNO',
        );
        setModules(filteredModules);
      } catch (error) {
        setMessage({ type: 'error', text: 'Error al obtener los módulos'});
      }
    };

    fetchModules();
  }, []);

  const handleFetchRoles = async (moduleCode: string) => {
    setLoadingRoles(true);
    try {
      const data = await roleRepository.findRoles(moduleCode, 0, 100);
      setRoles(data.list);
      setMessage(null);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error al obtener los roles'});
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

  const handleRoleToggle = async (roleId: number) => {
    try {
      const isAssigned = selectedModules.includes(roleId);
      if (isAssigned) {
        await roleRepository.unsetRole(userId, roleId);
        setMessage({ type: 'success', text: 'Rol quitado con éxito'});
      } else {
        await roleRepository.setRole(userId, roleId);
        setMessage({ type: 'success', text: 'Rol asignado con éxito'});
      }

      onSave([selectedModule!]);

      setTimeout(() => {
        setMessage(null);
      }, 4000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error al asignar/quitar el rol'});
    }
  };

  return (
      <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Módulos</DialogTitle>
        <DialogContent>
          {message && <Alert severity={message.type}>{message.text}</Alert>}

          <List>
            {modules.map((module) => (
              <React.Fragment key={module.id}>
                <ListItem
                  style={{
                    display:
                      selectedModule === null || selectedModule === module.id ? 'block' : 'none',
                  }}
                >
                  <ListItemText primary={module.name} />
                  <Button variant="outlined" onClick={() => handleModuleClick(module)}>
                    {selectedModule === module.id ? 'Ocultar Roles' : 'Mostrar Roles'}
                  </Button>
                </ListItem>

                {selectedModule === module.id && (
                  <List component="div" disablePadding style={{ marginLeft: '20px' }}>
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
                            {selectedModules.includes(role.id) ? 'Quitar Rol' : 'Dar Rol'}
                          </Button>
                        </ListItem>
                      ))
                    )}
                  </List>
                )}
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
  );
};

export default SelectModulesModal;
