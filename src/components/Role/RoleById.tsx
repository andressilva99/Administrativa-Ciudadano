import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { AuthService } from '../../core/application/AuthService';

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

interface RolesByIdProps {
  id: number;
}

const fetchRoleById = async (id: number): Promise<Role> => {
  const authService = new AuthService();
  try {
    const response = await authService.findRoleById(id);
    return response;
  } catch (error) {
    console.error('Error fetching module:', error);
    throw new Error('Error fetching module');
  }
};

const RoleById: React.FC<RolesByIdProps> = ({ id }) => {
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRole = async () => {
      try {
        const data = await fetchRoleById(id);
        setRole(data);
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

    getRole();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!role) {
    return <div>No role found</div>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{role.name}</Typography>
        <Typography variant="body1">ID: {role.id}</Typography>
        <Typography variant="body1">Description: {role.description}</Typography>
        <Typography variant="body1">Module ID: {role.idModule}</Typography>
        <Typography variant="body1">Fixed: {role.fixed ? 'Yes' : 'No'}</Typography>
        <Typography variant="body1">Enabled: {role.enabled ? 'Yes' : 'No'}</Typography>
        <Typography variant="body1">Deleted: {role.deleted ? 'Yes' : 'No'}</Typography>
        <Typography variant="body1">TSI: {role.tsi}</Typography>
        <Typography variant="body1">TSU: {role.tsu}</Typography>
        <Typography variant="body1">Permissions: {role.permissionsList.join(', ')}</Typography>
      </CardContent>
    </Card>
  );
};

export default RoleById;


