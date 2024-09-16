import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    TextField,
    Button,
    CircularProgress,
    Typography,
    Grid,
} from '@mui/material';
import { EUser } from '../../core/entities/user/IUser';
import { UserRepository } from '../../infrastructure/repository/UserRepository';
import { ApiService } from '../../infrastructure/http/ApiService';
import { CustomError } from '../../core/errors/CustomError';

const apiService = new ApiService();
const userRepository = new UserRepository(apiService);

interface EditUserProps {
    userId: number;
    onCancel: () => void;
}

const EditUser: React.FC<EditUserProps> = ({ userId, onCancel }) => {
    const [user, setUser ] = useState<EUser | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const data = await userRepository.findUsersById(userId);
                if (data && data.admUser){
                    setUser(data);
                } else {
                    setError('Usuario no encontrado');
                }
            } catch (err) {
                if (err instanceof CustomError) {
                    setError(err.message);
                  } else {
                    setError('Error desconocido para encontrar el usuario');
                  }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        if (user?.admUser) {
            setUser(prevUser => ({
                ...prevUser!,
                admUser: {
                    ...prevUser!.admUser,
                    [name]: type === 'checkbox' ? checked : value
                }
            }));
        }
    };

    const handleSubmit = async () => {
        if (user && user.admUser) {
            setLoading(true),
            setError(null);
            setSuccess(false);
            try {
                await userRepository.editUser(user.admUser);
                setSuccess(true);
            } catch (err) {
                if( err instanceof CustomError) {
                    setError(err.message);
                } else {
                    setError('Error desconocido al editar el usuario')
                }
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if(!user || !user.admUser) {
        return <Typography variant='body1'>No se pudo cargar el usuario.</Typography>;
    }

    const admUser = user.admUser;
    return (
        <Card>
            <CardContent style={{ paddingBottom: 0}}>
                <Typography variant="h6" gutterBottom>
                    Editar Usuario
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='ID de usuario'
                            name='id'
                            value={admUser.id}
                            onChange={handleFieldChange}
                            type='number'
                            fullWidth
                            margin='normal'
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Nombre'
                            name='firstName'
                            value={admUser.firstName || ''}
                            onChange={handleFieldChange}
                            fullWidth
                            margin='normal'
                            required
                        />
                    </Grid>    
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Apellido'
                            name='lastName'
                            value={admUser.lastName || ''}
                            onChange={handleFieldChange}
                            fullWidth
                            margin='normal'
                            required
                        />
                    </Grid>       
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Email'
                            name='email'
                            value={admUser.email || ''}
                            onChange={handleFieldChange}
                            fullWidth
                            margin='normal'
                            required
                        />
                    </Grid>    
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Teléfono'
                            name='phoneNumber'
                            value={admUser.phoneNumber || ''}
                            onChange={handleFieldChange}
                            fullWidth
                            margin='normal'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Enabled'
                            name='enabled'
                            value={admUser.enabled ? 'True' : 'False'}
                            fullWidth
                            margin='normal'
                            disabled
                        />
                    </Grid>     
                </Grid>
                
                <Grid container spacing={2} justifyContent="flex-end" mb={2}>
                    <Grid item>
                        <Button color='secondary' onClick={onCancel}>
                            Salir
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Actualizar Usuario'}
                        </Button>
                    </Grid>
                </Grid>

                {success && (
                    <Typography variant='body1' color="success.main">
                        Usuario actualizado exitosamente!
                    </Typography>
                )}
                {error && (
                    <Typography variant='body1' color="error.main">
                        {error}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default EditUser;
