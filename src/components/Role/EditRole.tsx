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
import { IRole } from '../../core/entities/role/IRole';
import { RoleRepository } from '../../infrastructure/repository/RoleRepository';
import { ApiService } from '../../infrastructure/http/ApiService';
import { Permission } from '../../core/entities/role/Permission';

const apiService = new ApiService();
const roleRepository = new RoleRepository(apiService);

interface EditRoleProps {
  roleId: number;
  onCancel: () => void;
}

const EditRole: React.FC<EditRoleProps> = ({ roleId, onCancel }) => {
  const [role, setRole] = useState<IRole | null>(null);
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
      const { name, type, value, checked } = e.target;
    
      if (type === 'checkbox') {
        const permissionName = name as Permission;
        const updatedPermissionsList = checked
          ? [...role.permissionsList, { name: permissionName, description: '' }]
          : role.permissionsList.filter(permission => permission.name !== permissionName);
    
        setRole(prevRole => ({
          ...prevRole!,
          permissionsList: updatedPermissionsList
        }));
      } else {
        const updatedValue = type === 'number' ? (value === '' ? 0 : parseInt(value, 10)) : value;
    
        setRole(prevRole => ({
          ...prevRole!,
          [name]: updatedValue
        }));
      }
    }
  };
  const handleSubmit = async () => {
    if (role) {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const payload = {
        idRol: role.id,
        id: null,
        idModule: role.idModule || 0,
        name: role.name,
        description: role.description,
        permissionsList: role.permissionsList, // Map to strings
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
        if (typeof err === "string") {
          console.error('Error updating role', err);
          setError(err);
        } else {
          console.error('Unknown error updating role', err);
          setError('Unknown error occurred');
        }
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
        {loading && <Typography variant="body1">Cargando rol...</Typography>}
        {role && (
          <>
            <TextField
              label="ID de rol"
              name="id"
              value={role.id || ''}
              onChange={handleChange}
              type="number"
              fullWidth
              margin="normal"
              disabled
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
  {Object.values(Permission).map(permission => (
    <Grid item xs={12} key={permission}>
      <FormControlLabel
        control={
          <Checkbox
            name={permission}
            checked={role.permissionsList.some(p => p.name === permission)}
            onChange={handleChange}
          />
        }
        label={permission}
      />
    </Grid>
  ))}
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EditRole;
