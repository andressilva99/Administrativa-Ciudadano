import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Grid, Checkbox, FormControlLabel } from "@mui/material";
import { ApiService } from "../../infrastructure/http/ApiService";
import { ModuleRepository } from "../../infrastructure/repository/ModuleRepository";
import { RegisterModule } from "../../core/use-cases/module/RegisterModule";
import { AModule } from "../../core/entities/module/IModule";

interface CreateModuleProps {
  onModuleCreated: () => void;
  onCancel: () => void;
}

const CreateModule: React.FC<CreateModuleProps> = ({ onModuleCreated, onCancel }) => {
  const [module, setModule] = useState<AModule>({
    moduleType: '',
    code: '',
    name: '',
    enabledNp: false,
    enabledLp: false,
    minNpLevel: 0,
    minLpLevel: 0,
    uiOrder: 0,
    configuraciones: {
      description: '',
      linkUrl: '',
      linkToExternalBrowser: false,
      deepLinkPackageAndroid: null,
      deepLinkPackageIOS: null,
      deepLinkValue: null,
      deepLinkValueAsUri: false,
      icon: {
        prefix: '',
        name: '',
        path: null,
      },
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('configuraciones.')) {
      const [parentKey, childKey] = name.split('.').slice(1);

      if (parentKey === 'icon') {
        setModule(prevModule => ({
          ...prevModule,
          configuraciones: {
            ...prevModule.configuraciones,
            icon: {
              ...prevModule.configuraciones.icon,
              [childKey]: value,
            }
          }
        }));
      } else {
        setModule(prevModule => ({
          ...prevModule,
          configuraciones: {
            ...prevModule.configuraciones,
            [parentKey]: value,
          }
        }));
      }
    } else {
      setModule(prevModule => ({ ...prevModule, [name]: value }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setModule(prevModule => ({ 
      ...prevModule, 
      [name]: checked 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const apiService = new ApiService();
    const moduleRepository = new ModuleRepository(apiService);
    const registerNewModule = new RegisterModule(moduleRepository);

    const adjustedModule: AModule = {
      ...module,
      minNpLevel: parseInt(module.minNpLevel as unknown as string, 10),
      minLpLevel: parseInt(module.minLpLevel as unknown as string, 10),
      uiOrder: parseInt(module.uiOrder as unknown as string, 10),
      configuraciones: {
        ...module.configuraciones,
        deepLinkPackageAndroid: module.configuraciones.deepLinkPackageAndroid || null,
        deepLinkPackageIOS: module.configuraciones.deepLinkPackageIOS || null,
        deepLinkValue: module.configuraciones.deepLinkValue || null,
        icon: {
          ...module.configuraciones.icon,
          path: module.configuraciones.icon.path || null,
        },
      }
    };

    console.log("Objeto ajustado que se enviará al POST:", adjustedModule);

    try {
      await registerNewModule.registerModule(adjustedModule);
      setSuccess(true);
      onModuleCreated();
      setModule({
        moduleType: '',
        code: '',
        name: '',
        enabledNp: false,
        enabledLp: false,
        minNpLevel: 0,
        minLpLevel: 0,
        uiOrder: 0,
        configuraciones: {
          description: '',
          linkUrl: '',
          linkToExternalBrowser: false,
          deepLinkPackageAndroid: null,
          deepLinkPackageIOS: null,
          deepLinkValue: null,
          deepLinkValueAsUri: false,
          icon: {
            prefix: '',
            name: '',
            path: null,
          },
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error creating module', err.message);
        setError(err.message);
      } else {
        console.error('Unknown error creating module', err);
        setError('Unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6">Crear Módulo</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Tipo de Módulo"
          name="moduleType"
          value={module.moduleType}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Código"
          name="code"
          value={module.code}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Nombre"
          name="name"
          value={module.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              name="enabledNp"
              checked={module.enabledNp}
              onChange={handleCheckboxChange}
            />
          }
          label="NP Habilitado"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="enabledLp"
              checked={module.enabledLp}
              onChange={handleCheckboxChange}
            />
          }
          label="LP Habilitado"
        />
        <TextField
          label="Nivel Mínimo NP"
          name="minNpLevel"
          type="number"
          value={module.minNpLevel}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Nivel Mínimo LP"
          name="minLpLevel"
          type="number"
          value={module.minLpLevel}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Orden UI"
          name="uiOrder"
          type="number"
          value={module.uiOrder}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Descripción"
          name="configuraciones.description"
          value={module.configuraciones.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="URL de Enlace"
          name="configuraciones.linkUrl"
          value={module.configuraciones.linkUrl}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nombre del Icono"
          name="configuraciones.icon.name"
          value={module.configuraciones.icon.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Prefijo del Icono"
          name="configuraciones.icon.prefix"
          value={module.configuraciones.icon.prefix}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Grid container spacing={2} justifyContent="flex-end" mb={2}>
          <Grid item>
            <Button color="secondary" onClick={onCancel} style={{ marginRight: 8 }}>
              Salir
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? 'Cargando...' : 'Crear Módulo'}
            </Button>
          </Grid>
        </Grid>
        {success && <Typography color="primary">Módulo creado con éxito.</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </Paper>
  );
};

export default CreateModule;
