import { Box, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { PenaltyForm } from '../../components/penalty/PenaltyForm';
import { IPenaltyAdd } from '../../core/entities/penalty/IPentalty';
import { CustomError } from '../../core/errors/CustomError';
import { addPenaltyUseCase } from '../../core/penalty/usecases/add.penalty.usecase';
import Swal from 'sweetalert2';

const PenaltyNew = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreatePenalty = async (newPenaltyData: any) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const penaltyData: IPenaltyAdd = {
      idCtzuser: newPenaltyData.idCtzuser,
      idPenaltyType: newPenaltyData.idPenaltyType,
      idAdmuser: newPenaltyData.idAdmuser,
      idBicycleHistory: newPenaltyData.idBicycleHistory,
      description: newPenaltyData.description,
    };

    try {
      await addPenaltyUseCase.execute(penaltyData);
      setSuccess('');
      Swal.fire({
        title: '¡Éxito!',
        text: 'La Penalización ha sido creado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'})
    } catch (err: any) {
      
      console.error('Error al crear la Penalización', err);
      const errorMessage = err || 'Hubo un problema al crear la Penalización.';
  
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
        <PenaltyForm initialPenaltyData={null} formType="add" onSubmit={handleCreatePenalty} />
      )}
    </div>
  );
};

export default PenaltyNew;
