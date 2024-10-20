import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StationUserForm } from '../../components/stationUser/StationUserForm';
import { editStationUserUseCase } from '../../core/stationUser/usecase/edit.stationUser.usecase';
import { findByIdStationUserUseCase } from '../../core/stationUser/usecase/findId.stationUser.usecase';
import { IStationUserData } from '../../core/entities/stationUser/IStationuser';

const StationUserEdit = () => {
  const { id } = useParams<{ id: string }>(); // Usamos el id de la URL
  const [stationUserData, setStationUserData] = useState<IStationUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchStationUserData = async () => {
      setLoading(true);
      setError(null);
    
      try {
        const fetchedStationUserData = await findByIdStationUserUseCase.execute(Number(id)); 
    
        // Verificar si existe al menos un usuario en la estación
        const firstUserInStation = fetchedStationUserData.usersInStation?.[0] || {
          idAdmUser: '',  // Asignar valores predeterminados si no hay usuario
          infoAdmuserName: '',
        };
    
        // Crear un objeto con todas las propiedades requeridas
        const stationUserToEdit: IStationUserData = {
          id: fetchedStationUserData.id,
          name: fetchedStationUserData.name,
          address: fetchedStationUserData.address || '', 
          enabled: fetchedStationUserData.enabled || false,
          horarioString: fetchedStationUserData.horarioString || '',
          usersInStation: fetchedStationUserData.usersInStation || [], 
          idAdmUser: firstUserInStation.idAdmUser,
          infoAdmuserName: firstUserInStation.infoAdmuserName,
        };
    
        setStationUserData(stationUserToEdit);  // Ahora stationUserToEdit tiene todas las propiedades
      } catch (err) {
        setError('Error al cargar los datos del usuario por estación');
      } finally {
        setLoading(false);
      }
    };

    fetchStationUserData();
  }, [id]);

  const handleUpdateStationUser = async (updatedStationUserData: any) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await editStationUserUseCase.execute(updatedStationUserData.id, updatedStationUserData.idAdmUser);
      setSuccess('Usuario por estación actualizado con éxito');
    } catch (err) {
      console.error('Error al actualizar el usuario por estación', err);
      setError('Ocurrió un error al actualizar el usuario por estación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Typography color="error.main">{error}</Typography>}
      {success && <Typography color="success.main">{success}</Typography>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size="1.5rem" sx={{ mr: 1 }} />
          <Typography variant="h6">Cargando...</Typography>
        </Box>
      ) : stationUserData ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400 }}>
          <StationUserForm initialStationUserData={stationUserData} formType="edit" onSubmit={handleUpdateStationUser} />
        </Box>
      ) : (
        <p>No se encontraron datos del usuario por estación.</p>
      )}
    </>
  );
};

export default StationUserEdit;
