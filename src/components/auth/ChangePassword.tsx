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
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthRepository } from '../../infrastructure/repository/AuthRepository';
import { ApiService } from '../../infrastructure/http/ApiService';
import { CustomError } from '../../core/errors/CustomError';
import Swal from 'sweetalert2';

interface ChangePasswordModalProps {
    open: boolean,
    onClose: () => void;
}

const apiService = new ApiService();
const authRepository = new AuthRepository(apiService);

const ChangePasswordModal = ({ open, onClose }: ChangePasswordModalProps) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    const resetForm = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }

    const handleSubmit = async () => {
        setErrorMessage(null);
        setSuccessMessage(null);

        if (newPassword !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            await authRepository.changePw({
                oldPassword,
                newPassword,
            });
            setSuccessMessage('Constraseña cambiada con exito');
            Swal.fire({
                title: '¡Éxito!',
                text: 'La contraseña se cambio exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });

            setTimeout(() => {
                onClose();
                resetForm();
            }, 1500);
        } catch (err: any) {
            if (err instanceof CustomError) {
                switch (err.statusCode) {
                    case 400:
                        setErrorMessage('Solicitud inválida. Verifique los campos e intente nuevamente.');
                        break;
                    case 401:
                        setErrorMessage('Autenticación fallida. La contraseña actual es incorrecta.');
                        break;
                    case 500:
                        setErrorMessage('Error interno del servidor. Intente más tarde.');
                        break;
                    default:
                        setErrorMessage(err.message || 'Error al cambiar la contraseña.');
                }
            } else {
                setErrorMessage('Error la contraseña actual no es la correcta.');
            }
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
                {successMessage && (
                    <Box color="green">
                        <Typography>{successMessage}</Typography>
                    </Box>
                )}
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
