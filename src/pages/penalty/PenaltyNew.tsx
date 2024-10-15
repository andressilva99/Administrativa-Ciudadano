import { Box, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { PenaltyForm } from '../../components/penalty/PenaltyForm';
import { IPenaltyAdd } from '../../core/entities/penalty/IPentalty';
import { CustomError } from '../../core/errors/CustomError';
import { addPenaltyUseCase } from '../../core/penalty/usecases/add.penalty.usecase';

const PenaltyNew = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreatePenalty = async (newPenaltyData: any) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const penaltyData: IPenaltyAdd = {
      idCtzUser: newPenaltyData.idCtzUser,
      idPenaltyType: newPenaltyData.idPenaltyType,
      idAdmUser: newPenaltyData.idAdmUser || undefined,
      idBicycleHistory: newPenaltyData.idBicycleHistory,
      description: newPenaltyData.description,
      issuedDate: newPenaltyData.issuedDate,
      resolvedDate: newPenaltyData.resolvedDate || undefined,
    };

    try {
      await addPenaltyUseCase.execute(penaltyData);
      setSuccess('Nueva penalización creada con éxito!');
    } catch (err: any) {
      if (err instanceof CustomError) {
        setError(err.message);
      } else {
        setError('Ocurrió un error inesperado al crear la penalización.');
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
        <PenaltyForm initialPenaltyData={null} formType="add" onSubmit={handleCreatePenalty} />
      )}
    </div>
  );
};

export default PenaltyNew;
