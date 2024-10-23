import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { StationUserForm } from '../../components/stationUser/StationUserForm';
import { addStationUserUseCase } from '../../core/stationUser/usecase/add.stationUser.usecase';
import { CustomError } from '../../core/errors/CustomError';
import { IStationUserData } from '../../core/entities/stationUser/IStationuser';
import { findByIdStationUserUseCase } from '../../core/stationUser/usecase/findId.stationUser.usecase';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const StationUserAdd = () => {
  const { id } = useParams<{ id: string }>(); 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [stationUserData, setStationUserData] = useState<IStationUserData | null>(null);

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

  const handleCreateStationUser = async (newStationUserData: any, newUserId: number) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const stationUserData = {
      idStation: newStationUserData.id,  
      idAdmUser: newUserId,  
    };

    try {
      await addStationUserUseCase.execute(stationUserData.idStation, stationUserData.idAdmUser);
      setSuccess('');
      Swal.fire({
        title: '¡Éxito!',
        text: 'La Estación ha sido creado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });;
    } catch (err : any) {
    
      console.error('Error al crear la Estación', err);
      const errorMessage = err || 'Hubo un problema al crear la Estación.';
  
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
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
        <StationUserForm
          initialStationUserData={stationUserData}
          formType="add"
          userId={0} 
          onSubmit={handleCreateStationUser}
        />
      )}
    </div>
  );
};

export default StationUserAdd;
