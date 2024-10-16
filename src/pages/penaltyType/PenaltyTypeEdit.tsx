import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PenaltyTypeForm } from '../../components/penaltyType/PenaltyTypeForm';
import { IPenaltyTypeEdit } from '../../core/entities/penaltyType/IPenaltyType';
import { editPenaltyTypeUseCase } from '../../core/penaltyType/usecase/edit.penaltyType.usecase';
import { findByIdPenaltyTypeUseCase } from '../../core/penaltyType/usecase/findId.penaltyType.usecase';

const PenaltyTypeEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [penaltyTypeData, setPenaltyTypeData] = useState<IPenaltyTypeEdit | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchPenaltyTypeData = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedPenaltyTypeData = await findByIdPenaltyTypeUseCase.execute(Number(id));

        const penaltyTypeToEdit: IPenaltyTypeEdit = {
          idPenaltyType: fetchedPenaltyTypeData.id,
          name: fetchedPenaltyTypeData.name,
          code: fetchedPenaltyTypeData.code || '',
          description: fetchedPenaltyTypeData.description || '',
          enabled: fetchedPenaltyTypeData.enabled,
        };

        setPenaltyTypeData(penaltyTypeToEdit);
      } catch (err) {
        setError('Error al cargar los datos del tipo de penalización');
      } finally {
        setLoading(false);
      }
    };

    fetchPenaltyTypeData();
  }, [id]);

  const handleUpdatePenaltyType = async (updatedPenaltyTypeData: IPenaltyTypeEdit) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await editPenaltyTypeUseCase.execute(updatedPenaltyTypeData);
      setSuccess('Tipo de penalización actualizado con éxito');
    } catch (err) {
      console.error('Error al actualizar el tipo de penalización', err);
      setError('Ocurrió un error al actualizar el tipo de penalización');
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
      ) : penaltyTypeData ? (
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
            <PenaltyTypeForm
              initialPenaltyTypeData={penaltyTypeData}
              formType="edit"
              onSubmit={handleUpdatePenaltyType}
            />
          </Box>
        </>
      ) : (
        <p>No se encontraron datos del tipo de penalización.</p>
      )}
    </>
  );
};

export default PenaltyTypeEdit;

