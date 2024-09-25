import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { AuthRepository } from '../../infrastructure/repository/AuthRepository';
import { ApiService } from '../../infrastructure/http/ApiService';

interface ChangePasswordModalProps {
    open: boolean,
    onClose: () => void;
}

const apiService = new ApiService();
const authRepository = new AuthRepository(apiService);

const ChangePasswordModal = ({open, onClose}: ChangePasswordModalProps) => {
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async () => {
        setErrorMessage(null);

        if (newPassword !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }
        try { 
            await authRepository.changePw({
                oldPassword: oldPassword || '', 
                newPassword: newPassword || '',
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
                    label='Contraseña Actual'
                    type='password'
                    fullWidth
                    margin='normal'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)} 
                />
                <TextField
                    label='Nueva Contraseña'
                    type='password'
                    fullWidth
                    margin='normal'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} 
                />
                <TextField
                    label='Repita la nueva Contraseña'
                    type='password'
                    fullWidth
                    margin='normal'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                {errorMessage && <Box color="red">{errorMessage}</Box>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit} variant='contained'>Guardar Cambios</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChangePasswordModal;