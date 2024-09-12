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
  const [module, setModule] = useState<EModule | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModule = async () => {
      setLoading(true);
      try {
        // Verifica que el endpoint y el método sean correctos
        const data = await moduleRepository.findModulesById(moduleId);
        setModule({
          ...data,
          enabledNp: data.enabledNp,
          enabledLp: data.enabledLp
        });
      } catch (err) {
        console.error('Error fetching module', err);
        setError('Error fetching module');
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [moduleId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (module) {
      const { name, type, value, checked } = e.target;

      // Handling for checkbox inputs
      const updatedValue = type === 'checkbox' ? checked : type === 'number' ? (value === '' ? 0 : parseInt(value, 10)) : value;

      // Update state depending on the name of the field
      setModule(prevModule => ({
        ...prevModule!,
        [name]: updatedValue
      }));
    }
  };

  const handleSubmit = async () => {
    if (module) {
      setLoading(true);
      setError(null);
      setSuccess(false);
      try {
        const payload = {
          moduleId: module.id,
          id: null, // Asegúrate de usar 'id' en lugar de 'moduleId' si es necesario
          enabledNp: module.enabledNp,
          enabledLp: module.enabledLp,
          minNpLevel: module.minNpLevel ?? null,
          minLpLevel: module.minLpLevel ?? null,
          uiOrder: module.uiOrder,
          configuraciones: {
            description: module.configuraciones.description,
            linkUrl: module.configuraciones.linkUrl,
            icon: {
              prefix: module.configuraciones.icon.prefix,
              name: module.configuraciones.icon.name,
              path: module.configuraciones.icon.path ?? null
            },
            deepLinkPackageAndroid: module.configuraciones.deepLinkPackageAndroid ?? null,
            deepLinkPackageIOS: module.configuraciones.deepLinkPackageIOS ?? null,
            deepLinkValue: module.configuraciones.deepLinkValue ?? null,
            deepLinkValueAsUri: module.configuraciones.deepLinkValueAsUri,
            linkToExternalBrowser: module.configuraciones.linkToExternalBrowser
          }
        };
  
        console.log('Cuerpo de la solicitud:', payload);
  
        await moduleRepository.editModule(payload);
        setSuccess(true);
      } catch (err) {
        if (typeof err === "string") {
          // Maneja el error si es una instancia de Error
          console.error('Error updating module', err);
          setError(err);
        } else {
          // Maneja otros casos si el error no es una instancia de Error
          console.error('Unknown error updating module', err);
          setError('Unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card>
      <CardContent style={{ paddingBottom: 0 }}>
        {loading && <Typography variant="body1">Cargando módulo...</Typography>}
        {module && (
          <>
            <TextField
              label="ID de módulo"
              name="moduleId"
              value={module.id || ''}
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
              value={module.minNpLevel || ''}
              onChange={handleChange}
              type="number"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Min Nivel LP"
              name="minLpLevel"
              value={module.minLpLevel || ''}
              onChange={handleChange}
              type="number"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Orden UI"
              name="uiOrder"
              value={module.uiOrder || ''}
              onChange={handleChange}
              type="number"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Descripción"
              name="configuraciones.description"
              value={module.configuraciones.description || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="URL del Enlace"
              name="configuraciones.linkUrl"
              value={module.configuraciones.linkUrl || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Icono Prefix"
              name="configuraciones.icon.prefix"
              value={module.configuraciones.icon.prefix || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Icono Nombre"
              name="configuraciones.icon.name"
              value={module.configuraciones.icon.name || ''}
              onChange={handleChange}
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EditModule;
