import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
  CircularProgress,
} from '@mui/material';
import { RoleRepository } from '../../infrastructure/repository/RoleRepository';
import { IRoleAdd, APermissionItem } from '../../core/entities/role/IRole';
import { RegisterRole } from '../../core/use-cases/role/RegisterRole';
import { Permission } from '../../core/entities/role/Permission';
import { ApiService } from '../../infrastructure/http/ApiService';
import { AddRoleProps } from '../../core/entities/role/IRole';
import Swal from 'sweetalert2';

const defaultPermissions: APermissionItem[] = [
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

const AddRole: React.FC<AddRoleProps> = ({ onRoleAdded, onCancel, roleToCopy }) => {
  const [role, setRole] = useState<IRoleAdd>({
    idModule: 0,
    name: '',
    description: '',
    permissionsList: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos si estamos copiando un rol existente
  useEffect(() => {
    if (roleToCopy) {
      setRole({
        idModule: roleToCopy.idModule,
        name: roleToCopy.name,
        description: roleToCopy.description,
        permissionsList: roleToCopy.permissionsList,
      });
    }
  }, [roleToCopy]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const permissionIndex = role.permissionsList.findIndex(permission => permission.name === name);

      if (permissionIndex >= 0) {
        const updatedPermissionsList = [...role.permissionsList];
        updatedPermissionsList[permissionIndex] = {
          ...updatedPermissionsList[permissionIndex],
          active: checked,
        };

        setRole(prevRole => ({ ...prevRole, permissionsList: updatedPermissionsList }));
      } else if (checked) {
        const newPermission: APermissionItem = {
          name: name as Permission,
          active: checked,
          description: '',
        };

        setRole(prevRole => ({ ...prevRole, permissionsList: [...prevRole.permissionsList, newPermission] }));
      }
    } else {
      setRole(prevRole => ({ ...prevRole, [name]: type === 'number' ? Number(value) : value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const apiService = new ApiService();
    const roleRepository = new RoleRepository(apiService);
    const registerNewRole = new RegisterRole(roleRepository);

    const payload: IRoleAdd = {
      idModule: role.idModule,
      name: role.name,
      description: role.description,
      permissionsList: defaultPermissions.map(permission => ({
        name: permission.name,
        description: permission.description,
        active: role.permissionsList.find(p => p.name === permission.name)?.active || false,
      })),
    };

    console.log('Cuerpo de la solicitud:', payload);

    try {
      await registerNewRole.registerRole(payload);
      setSuccess(true);
      onRoleAdded();
      onCancel();
      Swal.fire({
        title: '¡Éxito!',
        text: 'El Rol ha sido creado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
    } catch (err : any) {
      onCancel();
      console.error('Error al agregar el rol', err);
      const errorMessage = err || 'Hubo un problema al crear el Rol.';
      setError('Error al agregar el rol');
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6">{roleToCopy ? 'Agregar Rol' : 'Agregar Rol'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="ID de módulo"
          name="idModule"
          value={role.idModule || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
          required
        />
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
          {defaultPermissions.map(permission => (
            <Grid item xs={12} key={permission.name}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={permission.name}
                    checked={role.permissionsList.some(p => p.name === permission.name && p.active)}
                    onChange={handleChange}
                  />
                }
                label={permission.description}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} justifyContent="flex-end" mb={2}>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              Salir
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : roleToCopy ? 'Agregar Rol' : 'Agregar Rol'}
            </Button>
          </Grid>
        </Grid>
        {success && (
          <Typography variant="body1" color="success.main">
            ¡Rol {roleToCopy ? 'copiado' : 'agregado'} exitosamente!
          </Typography>
        )}
        {error && (
          <Typography variant="body1" color="error.main">
            {error}
          </Typography>
        )}
      </form>
    </Paper>
  );
};

export default AddRole;
