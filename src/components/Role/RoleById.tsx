import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { IRole } from '../../core/entities/role/IRole';
import { FindRoleById } from '../../core/use-cases/role/FindRoleById';
import { ApiService } from '../../infrastructure/http/ApiService';
import { RoleRepository } from '../../infrastructure/repository/RoleRepository';

interface RolesByIdProps {
  id: number;
}

const useRoleById = ( id: number ) => {
  const [role, setRole] = useState<IRole | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      const apiSerive = new ApiService();
      const roleRepository = new RoleRepository(apiSerive);
      const findById = new FindRoleById(roleRepository);

      try {
        const data = await findById.findRoleById(id);
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

    fetchRole();
  }, [id]);
   
  return { role, loading, error};
}

const RoleById: React.FC<RolesByIdProps> = ({ id }) => {

  const { role, loading, error} = useRoleById(id);

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


