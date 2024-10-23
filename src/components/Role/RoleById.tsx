import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
} from '@mui/material';
import Swal from 'sweetalert2'; 
import { IRole } from '../../core/entities/role/IRole';
import { FindRoleById } from '../../core/use-cases/role/FindRoleById';
import { ApiService } from '../../infrastructure/http/ApiService';
import { RoleRepository } from '../../infrastructure/repository/RoleRepository';

interface RolesByIdProps {
  id: number;
  onCancel: () => void;
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

const RoleById: React.FC<RolesByIdProps> = ({ id, onCancel }) => {
  const { role, loading, error } = useRoleById(id);

  useEffect(() => {
    if (!loading && !role) {
      // Si el rol no se encontró, muestra la alerta y cierra el diálogo
      Swal.fire({
        title: 'Rol no encontrado',
        text: 'No se encontró un rol con el ID proporcionado.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      })
      onCancel();
    }
  }, [loading, role, onCancel]);

  // Si está cargando, muestra el indicador de progreso
  if (loading) {
    return <CircularProgress />;
  }

  // Si hay un error, muéstralo
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Si no hay rol, no renderizamos nada porque el efecto ya maneja el cierre
  if (!role) {
    return null; // Esto ya se maneja en el useEffect
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
