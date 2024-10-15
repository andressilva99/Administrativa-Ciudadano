import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PenaltyFormProps {
  initialPenaltyData?: any;
  onSubmit: (data: any) => void;
  formType: 'add' | 'edit';
}

const formatDateForInput = (isoDate: string | undefined) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  const tzOffset = date.getTimezoneOffset() * 60000; // ajustar la zona horaria
  const localISODate = new Date(date.getTime() - tzOffset).toISOString();
  return localISODate.substring(0, 16); // Obtener 'YYYY-MM-DDTHH:MM'
};

export const PenaltyForm: React.FC<PenaltyFormProps> = ({
  initialPenaltyData,
  onSubmit,
  formType,
}) => {
  const [penaltyData, setPenaltyData] = useState<any>({
    id: '',
    idCtzUser: '',
    idPenaltyType: '',
    idAdmUser: '',
    idBicycleHistory: '',
    description: '',
    issuedDate: '',
    resolvedDate: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (initialPenaltyData) {
      setPenaltyData({
        ...initialPenaltyData,
        issuedDate: formatDateForInput(initialPenaltyData.issuedDate),
        resolvedDate: formatDateForInput(initialPenaltyData.resolvedDate),
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
          label="ID"
          name="id"
          value={penaltyData.id}
          onChange={handleInputChange}
          fullWidth
          required
          disabled={formType === 'edit'}
        />
      )}
      <TextField
        label="ID Ciudadano"
        name="idCtzUser"
        value={penaltyData.idCtzUser}
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
        name="idAdmUser"
        value={penaltyData.idAdmUser}
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
      <TextField
        label="Fecha de Emisión"
        name="issuedDate"
        type="datetime-local"
        value={penaltyData.issuedDate}
        onChange={handleInputChange}
        fullWidth
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Fecha de Cierre (Opcional)"
        name="resolvedDate"
        type="datetime-local"
        value={penaltyData.resolvedDate || ''}
        onChange={handleInputChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
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
