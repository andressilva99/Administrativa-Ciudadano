import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
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

interface RoleResponse {
  list: Role[];
  total: number;
  size: number;
}

interface RoleProps {
  moduleId: number;
  enabled: boolean;
  deleted: boolean;
  page: number;
  size: number;
  onRoleSelect: (id: number) => void;
}

const fetchRoles = async (moduleId: number, enabled: boolean, deleted: boolean, page: number, size: number) => {
  const authService = new AuthService();
  const response = await authService.findModules(moduleId, enabled, deleted, page, size);
  return response.data;
};

const Role: React.FC<RoleProps> = ({ moduleId, enabled, deleted, page, size, onRoleSelect }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const getRoles = async () => {
      setLoading(true);
      try {
        const data: RoleResponse = await fetchRoles(moduleId, enabled, deleted, page, size);
        setRoles(data.list);
        setTotal(data.total);
      } catch (error) {
        console.error('Error fetching roles:', error);
      } finally {
        setLoading(false);
      }
    };

    getRoles();
  }, [moduleId, enabled, deleted, page, size]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>ID De Modulo</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Fijo</TableCell>
            <TableCell>Activado</TableCell>
            <TableCell>Desactivado</TableCell>
            <TableCell>TSI</TableCell>
            <TableCell>TSU</TableCell>
            <TableCell>Permisos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id} onClick={() => onRoleSelect(role.id)}>
              <TableCell>{role.id}</TableCell>
              <TableCell>{role.idModule}</TableCell>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell>{role.fixed ? 'Yes' : 'No'}</TableCell>
              <TableCell>{role.enabled ? 'Yes' : 'No'}</TableCell>
              <TableCell>{role.deleted ? 'Yes' : 'No'}</TableCell>
              <TableCell>{role.tsi}</TableCell>
              <TableCell>{role.tsu}</TableCell>
              <TableCell>{role.permissionsList.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Role;



/* useEffect(() => {
  const fetchRoles = async () => {
    try {
      const response = await axios.get<RoleResponse>(
        'http://localhost:8053/adm-main/admrole/find',
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer YOUR_AUTH_TOKEN'
          },
          params: {
            moduleId: '',
            enabled: '',
            deleted: '',
            page: '',
            size: ''
          }
        }
      );
      setRoles(response.data.list);
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchRoles();
}, []); */