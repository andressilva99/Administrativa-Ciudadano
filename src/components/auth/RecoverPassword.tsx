import { Alert, Box, Button, Typography, TextField } from '@mui/material';
import { useState } from 'react';
import { ApiService } from '../../infrastructure/http/ApiService';
import { AuthRepository } from '../../infrastructure/repository/AuthRepository';

const apiService = new ApiService();
const authRepository = new AuthRepository(apiService);

const RecoverPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await authRepository.recoveredPw({ email });
      setMessage({
        message: 'Correo de recuperación enviado. Por favor revisa tu bandeja de entrada',
        type: 'success',
      });
    } catch (err) {
      setMessage({ message: 'Error al intentar recuperar la contraseña', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 400,
        margin: 'auto',
        mt: 4,
      }}
    >
      <Typography variant="h5" align="center">
        Recuperar Contraseña
      </Typography>

      <TextField
        label="Correo Electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        disabled={isSubmitting}
      />

      {message && <Alert severity={message.type}> {message.message} </Alert>}

      <Button variant="contained" color="primary" type="submit" fullWidth disabled={isSubmitting} >
        {isSubmitting ? 'Enviando...' : 'Enviar correo de recuperación'}
      </Button>
    </Box>
  );
};

export default RecoverPassword;
