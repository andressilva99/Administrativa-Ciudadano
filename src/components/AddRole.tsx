import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

interface Role {
  idModule: number;
  name: string;
  description: string;
  permissionsList: string[];
}

interface AddRoleProps {
  onRoleAdded: () => void;
  onCancel: () => void;
}

const AddRole: React.FC<AddRoleProps> = ({ onRoleAdded, onCancel }) => {
  const [role, setRole] = useState<Role>({
    idModule: 0,
    name: '',
    description: '',
    permissionsList: []
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const permissions = [
    'ADMUSER_VIEW_N', 'ADMUSER_VIEW_1', 'ADMUSER_ADD', 'ADMUSER_EDIT', 'ADMUSER_DELETE',
    'ADMUSER_CHANGEPW', 'ADMUSER_ROLE_SET', 'ADMUSER_ROLE_UNSET', 'ADMROLE_VIEW_N',
    'ADMROLE_VIEW_1', 'ADMROLE_ADD', 'ADMROLE_EDIT', 'ADMROLE_DELETE', 'MODULE_VIEW_N',
    'MODULE_VIEW_1', 'MODULE_ADD', 'MODULE_EDIT', 'MODULE_DELETE'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRole(prevRole => ({ ...prevRole, [name]: value }));
  };

  const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    setRole(prevRole => {
      const updatedPermissions = checked
        ? [...prevRole.permissionsList, name]
        : prevRole.permissionsList.filter(permission => permission !== name);
      return { ...prevRole, permissionsList: updatedPermissions };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        'http://localhost:8053/adm-main/admrole/',
        role,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_AUTH_TOKEN' // Asegúrate de reemplazar esto con tu token real
          }
        }
      );
      console.log('Response:', response);
      setSuccess(true);
      onRoleAdded(); // Notifica al componente padre sobre la adición del rol
      setRole({
        idModule: 0,
        name: '',
        description: '',
        permissionsList: []
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Maneja errores de Axios
        console.error('Error details:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Error adding role. Please try again.');
      } else {
        // Maneja otros tipos de errores
        console.error('Unexpected error:', err);
        setError('Unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6">Agregar Rol</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="ID de módulo"
          name="idModule"
          value={role.idModule}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
          required
        />
        <TextField
          label="Nombre"
          name="name"
          value={role.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Descripción"
          name="description"
          value={role.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Typography variant="subtitle1" gutterBottom>
          Permisos
        </Typography>
        <FormGroup>
          {permissions.map(permission => (
            <FormControlLabel
              key={permission}
              control={
                <Checkbox
                  checked={role.permissionsList.includes(permission)}
                  onChange={handlePermissionChange}
                  name={permission}
                />
              }
              label={permission}
            />
          ))}
        </FormGroup>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">Role added successfully!</Typography>}
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Adding...' : 'Agregar Rol'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onCancel}
          style={{ marginLeft: '8px' }}
        >
          Cancelar
        </Button>
      </form>
    </Paper>
  );
};

export default AddRole;
