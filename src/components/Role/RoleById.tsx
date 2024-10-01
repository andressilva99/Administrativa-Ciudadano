import React, { useState, useEffect } from 'react';
import {  CircularProgress, Typography,Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer, TableHead } from '@mui/material';
import { IRole } from '../../core/entities/role/IRole';
import { FindRoleById } from '../../core/use-cases/role/FindRoleById';
import { ApiService } from '../../infrastructure/http/ApiService';
import { RoleRepository } from '../../infrastructure/repository/RoleRepository';

interface RolesByIdProps {
  id: number;
}

const useRoleById = (id: number) => {
  const [role, setRole] = useState<IRole | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      const apiService = new ApiService();
      const roleRepository = new RoleRepository(apiService);
      const findById = new FindRoleById(roleRepository);

      try {
        const data = await findById.findRoleById(id);
        setRole(data);
        console.log('Fetched role:', data); 
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

    fetchRole();
  }, [id]);

  return { role, loading, error };
};

const RoleById: React.FC<RolesByIdProps> = ({ id }) => {
  const { role, loading, error } = useRoleById(id);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!role) {
    return <div>No role found</div>;
  }

  const activePermissions = role.permissionsList.filter(permission => permission.active);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>*Campo</TableCell>
            <TableCell>Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>*ID:</TableCell>
            <TableCell>{role.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*DESCRIPCIÓN:</TableCell>
            <TableCell>{role.description}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*ID DE MÓDULO:</TableCell>
            <TableCell>{role.idModule}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*FIJO:</TableCell>
            <TableCell>{role.fixed ? 'Yes' : 'No'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*HABILITADO:</TableCell>
            <TableCell>{role.enabled ? 'Yes' : 'No'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*DESHABILITADO:</TableCell>
            <TableCell>{role.deleted ? 'Yes' : 'No'}</TableCell>
          </TableRow>      
          <TableRow>
            <TableCell>*PERMISOS ACTIVOS:</TableCell>
            <TableCell>
              {activePermissions.length > 0 ? (
                activePermissions.map(permission => (
                  <Typography key={permission.name}>
                    {permission.description}
                  </Typography>
                ))
              ) : (
                <Typography>No active permissions</Typography>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoleById;
