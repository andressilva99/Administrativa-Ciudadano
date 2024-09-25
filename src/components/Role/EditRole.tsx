import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { ERole, EPermissionItem } from '../../core/entities/role/IRole';
import { RoleRepository } from '../../infrastructure/repository/RoleRepository';
import { ApiService } from '../../infrastructure/http/ApiService';
import { Permission } from '../../core/entities/role/Permission';

const apiService = new ApiService();
const roleRepository = new RoleRepository(apiService);

interface EditRoleProps {
  roleId: number;
  onCancel: () => void;
}

// Lista de permisos predeterminados
const defaultPermissions: EPermissionItem[] = [
  { name: Permission.ADMUSER_VIEW_N, active: false, description: 'Usuarios - listado' },
  { name: Permission.ADMUSER_VIEW_1, active: false, description: 'Usuarios - información' },
  { name: Permission.ADMUSER_ADD, active: false, description: 'Usuarios - alta' },
  { name: Permission.ADMUSER_EDIT, active: false, description: 'Usuarios - modificar' },
  { name: Permission.ADMUSER_DELETE, active: false, description: 'Usuarios - eliminar' },
  { name: Permission.ADMUSER_CHANGEPW, active: false, description: 'Usuarios - restablecer contraseña' },
  { name: Permission.ADMUSER_ROLE_SET, active: false, description: 'Usuarios - Rol establecer' },
  { name: Permission.ADMUSER_ROLE_UNSET, active: false, description: 'Usuarios - Rol quitar' },
  { name: Permission.ADMROLE_VIEW_N, active: false, description: 'Rol de usuario - listado' },
  { name: Permission.ADMROLE_VIEW_1, active: false, description: 'Rol de usuario - información' },
  { name: Permission.ADMROLE_ADD, active: false, description: 'Rol de usuario - alta' },
  { name: Permission.ADMROLE_EDIT, active: false, description: 'Rol de usuario - modificar' },
  { name: Permission.ADMROLE_DELETE, active: false, description: 'Rol de usuario - eliminar' },
  { name: Permission.MODULE_VIEW_N, active: false, description: 'Módulos - listado' },
  { name: Permission.MODULE_VIEW_1, active: false, description: 'Módulos - información' },
  { name: Permission.MODULE_ADD, active: false, description: 'Módulos - alta' },
  { name: Permission.MODULE_EDIT, active: false, description: 'Módulos - modificar' },
  { name: Permission.MODULE_DELETE, active: false, description: 'Módulos - eliminar' },
];

const EditRole: React.FC<EditRoleProps> = ({ roleId, onCancel }) => {
  const [role, setRole] = useState<ERole | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      setLoading(true);
      try {
        const data = await roleRepository.findRoleById(roleId);
        setRole(data);
      } catch (err) {
        console.error('Error fetching role', err);
        setError('Error fetching role');
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [roleId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (role) {
      const { name, checked } = e.target;

      // Buscar el permiso en la lista actual de permissionsList
      const permissionIndex = role.permissionsList.findIndex(permission => permission.name === name);

      if (permissionIndex >= 0) {
        // Si el permiso existe, actualizar el campo 'active'
        const updatedPermissionsList = [...role.permissionsList];
        updatedPermissionsList[permissionIndex] = {
          ...updatedPermissionsList[permissionIndex],
          active: checked // Actualiza solo el estado activo
        };

        setRole((prevRole) => prevRole ? { ...prevRole, permissionsList: updatedPermissionsList } : prevRole);
      } else if (checked) {
        // Si el permiso no está en la lista y se ha marcado, agregarlo
        const newPermission: EPermissionItem = {
          name: name as Permission,
          active: checked,
          description: '', // Establecer una descripción adecuada si es necesario
        };

        setRole((prevRole) => prevRole ? { ...prevRole, permissionsList: [...prevRole.permissionsList, newPermission] } : prevRole);
      }
    }
  };

  const handleSubmit = async () => {
    if (role) {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Crear un nuevo permissionsList que contenga todos los permisos, tanto activos como inactivos
      const formattedPermissionsList: EPermissionItem[] = defaultPermissions.map(permission => {
        const existingPermission = role.permissionsList.find(p => p.name === permission.name);
        return {
          ...permission,
          active: existingPermission ? existingPermission.active : false, // Determina si el permiso está activo o no
        };
      });

      const payload: ERole = {
        idRol: role.id,
        id: null,
        name: role.name,
        description: role.description,
        idModule: role.idModule,
        permissionsList: formattedPermissionsList,
        fixed: role.fixed,
        enabled: role.enabled,
        deleted: role.deleted,
        tsi: role.tsi,
        tsu: role.tsu,
      };

      console.log('Cuerpo de la solicitud:', payload);

      try {
        await roleRepository.editRole(payload);
        setSuccess(true);
      } catch (err) {
        console.error('Error al actualizar el rol', err);
        setError('Error al actualizar el rol');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!role) {
    return <Typography variant="body1">No se pudo cargar el rol.</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <TextField
          label="Nombre del rol"
          name="name"
          value={role.name || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Descripción"
          name="description"
          value={role.description || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Typography variant="subtitle1" gutterBottom>
          Permisos
        </Typography>
        <Grid container spacing={2}>
          {defaultPermissions.map(permission => {
            const isChecked = role.permissionsList.some(p => p.name === permission.name && p.active);

            return (
              <Grid item xs={12} key={permission.name}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={permission.name}
                      checked={isChecked}
                      onChange={handleChange}
                    />
                  }
                  label={permission.description}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid container spacing={2} justifyContent="flex-end" mb={2}>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              Salir
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Actualizar Rol'}
            </Button>
          </Grid>
        </Grid>
        {success && (
          <Typography variant="body1" color="success.main">
            ¡Rol actualizado exitosamente!
          </Typography>
        )}
        {error && (
          <Typography variant="body1" color="error.main">
            {error}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default EditRole;
