import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { AuthService } from '../core/application/AuthService';

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

interface ModuleDetailProps {
  code: string;
}

const fetchModulesByCode = async (code: string) => {
  const authService = new AuthService();
  try {
    const response = await authService.findModulesByCode(code);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching modules');
  }
};

const ModuleDetail: React.FC<ModuleDetailProps> = ({ code }) => {
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getModule = async () => {
      try {
        const data = await fetchModulesByCode(code);
        setModule(data);
      } catch (error) {
        console.error('Error fetching module:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    getModule();
  }, [code]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!module) return <Typography>No module found</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{module.name}</Typography>
        <Typography variant="body1">ID: {module.id}</Typography>
        <Typography variant="body1">Code: {module.code}</Typography>
        <Typography variant="body1">Module Type: {module.moduleType}</Typography>
        <Typography variant="body1">Enabled NP: {module.enabledNp ? 'Yes' : 'No'}</Typography>
        <Typography variant="body1">Enabled LP: {module.enabledLp ? 'Yes' : 'No'}</Typography>
        <Typography variant="body1">Min NP Level: {module.minNpLevel}</Typography>
        <Typography variant="body1">Min LP Level: {module.minLpLevel}</Typography>
      </CardContent>
    </Card>
  );
};

export default ModuleDetail;




/*  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await axios.get<Module>(
          `http://localhost:8053/adm-main/module/code/${code}`,
          {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer YOUR_TOKEN_HERE'
            }
          }
        );
        setModule(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching module', error);
        setError('Error fetching module');
        setLoading(false);
      }
    };

    fetchModule();
  }, [code]);  */