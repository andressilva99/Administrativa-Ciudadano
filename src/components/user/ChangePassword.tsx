import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthRepository } from '../../infrastructure/repository/AuthRepository';
import { ApiService } from '../../infrastructure/http/ApiService';

interface ChangePasswordModalProps {
    open: boolean,
    onClose: () => void;
}

const apiService = new ApiService();
const authRepository = new AuthRepository(apiService);

const validatePassword = (password: string): string | null => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!password) return 'La contraseña no puede estar vacía';
  if (!passwordRegex.test(password)) {
    return 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.';
  }
  return null;
};

const ChangePasswordModal = ({ open, onClose }: ChangePasswordModalProps) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    const handleSubmit = async () => {
        setErrorMessage(null);

        const newPasswordError = validatePassword(newPassword);
        if (newPasswordError) {
            setErrorMessage(newPasswordError);
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            await authRepository.changePw({
                oldPassword,
                newPassword,
            });
            onClose(); 
        } catch (err) {
            setErrorMessage('Error al cambiar la contraseña, Inténtelo nuevamente.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Cambiar Contraseña</DialogTitle>
            <DialogContent>
                <TextField
                    label="Contraseña Actual"
                    type={showPassword.old ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword((prev) => ({ ...prev, old: !prev.old }))}
                                    edge="end"
                                >
                                    {showPassword.old ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Nueva Contraseña"
                    type={showPassword.new ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword((prev) => ({ ...prev, new: !prev.new }))}
                                    edge="end"
                                >
                                    {showPassword.new ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Repita la nueva Contraseña"
                    type={showPassword.confirm ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword((prev) => ({ ...prev, confirm: !prev.confirm }))}
                                    edge="end"
                                >
                                    {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {errorMessage && <Box color="red">{errorMessage}</Box>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained">
                    Guardar Cambios
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChangePasswordModal;
