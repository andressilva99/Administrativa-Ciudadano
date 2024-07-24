import React, { useState } from 'react';
import Role from '../../components/Role';
import RoleDetail from '../../components/RoleDetail';
import AddRole from '../../components/AddRole';
import { Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Importa el ícono de agregar

const RoleList: React.FC = () => {
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [showAddRole, setShowAddRole] = useState<boolean>(false);

  const handleRoleSelect = (id: number) => {
    setSelectedRoleId(id);
  };

  const handleRoleAdded = () => {
    setShowAddRole(false); // Oculta el formulario después de agregar un rol
    // Aquí podrías agregar lógica para recargar la lista de roles
  };

  const handleCreateNewRoleClick = () => {
    setShowAddRole(true);
  };

  const handleCancelAddRole = () => {
    setShowAddRole(false); // Oculta el formulario si se cancela
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Roles
      </Typography>
      <IconButton
        color="primary"
        onClick={handleCreateNewRoleClick}
        style={{ marginBottom: '16px' }}
      >
        <AddIcon /> {/* Ícono de agregar */}
      </IconButton>
      {showAddRole && <AddRole onRoleAdded={handleRoleAdded} onCancel={handleCancelAddRole} />}
      {selectedRoleId ? (
        <RoleDetail id={selectedRoleId} />
      ) : (
        <Role onRoleSelect={handleRoleSelect} />
      )}
    </div>
  );
};

export default RoleList;
