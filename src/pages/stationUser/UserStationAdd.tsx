import { Box, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { StationUserForm } from '../../components/stationUser/StationUserForm';
import { addStationUserUseCase } from '../../core/stationUser/usecase/add.stationUser.usecase';
import { CustomError } from '../../core/errors/CustomError';

const StationUserAdd = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreateStationUser = async (newStationUserData: any) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const stationUserData = {
      idStation: newStationUserData.id, 
      idAdmUser: newStationUserData.idAdmUser,
    };

    try {
      await addStationUserUseCase.execute(stationUserData.idStation, stationUserData.idAdmUser);
      setSuccess('Usuario agregado a la estación con éxito!');
    } catch (err: any) {
      if (err instanceof CustomError) {
        setError(err.message);
      } else {
        setError('Ocurrió un error inesperado al agregar el usuario.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <Typography color="error.main">{error}</Typography>}
      {success && <Typography color="success.main">{success}</Typography>}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size="1.5rem" sx={{ mr: 1 }} />
          <Typography variant="h6">Cargando...</Typography>
        </Box>
      ) : (
        <StationUserForm initialStationUserData={null} formType="add" onSubmit={handleCreateStationUser} />
      )}
    </div>
  );
};

export default StationUserAdd;
