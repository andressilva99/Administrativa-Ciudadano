import React, { useState } from 'react';
import axios from 'axios';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  CircularProgress, 
  Typography, 
  Grid 
} from '@mui/material';

interface Module {
  moduleId: number;
  enabledNp: boolean;
  enabledLp: boolean;
  minNpLevel: number;
  minLpLevel: number;
}

interface EditModuleProps {
  moduleId: number; // Add moduleId as a prop
  onCancel: () => void; // Add onCancel as a prop
}

const EditModule: React.FC<EditModuleProps> = ({ moduleId, onCancel }) => {
  const [module, setModule] = useState<Module>({
    moduleId,
    enabledNp: false,
    enabledLp: false,
    minNpLevel: 0,
    minLpLevel: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Add error state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setModule({
     ...module,
      [name]: type === 'checkbox'? checked : parseInt(value),
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:8053/adm-main/module/edit/${moduleId}`, // Use moduleId in the URL
        module,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your-token-here' // Replace with your actual token
          }
        }
      );
      setSuccess(true);
    } catch (error) {
      console.error('Error updating module', error);
      setError('Error updating module'); // Set error message
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Editar Modulo</Typography>
        <TextField
          label="ID de modulo"
          name="moduleId"
          value={module.moduleId}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
          disabled // Disable the moduleId field
        />
        <TextField
          label="NP Habilitado"
          name="enabledNp"
          value={module.enabledNp? 'true' : 'false'}
          onChange={handleChange}
          type="checkbox"
          fullWidth
          margin="normal"
        />
        <TextField
          label="LP Habilitado"
          name="enabledLp"
          value={module.enabledLp? 'true' : 'false'}
          onChange={handleChange}
          type="checkbox"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Min Nivel NP"
          name="minNpLevel"
          value={module.minNpLevel}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Min Nivel LP"
          name="minLpLevel"
          value={module.minLpLevel}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
        />
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Actualizar Modulo'}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onCancel}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
        {success && (
          <Typography variant="body1" color="success">
            Module updated successfully!
          </Typography>
        )}
        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default EditModule;
