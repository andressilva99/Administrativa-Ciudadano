import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';
import { RegisterRole } from '../../core/use-cases/role/RegisterRole';
import { RoleRepository } from '../../infrastructure/repository/RoleRepository';
import { ApiService } from '../../infrastructure/http/ApiService';
import { IRoleAdd } from '../../core/entities/role/IRoleAdd';
import { Permission } from '../../core/entities/role/Permission';


interface AddRoleProps {
  onRoleAdded: () => void;
  onCancel: () => void;
}

const AddRole: React.FC<AddRoleProps> = ({ onRoleAdded, onCancel }) => {
  const [role, setRole] = useState<IRoleAdd>({
    idModule: 0,
    name: '',
    description: '',
    permissionsList: []
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const permissions = Object.values(Permission);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRole(prevRole => ({ ...prevRole, [name]: value }));
  };

  const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    setRole(prevRole => ({
      ...prevRole,
      permissionsList: checked
        ? [...prevRole.permissionsList, name]
        : prevRole.permissionsList.filter(permission => permission !== name)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const apiService = new ApiService();
    const roleRepository = new RoleRepository(apiService);
    const registerNewRole = new RegisterRole(roleRepository);

    try {
      await registerNewRole.registerRole(role);
      setSuccess(true);
      onRoleAdded(); // Notifica al componente padre sobre la adición del rol
      setRole({ 
        idModule: 0, 
        name: '', 
        description: '', 
        permissionsList: [] 
      });
    } catch (err) {
      setError('Failed to add role. Please try again.');
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
        <Grid container spacing={2} justifyContent="flex-end" mb={2}> 
        <Grid item>
        <Button
          color="secondary"
          onClick={onCancel}
          style={{ marginLeft: '8px' }}
        >
          Salir
        </Button>
        </Grid>
        
        <Grid item>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Adding...' : 'Agregar Rol'}
        </Button>
        </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddRole;
