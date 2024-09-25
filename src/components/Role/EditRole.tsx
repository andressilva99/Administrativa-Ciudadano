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
  FormControlLabel
} from '@mui/material';
import { IRole, ERole, EPermissionItem } from '../../core/entities/role/IRole';
import { RoleRepository } from '../../infrastructure/repository/RoleRepository';
import { ApiService } from '../../infrastructure/http/ApiService';
import { Permission } from '../../core/entities/role/Permission';

const apiService = new ApiService();
const roleRepository = new RoleRepository(apiService);

interface EditRoleProps {
  roleId: number;
  onCancel: () => void;
}

const getDescription = (permission: Permission): string => {
  // Implementa la lógica para obtener la descripción del permiso
  return `Description for ${permission}`;
};

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

      if (Object.values(Permission).includes(name as Permission)) {
        const updatedPermissionsList: EPermissionItem[] = checked
          ? [
              ...role.permissionsList,
              { name: name as Permission, checked: true } // Ajustado para coincidir con `EPermissionItem`
            ]
          : role.permissionsList.filter((permission) => permission.name !== name);

        setRole((prevRole) =>
          prevRole
            ? {
                ...prevRole,
                permissionsList: updatedPermissionsList
              }
            : prevRole
        );
      } else {
        console.error(`Invalid permission name: ${name}`);
      }
    }
  };

  const handleSubmit = async () => {
    if (role) {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Convierte `permissionsList` de `ERole` a un formato adecuado
      const formattedPermissionsList: EPermissionItem[] = role.permissionsList
        .filter(permission => permission.checked)
        .map(permission => ({
          name: permission.name,
          checked: permission.checked
          
          // `description` no se usa aquí si `EPermissionItem` no lo tiene
        }));

      const payload: ERole = {
        id: role.id,
        name: role.name,
        description: role.description,
        idModule: role.idModule,
        permissionsList: formattedPermissionsList, 
        fixed: role.fixed,
        enabled: role.enabled,
        deleted: role.deleted,
        tsi: role.tsi,
        tsu: role.tsu
      };
      console.log('Cuerpo de la solicitud:', payload);

      try {
        await roleRepository.editRole(payload);
        

        setSuccess(true);
      } catch (err) {
        console.error('Error updating role', err);
        setError('Error updating role');
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
      <CardContent style={{ paddingBottom: 0 }}>
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
          {Object.values(Permission).map(permission => {
            const isChecked = role.permissionsList.some(p => p.name === permission && p.checked);

            return (
              <Grid item xs={12} key={permission}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={permission}
                      checked={isChecked}
                      onChange={handleChange}
                    />
                  }
                  label={permission}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid container spacing={2} justifyContent="flex-end" mb={2}>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onCancel}
            >
              Salir
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Actualizar Rol'}
            </Button>
          </Grid>
        </Grid>
        {success && (
          <Typography variant="body1" color="success.main">
            Rol actualizado exitosamente!
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
