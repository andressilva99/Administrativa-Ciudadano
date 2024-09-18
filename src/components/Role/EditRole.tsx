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

const getDescription = (permission: EPermissionItem): string => {
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

      if (Object.values(Permission).includes(name as EPermissionItem)) {
        const updatedPermissionsList = checked
          ? [
              ...role.permissionsList,
              { name: name as EPermissionItem, checked: true, description: getDescription(name as EPermissionItem) }
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

      const formattedPermissionsList = role.permissionsList
        .filter(permission => permission.checked)
        .map(permission => permission.name);

      const payload = {
        idRol: role.id,
        id: null,
        idModule: role.idModule || 0,
        name: role.name,
        description: role.description,
        permissionsList: formattedPermissionsList,
        fixed: role.fixed || false,
        enabled: role.enabled || true,
        deleted: role.deleted || false,
        tsi: role.tsi || new Date().toISOString(),
        tsu: role.tsu || new Date().toISOString()
      };

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
