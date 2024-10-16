import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PenaltyFormProps {
  initialPenaltyData?: any;
  onSubmit: (data: any) => void;
  formType: 'add' | 'edit';
}


export const PenaltyForm: React.FC<PenaltyFormProps> = ({
  initialPenaltyData,
  onSubmit,
  formType,
}) => {
  const [penaltyData, setPenaltyData] = useState<any>({
    idPenalty: '',
    idCtzuser: '',
    idPenaltyType: '',
    idAdmuser: '',
    idBicycleHistory: '',
    description: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (initialPenaltyData) {
      setPenaltyData({
        ...initialPenaltyData,
      });
    }
  }, [initialPenaltyData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPenaltyData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(penaltyData);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400 }}
    >
      <h1>{formType === 'edit' ? 'Editar Penalización' : 'Crear Penalización'}</h1>

      {formType === 'edit' && (
        <TextField
          label="ID Penalización"
          name="idPenalty"
          value={penaltyData.idPenalty}
          onChange={handleInputChange}
          fullWidth
          required
          disabled={formType === 'edit'}
        />
      )}
      <TextField
        label="ID Ciudadano"
        name="idCtzuser"
        value={penaltyData.idCtzuser}
        onChange={handleInputChange}
        fullWidth
        required
      />
      <TextField
        label="ID Tipo de Penalización"
        name="idPenaltyType"
        value={penaltyData.idPenaltyType}
        onChange={handleInputChange}
        fullWidth
        required
      />
      <TextField
        label="ID Administrador"
        name="idAdmuser"
        value={penaltyData.idAdmuser}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="ID Historia de Bicicleta"
        name="idBicycleHistory"
        value={penaltyData.idBicycleHistory}
        onChange={handleInputChange}
        fullWidth
        required
      />
      <TextField
        label="Descripción"
        name="description"
        value={penaltyData.description}
        onChange={handleInputChange}
        fullWidth
        required
      />


      <Button type="submit" variant="contained" color="primary">
        {formType === 'edit' ? 'Actualizar Penalización' : 'Crear Penalización'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleGoBack}
      >
        Volver
      </Button>
    </Box>
  );
};
