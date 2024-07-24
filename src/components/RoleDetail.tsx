import React, { useState, useEffect } from 'react';
import { Typography, Paper, CircularProgress } from '@mui/material';
import { AuthService } from '../core/application/AuthService';

interface Role {
  id: number;
  idModule: number;
  name: string;
  description: string;
  fixed: boolean;
  enabled: boolean;
  deleted: boolean;
  tsi: string;
  tsu: string;
  permissionsList: string[];
}

interface RoleDetailProps {
  id: number; // Asegúrate de que el parámetro que pasas sea el correcto
}

const fetchRole = async (id: number, enabled: boolean, deleted: boolean, page: number, size: number) => {
  const authService = new AuthService();
  const response = await authService.findRoles(id, enabled, deleted, page, size);
  return response.list.find((role: Role) => role.id === id); // Filtra para obtener el rol específico
};

const RoleDetail: React.FC<RoleDetailProps> = ({ id }) => {
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRole = async () => {
      try {
        const data = await fetchRole(id, true, false, 1, 10); // Ajusta los parámetros según lo que necesites
        setRole(data || null);
      } catch (error) {
        console.error('Error fetching role:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    getRole();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (!role) {
    return <Typography>No role found.</Typography>;
  }

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6">Role Details</Typography>
      <Typography>ID: {role.id}</Typography>
      <Typography>Module ID: {role.idModule}</Typography>
      <Typography>Name: {role.name}</Typography>
      <Typography>Description: {role.description}</Typography>
      <Typography>Fixed: {role.fixed ? 'Yes' : 'No'}</Typography>
      <Typography>Enabled: {role.enabled ? 'Yes' : 'No'}</Typography>
      <Typography>Deleted: {role.deleted ? 'Yes' : 'No'}</Typography>
      <Typography>TSI: {role.tsi}</Typography>
      <Typography>TSU: {role.tsu}</Typography>
      <Typography>Permissions: {role.permissionsList.join(', ')}</Typography>
    </Paper>
  );
};

export default RoleDetail;



/* useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get<Role>(
          `http://localhost:8053/adm-main/admrole/${id}`,
          {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer YOUR_AUTH_TOKEN'
            }
          }
        );
        setRole(response.data);
      } catch (error) {
        console.error('Error fetching role:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [id]); */