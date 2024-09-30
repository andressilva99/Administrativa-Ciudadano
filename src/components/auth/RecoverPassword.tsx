import { Alert, Box, Button, Typography, TextField } from '@mui/material';
import { useState } from 'react';
import { ApiService } from '../../infrastructure/http/ApiService';
import { AuthRepository } from '../../infrastructure/repository/AuthRepository';

const apiService = new ApiService();
const authRepository = new AuthRepository(apiService);

const RecoverPassword: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isEmail = (value: string) => {
    const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {

      const email = isEmail(inputValue) ? inputValue : undefined;
      const dni = !isEmail(inputValue) ? inputValue : undefined;

      await authRepository.recoveredPw({ email, dni });
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
        gap: 3,
        width: '100%',
      }}
    >
      <Typography variant='h5' align="center" gutterBottom>
        Ingrese su Correo o DNI
      </Typography>
      <TextField
        label="Correo Electrónico o DNI"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
        disabled={isSubmitting}
        required
        sx={{ input: { fontSize: '1.1rem' } }} 
      />

      {message && <Alert severity={message.type}> {message.message} </Alert>}

      <Button variant="contained" color="primary" type="submit" fullWidth disabled={isSubmitting} >
        {isSubmitting ? 'Enviando...' : 'Enviar correo'}
      </Button>
    </Box>
  );
};

export default RecoverPassword;
