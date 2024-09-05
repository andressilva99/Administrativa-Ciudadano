import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { IRole } from '../../core/entities/role/IRole';
import { FindRoleById } from '../../core/use-cases/role/FindRoleById';

interface RolesByIdProps {
  id: number;
  findRoleById: FindRoleById;
}

const RoleById: React.FC<RolesByIdProps> = ({ id, findRoleById }) => {
  const [role, setRole] = useState<IRole | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRole = async () => {
      setLoading(true);
      try {
        const data = await findRoleById.findRoleById(id);
        setRole(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    getRole();
  }, [id, findRoleById]);

  if (loading) {
    return <CircularProgress />;
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


