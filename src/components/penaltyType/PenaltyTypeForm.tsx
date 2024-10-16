import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PenaltyTypeFormProps {
  initialPenaltyTypeData?: any;
  onSubmit: (data: any) => void;
  formType: 'add' | 'edit';
}

export const PenaltyTypeForm: React.FC<PenaltyTypeFormProps> = ({
  initialPenaltyTypeData,
  onSubmit,
  formType,
}) => {
  const [penaltyTypeData, setPenaltyTypeData] = useState<any>({
    idPenaltyType: '',
    name: '',
    code: '',
    description: '',
    enabled: true,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (initialPenaltyTypeData) {
      setPenaltyTypeData(initialPenaltyTypeData);
    }
  }, [initialPenaltyTypeData]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setPenaltyTypeData((prevData: any) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(penaltyTypeData);
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
      <h1>{formType === 'edit' ? 'Editar Tipo de Penalización' : 'Crear Tipo de Penalización'}</h1>

      {formType === 'edit' && (
        <TextField
          label="ID Tipo de Penalización"
          name="idPenaltyType"
          value={penaltyTypeData.idPenaltyType}
          onChange={handleInputChange}
          fullWidth
          required
          disabled={formType === 'edit'}
        />
      )}
      <TextField
        label="Nombre"
        name="name"
        value={penaltyTypeData.name}
        onChange={handleInputChange}
        fullWidth
        required
      />
      <TextField
        label="Código"
        name="code"
        value={penaltyTypeData.code}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Descripción"
        name="description"
        value={penaltyTypeData.description}
        onChange={handleInputChange}
        fullWidth
      />
      {formType === 'edit' && (
        <FormControlLabel
        control={
          <Checkbox
            name="enabled"
            checked={penaltyTypeData.enabled}
            onChange={handleInputChange}
          />
        }
        label="Habilitado"
      />
      )}

      <Button type="submit" variant="contained" color="primary">
        {formType === 'edit' ? 'Actualizar Tipo de Penalización' : 'Crear Tipo de Penalización'}
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleGoBack}>
        Volver
      </Button>
    </Box>
  );
};
