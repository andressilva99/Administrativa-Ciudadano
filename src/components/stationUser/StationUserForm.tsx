import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IStationUserData } from '../../core/entities/stationUser/IStationuser';

interface StationUserFormProps {
  initialStationUserData?: IStationUserData | null;
  formType: 'add' | 'edit';
  userId: number;
  onSubmit: (data: IStationUserData, userId: number) => void;
}

export const StationUserForm: React.FC<StationUserFormProps> = ({
  initialStationUserData,
  onSubmit,
  formType,
  userId,
}) => {
  const [currentUserId, setCurrentUserId] = useState<number>(userId);
  const [stationUserData, setStationUserData] = useState<IStationUserData>({
    id: 0,
    name: '',
    address: '',
    enabled: true,
    horarioString: '',
    usersInStation: [],
    tsi: '',
    tsu: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (initialStationUserData) {
      setStationUserData(initialStationUserData);
    }
  }, [initialStationUserData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setStationUserData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUserId(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(stationUserData, currentUserId);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400 }}
    >
      <h1>
        {formType === 'edit' ? 'Editar Usuarios por estación' : 'Agregar Usuario por estación'}
      </h1>

      <TextField
        label="ID de Estación"
        name="id"
        value={stationUserData.id}
        onChange={handleInputChange}
        fullWidth
        disabled
      />
      <TextField
        label="Nombre de la Estación"
        name="name"
        value={stationUserData.name}
        onChange={handleInputChange}
        fullWidth
        disabled
      />
      {formType === 'add' ? (
        // TextField editable solo para agregar un nuevo usuario
        <TextField
          label="ID de Usuario (Nuevo)"
          value={currentUserId}
          onChange={handleUserChange}
          fullWidth
        />
      ) : (
        // Mostrar solo el ID de usuario cuando se edita, no editable
        <TextField 
          label="ID de Usuario (Asignado)" 
          value={currentUserId} 
          fullWidth 
          onChange={handleUserChange}
        />
      )}

      <Button type="submit" variant="contained" color="primary">
        {formType === 'edit' ? 'Actualizar' : 'Agregar'}
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleGoBack}>
        Volver
      </Button>
    </Box>
  );
};
