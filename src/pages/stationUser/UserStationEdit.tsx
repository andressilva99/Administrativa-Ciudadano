import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StationUserForm } from '../../components/stationUser/StationUserForm';
import { editStationUserUseCase } from '../../core/stationUser/usecase/edit.stationUser.usecase';
import { findByIdStationUserUseCase } from '../../core/stationUser/usecase/findId.stationUser.usecase';
import { IStationUserData, IUserStationData } from '../../core/entities/stationUser/IStationuser';

const StationUserEdit = () => {
  const { id } = useParams<{ id: string }>(); 
  const [stationUserData, setStationUserData] = useState<IStationUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<IUserStationData | null>(null);

  useEffect(() => {
    const fetchStationUserData = async () => {
      setLoading(true);
      setError(null);
    
      try {
        const fetchedStationUserData = await findByIdStationUserUseCase.execute(Number(id));  
        setStationUserData(fetchedStationUserData); 
      } catch (err) {
        setError('Error al cargar los datos del usuario por estación');
      } finally {
        setLoading(false);
      }
    };

    fetchStationUserData();
  }, [id]);
  
  const handleEditClick = (user: IUserStationData) => {
    setEditingUser(user); 
  };
  

  const handleUpdateStationUser = async (updatedStationUserData: IStationUserData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!editingUser || editingUser.idAdmUser === undefined) {
      setError('No se puede actualizar: El usuario seleccionado es inválido.');
      setLoading(false);
      return;
    }

    try {
      await editStationUserUseCase.execute(updatedStationUserData.id, editingUser.idAdmUser);
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
          <Typography variant="h6">Usuarios en la estación</Typography>
          {stationUserData.usersInStation.map((user, index) => (
            <Box key={user.idAdmUser} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>{user.infoAdmuserName}</Typography>
              <IconButton onClick={() => handleEditClick(user)}>
                <EditIcon />
              </IconButton>
            </Box>
          ))}

          {editingUser && (
            <StationUserForm
              initialStationUserData={stationUserData}
              formType="edit"
              userId={editingUser.idAdmUser}
              onSubmit={(updatedStationUserData) => handleUpdateStationUser(updatedStationUserData)} // Actualizar solo el usuario en edición
            />
          )}
        </Box>
      ) : (
        <p>No se encontraron datos del usuario por estación.</p>
      )}
    </>
  );
};

export default StationUserEdit;
