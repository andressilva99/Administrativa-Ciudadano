import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  CircularProgress, 
  Typography, 
  Grid, 
  Checkbox, 
  FormControlLabel 
} from '@mui/material';
import { EditModuleProps, EModule } from '../../core/entities/module/IModule';
import { ModuleRepository } from '../../infrastructure/repository/ModuleRepository'; 
import { ApiService } from '../../infrastructure/http/ApiService';

const apiService = new ApiService();
const moduleRepository = new ModuleRepository(apiService);

const EditModule: React.FC<EditModuleProps> = ({ moduleId, onCancel }) => {
  const [module, setModule] = useState<EModule>({
    moduleId,
    enabledNp: false,
    enabledLp: false,
    minNpLevel: 0,
    minLpLevel: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const data = await moduleRepository.findModulesById(moduleId);
        setModule(data);
      } catch (err) {
        console.error('Error fetching module', err);
        setError('Error fetching module');
      }
    };

    fetchModule();
  }, [moduleId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setModule(prevModule => ({
      ...prevModule,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await moduleRepository.editModule(
        module.moduleId,
        module.enabledNp,
        module.enabledLp,
        module.minNpLevel,
        module.minLpLevel
      );
      setSuccess(true);
    } catch (error) {
      console.error('Error updating module', error);
      setError('Error updating module');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent style={{ paddingBottom: 0 }}>
        <TextField
          label="ID de módulo"
          name="moduleId"
          value={module.moduleId ?? ''}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
          disabled
        />
        <FormControlLabel
          control={
            <Checkbox
              name="enabledNp"
              checked={module.enabledNp}
              onChange={handleChange}
            />
          }
          label="NP Habilitado"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="enabledLp"
              checked={module.enabledLp}
              onChange={handleChange}
            />
          }
          label="LP Habilitado"
        />
        <TextField
          label="Min Nivel NP"
          name="minNpLevel"
          value={module.minNpLevel ?? ''}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Min Nivel LP"
          name="minLpLevel"
          value={module.minLpLevel ?? ''}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
        />
        <Grid container spacing={2} justifyContent="flex-end" mb={2}>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onCancel}
            >
              Salir
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Actualizar Módulo'}
            </Button>
          </Grid>
        </Grid>
        {success && (
          <Typography variant="body1" color="success.main">
            Módulo actualizado exitosamente!
          </Typography>
        )}
        {error && (
          <Typography variant="body1" color="error.main">
            {error}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default EditModule;
