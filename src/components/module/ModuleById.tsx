import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress,List, ListItem, ListItemText} from '@mui/material';
import { AuthService } from '../../core/application/AuthService';

interface Module {
  id: number;
  code: string;
  moduleType: string;
  name: string;
  enabledNp: boolean;
  enabledLp: boolean;
  minNpLevel: number;
  minLpLevel: number;
  configuraciones: {
    empty: boolean;
  };
}

interface ModuleByIdProps {
  id: number;
}

const fetchModulesById = async (id: number): Promise<Module> => {
  const authService = new AuthService();
  try {
    const response = await authService.findModulesById(id);
    return response;
  } catch (error) {
    console.error('Error fetching module:', error);
    throw new Error('Error fetching module');
  }
};

const ModuleById: React.FC<ModuleByIdProps> = ({ id }) => {
  const [module, setModule] = useState<Module | null>(null);
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
        <ListItemText primary="ID:" secondary={module.id} />
      </ListItem>
      <ListItem>
        <ListItemText primary="NOMBRE:" secondary={module.name} />
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

