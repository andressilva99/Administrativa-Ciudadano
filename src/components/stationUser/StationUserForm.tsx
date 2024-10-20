import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IStationUserData } from '../../core/entities/stationUser/IStationuser';

interface StationUserFormProps {
  initialStationUserData?: IStationUserData | null;
  onSubmit: (data: IStationUserData) => void;
  formType: 'add' | 'edit';
}

export const StationUserForm: React.FC<StationUserFormProps> = ({
  initialStationUserData,
  onSubmit,
  formType,
}) => {
  const [stationUserData, setStationUserData] = useState<IStationUserData>({
    id: initialStationUserData?.id || 0, 
    name: initialStationUserData?.name || '',
    address: initialStationUserData?.address || '',
    enabled: initialStationUserData?.enabled || true,
    horarioString: initialStationUserData?.horarioString || '',
    usersInStation: initialStationUserData?.usersInStation || [],
    tsi: initialStationUserData?.tsi || '',
    tsu: initialStationUserData?.tsu || '',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(stationUserData);
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
      <Box>
        {stationUserData.usersInStation.length > 0 ? (
          stationUserData.usersInStation.map((user, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <TextField
                label="ID de Usuario"
                name={`idAdmUser-${index}`}
                value={user.idAdmUser}
                fullWidth
                disabled
              />
              <TextField
                label="Nombre de Usuario"
                name={`infoAdmuserName-${index}`}
                value={user.infoAdmuserName}
                fullWidth
                disabled
              />
            </Box>
          ))
        ) : (
          <p>No hay usuarios asignados a esta estación.</p>
        )}
      </Box>

      <Button type="submit" variant="contained" color="primary">
        {formType === 'edit' ? 'Actualizar' : 'Agregar'}
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleGoBack}>
        Volver
      </Button>
    </Box>
  );
};
