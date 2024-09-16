import React, {useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid
} from '@mui/material';
import { UserRepository } from '../../infrastructure/repository/UserRepository';
import { ApiService } from '../../infrastructure/http/ApiService';
import { CustomError } from '../../core/errors/CustomError';

const apiService = new ApiService();
const userRepository = new UserRepository(apiService);

interface DeleteUserProps {
    userId: number,
    onCancel: () => void,
    onUserDeleted: () => void,
}

const DeleteUser: React.FC<DeleteUserProps> = ({ userId, onCancel, onUserDeleted }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false); 

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            await userRepository.deleteUser(userId);
            setSuccess(true);
            onUserDeleted();
        } catch (err){
            if (err instanceof CustomError) {
                setError(err.message);
              } else {
                setError('Error desconocido para eliminar el usuario');
              }
        } finally {
            setLoading(false);
            setOpenConfirmDialog(false)
        }
    };

    const handleConfirmOpen = () => {
        setOpenConfirmDialog(true);
    };
    const handleConfirmClose = () => {
        setOpenConfirmDialog(false);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant='h6' gutterBottom>
                    Eliminar Usuario
                </Typography>
                <Typography variant='body1' gutterBottom>
                    ¿Estás seguro que deseas eliminar este usuario? Esta acción no se puede revertir.
                </Typography>

                <Grid container spacing={2} justifyContent="flex-end" mb={2}>
                    <Grid item>
                        <Button color='secondary' onClick={onCancel}>
                            Cancelar
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant='contained' 
                            color='error' 
                            onClick={handleConfirmOpen}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Eliminar Usuario'}
                        </Button>
                    </Grid>
                </Grid>

                {success && (
                    <Typography variant='body1' color="success.main">
                        ¡Usuario eliminado exitosamente!
                    </Typography>
                )}
                {error && (
                    <Typography variant='body1' color="error.main">
                        {error}
                    </Typography>
                )}

                <Dialog 
                    open = {openConfirmDialog}
                    onClose={handleConfirmClose}
                    aria-labelledby='confirm-delete-dialog'
                >
                    <DialogTitle id="confirm-delete-dialog">Confirmar Eliminación</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Estás seguro de que deseas eliminar a este usuario? Esta acción es irreversible.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleConfirmClose} color='secondary'>
                            Cancelar
                        </Button>
                        <Button 
                            onClick={handleDelete} 
                            color='error'
                            variant='contained'
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Eliminar Usuario'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default DeleteUser;