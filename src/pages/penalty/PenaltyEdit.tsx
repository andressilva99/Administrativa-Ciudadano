import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PenaltyForm } from '../../components/penalty/PenaltyForm';
import { IPenaltyEdit } from '../../core/entities/penalty/IPentalty';
import { editPenaltyUseCase } from '../../core/penalty/usecases/edit.penalty.usecase';
import { findByIdPenaltyUseCase } from '../../core/penalty/usecases/findId.penaltys.usecase';
import Swal from 'sweetalert2';

const PenaltyEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [penaltyData, setPenaltyData] = useState<IPenaltyEdit | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchPenaltyData = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedPenaltyData = await findByIdPenaltyUseCase.execute(Number(id));

        const penaltyToEdit: IPenaltyEdit = {
          idPenalty: fetchedPenaltyData.id,
          idCtzuser: fetchedPenaltyData.idCtzUser,
          idPenaltyType: fetchedPenaltyData.idPenaltyType,
          idAdmuser: fetchedPenaltyData.idAdmUser,
          idBicycleHistory: fetchedPenaltyData.idBicycleHistory,
          description: fetchedPenaltyData.description,
        };

        setPenaltyData(penaltyToEdit);
        
      } catch (err: any) {
       
        console.error('Error al actualizar La Penalización', err);
        
      } finally {
        setLoading(false);
      }
    };

    fetchPenaltyData();
  }, [id]);

  const handleUpdatePenalty = async (updatedPenaltyData: IPenaltyEdit) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await editPenaltyUseCase.execute(updatedPenaltyData);
      setSuccess('Penalización actualizada con éxito');
      Swal.fire({
        title: '¡Éxito!',
        text: 'La Penalización ha sido editado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } catch (err: any) {
       
      console.error('Error al actualizar La Penalización', err);
      const errorMessage = err || 'Hubo un problema al editar La Penalización.';
  
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
    <>
      {error && <Typography color="error.main">{error}</Typography>}
      {success && <Typography color="success.main">{success}</Typography>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size="1.5rem" sx={{ mr: 1 }} />
          <Typography variant="h6">Cargando...</Typography>
        </Box>
      ) : penaltyData ? (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
              maxWidth: 400,
            }}
          >
            <PenaltyForm
              initialPenaltyData={penaltyData}
              formType="edit"
              onSubmit={handleUpdatePenalty}
            />
          </Box>
        </>
      ) : (
        <p>No se encontraron datos de la penalización.</p>
      )}
    </>
  );
};

export default PenaltyEdit;
