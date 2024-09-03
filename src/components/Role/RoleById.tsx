import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
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

    <List>
      <ListItem>
        <ListItemText primary="*ID:" secondary={role.id} />
      </ListItem>     
      <ListItem>
        <ListItemText primary="*DESCRIPCIÓN:" secondary={role.description} />
      </ListItem>  
      <ListItem>
        <ListItemText primary="*ID DE MODULO:" secondary={role.idModule} />
      </ListItem>  
      <ListItem>
        <ListItemText primary="*FIJO:" secondary={role.fixed ? 'Yes' : 'No'} />
      </ListItem>  
      <ListItem>
        <ListItemText primary="*HABILITADO:" secondary={role.enabled ? 'Yes' : 'No'} />
      </ListItem>  
      <ListItem>
        <ListItemText primary="*DESHABILITADO:" secondary={role.deleted ? 'Yes' : 'No'} />
      </ListItem>  
      <ListItem>
        <ListItemText primary="*TSI:" secondary={role.tsi} />
      </ListItem>  
      <ListItem>
        <ListItemText primary="*TSU:" secondary={role.tsu} />
      </ListItem>       
      <ListItem>
        <ListItemText primary="*PERMISOS:" secondary={role.permissionsList.join(', ')} />
      </ListItem> 
    </List>    
  );
};

export default RoleById;


