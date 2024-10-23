import { Box, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { PenaltyTypeForm } from '../../components/penaltyType/PenaltyTypeForm'; 
import { IPenaltyTypeAdd } from '../../core/entities/penaltyType/IPenaltyType'; 
import { CustomError } from '../../core/errors/CustomError';
import { addPenaltyTypeUseCase } from '../../core/penaltyType/usecase/add.penaltyType.usecase';
import Swal from 'sweetalert2';

const PenaltyTypeNew = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreatePenaltyType = async (newPenaltyTypeData: any) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const penaltyTypeData: IPenaltyTypeAdd = {
      name: newPenaltyTypeData.name,
      code: newPenaltyTypeData.code,
      description: newPenaltyTypeData.description,
    };

    try {
      await addPenaltyTypeUseCase.execute(penaltyTypeData);
      setSuccess('');
      Swal.fire({
        title: '¡Éxito!',
        text: 'El tipo de penalización ha sido creada exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });;
    } catch (err : any) {
      
      console.error('Error al crear el tipo de penalización', err);
      const errorMessage = err || 'Hubo un problema al crear el tipo de penalización.';
  
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
        <PenaltyTypeForm initialPenaltyTypeData={null} formType="add" onSubmit={handleCreatePenaltyType} />
      )}
    </div>
  );
};

export default PenaltyTypeNew;
