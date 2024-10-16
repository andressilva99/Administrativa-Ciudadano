import { Box, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { PenaltyTypeForm } from '../../components/penaltyType/PenaltyTypeForm'; 
import { IPenaltyTypeAdd } from '../../core/entities/penaltyType/IPenaltyType'; 
import { CustomError } from '../../core/errors/CustomError';
import { addPenaltyTypeUseCase } from '../../core/penaltyType/usecase/add.penaltyType.usecase';

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
      setSuccess('Nuevo tipo de penalización creado con éxito!');
    } catch (err: any) {
      if (err instanceof CustomError) {
        setError(err.message);
      } else {
        setError('Ocurrió un error inesperado al crear el tipo de penalización.');
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
        <PenaltyTypeForm initialPenaltyTypeData={null} formType="add" onSubmit={handleCreatePenaltyType} />
      )}
    </div>
  );
};

export default PenaltyTypeNew;
