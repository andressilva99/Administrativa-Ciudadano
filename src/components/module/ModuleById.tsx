import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress,List, ListItem, ListItemText} from '@mui/material';
import { ByIdModule, ModuleByIdProps } from '../../core/entities/module/IModule';
import { ModuleRepository } from '../../infrastructure/repository/ModuleRepository'; // Asegúrate de importar la clase implementada del repositorio
import { ApiService } from '../../infrastructure/http/ApiService';

const apiService = new ApiService();
const moduleRepository = new ModuleRepository(apiService);

const fetchModulesById = async (id: number): Promise<ByIdModule> => {
  try {
    const response = await moduleRepository.findModulesById(id);
    return response;
  } catch (error) {
    console.error('Error fetching module:', error);
    throw new Error('Error fetching module');
  }
};

const ModuleById: React.FC<ModuleByIdProps> = ({ id }) => {
  const [module, setModule] = useState<ByIdModule | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getModule = async () => {
      try {
        const data = await fetchModulesById(id);
        setModule(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    getModule();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!module) return <Typography>No module found</Typography>;

  return (
    <List>
      <ListItem>
        <ListItemText primary="*ID:" secondary={module.id} />
      </ListItem>
      <ListItem>
        <ListItemText primary="*NOMBRE:" secondary={module.name} />
      </ListItem>
      <ListItem>
        <ListItemText primary="*CÓDIGO:" secondary={module.code} />
      </ListItem>
      <ListItem>
        <ListItemText primary="*TIPO DE MÓDULO:" secondary={module.moduleType} />
      </ListItem>
      <ListItem>
        <ListItemText primary="*NP HABILITADO:" secondary={module.enabledNp ? 'Yes' : 'No'} />
      </ListItem>
      <ListItem>
        <ListItemText primary="*LP HABILITADO:" secondary={module.enabledLp ? 'Yes' : 'No'} />
      </ListItem>
      <ListItem>
        <ListItemText primary="*MIN NIVEL NP:" secondary={module.minNpLevel} />
      </ListItem>
      <ListItem>
        <ListItemText primary="*MIN NIVEL LP:" secondary={module.minLpLevel} />
      </ListItem>      
    </List>
  );
};

export default ModuleById;


