import React, { useState } from 'react';
import { Button, TextField, Paper, Typography } from '@mui/material';
import RoleTable from '../../components/Role/RoleDetail';
import RoleById from '../../components/Role/RoleById';
import AddRole from '../../components/Role/AddRole';

const RoleList: React.FC = () => {
  const [showSearchById, setShowSearchById] = useState(false);
  const [roleId, setRoleId] = useState<number | null>(null);
  const [showAddRole, setShowAddRole] = useState(false);

  const handleSearchById = () => {
    setShowSearchById(true);
    setShowAddRole(false);
  };

  const handleAddRole = () => {
    setShowAddRole(true);
    setShowSearchById(false);
  };

  const handleCancel = () => {
    setShowSearchById(false);
    setShowAddRole(false);
    setRoleId(null);
  };

  const handleRoleAdded = () => {
    // Aquí puedes agregar cualquier lógica adicional después de agregar un rol, por ejemplo, actualizar la lista de roles
    setShowAddRole(false);
  };

  const handleRoleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleId(Number(e.target.value));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Role Management</Typography>
      <Button variant="contained" color="primary" onClick={handleSearchById} style={{ marginRight: '8px' }}>
        Buscar por ID
      </Button>
      <Button variant="contained" color="secondary" onClick={handleAddRole}>
        Agregar Rol
      </Button>

      {showSearchById && (
        <Paper style={{ marginTop: '16px', padding: '16px' }}>
          <TextField
            label="Role ID"
            type="number"
            value={roleId || ''}
            onChange={handleRoleIdChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={() => setRoleId(roleId)}>
            Buscar
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel} style={{ marginLeft: '8px' }}>
            Cancelar
          </Button>
        </Paper>
      )}

      {roleId !== null && !showAddRole && (
        <RoleById id={roleId} />
      )}

      {showAddRole && (
        <AddRole onRoleAdded={handleRoleAdded} onCancel={handleCancel} />
      )}

      {!showAddRole && (
        <RoleTable />
      )}
    </div>
  );
};

export default RoleList;
