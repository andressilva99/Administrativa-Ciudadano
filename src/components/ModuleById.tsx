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

interface ModuleByIdProps {
  id: number;
}

const fetchModulesById = async (id: number): Promise<Module> => {
  const authService = new AuthService();
  try {
    const response = await authService.findModulesById(id);
    return response.data;
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

export default ModuleById;


/*   useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await axios.get<Module>(
          `http://lavalle253.ddns.net:8090/adm-main/module/${id}`,
          {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJVVE5GUlNGIiwic3ViIjoiQ3R6VXNlciIsImlkIjoxLCJpYXQiOjE3MjA0NDkyNzAsImV4cCI6MTcyMzA0MTI3MCwianRpIjoiNDAyY2RmNzctMDgwOC00NWQ1LTlkOWMtYzg4YmFiYWQxYTg1In0.NglGkRcTSaiFkMtpeIBxp9B35wOcwbYaCSvxceSf0bk',
            }
          }
        );
        if (!response) {
          throw new Error('Error getting response');
        }
        setModule(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching module', error);
        setError('Error fetching module');
        setLoading(false);
      }
    };

    fetchModule();
  }, [id]); */