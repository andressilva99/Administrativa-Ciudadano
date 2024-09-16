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
import { ERole } from '../../core/entities/role/IRole';
import { RoleRepository } from '../../infrastructure/repository/RoleRepository';
import { ApiService } from '../../infrastructure/http/ApiService';

const apiService = new ApiService();
const roleRepository = new RoleRepository(apiService);

interface EditRoleProps {
  roleId: number;
  onCancel: () => void;
}

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
        console.error('Error fetching role:', err);
        setError('Error fetching role');
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [roleId]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    if (role) {
      setRole(prevRole => ({
        ...prevRole!,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleCheckboxChange = (permissionName: string) => {
    if (role) {
      const updatedPermissionsList = role.permissionsList.map(permission =>
        permission.name === permissionName
          ? { ...permission, checked: !permission.checked }
          : permission
      );

      setRole(prevRole => prevRole ? { ...prevRole, permissionsList: updatedPermissionsList } : null);
    }
  };

  const handleSubmit = async () => {
    if (role) {
      setLoading(true);
      setError(null);
      setSuccess(false);
      try {
        await roleRepository.editRole(role.id, role);
        setSuccess(true);
      } catch (error) {
        console.error('Error updating role:', error);
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
        <Typography variant="h6" gutterBottom>
          Editar Rol
        </Typography>

        {/* Información del Rol */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="ID de Rol"
              name="id"
              value={role.id || ''}
              onChange={handleFieldChange}
              type="number"
              fullWidth
              margin="normal"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              name="name"
              value={role.name || ''}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Descripción"
              name="description"
              value={role.description || ''}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>

        {/* Permisos */}
        <Typography variant="h6" gutterBottom>
          Permisos
        </Typography>
        <Grid container spacing={2}>
          {role.permissionsList.map(permission => (
            <Grid item xs={12} sm={6} key={permission.name}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permission.checked || false}
                    onChange={() => handleCheckboxChange(permission.name)}
                  />
                }
                label={permission.description}
              />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} justifyContent="flex-end" mb={2}>
          <Grid item>
            <Button
              
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
