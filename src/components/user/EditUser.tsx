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
import { EUser, IPermissionItem } from '../../core/entities/user/IUser';
import { UserRepository } from '../../infrastructure/repository/UserRepository';
import { ApiService } from '../../infrastructure/http/ApiService';

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
        if (!userId) {
            setError('User ID inválido');
        }
        const fetchUser = async () => {
            setLoading(true);
            try {
                const data = await userRepository.findUsersById(userId);
                if (data){
                    setUser(data);
                } else {
                    setError('Usuario no encontrado');
                }
            } catch (err) {
                console.error('Error fetching user: ', err);
                setError('Error fetching user');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        if (user) {
            setUser(prevUser => ({
                ...prevUser!,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handlePermissionChange = (permissionName: string) => {
        if (user) {
            const updatedPermissionList = user.permissionList.map(permission =>
                permission.name === permissionName
                    ? {...permission, checked: !permission.checked}
                    : permission
            );
            
            setUser(prevUser => prevUser ? {...prevUser, permissionList: updatedPermissionList} : null);

        }
    };

    const handleSubmit = async () => {
        if (user) {
            setLoading(true),
            setError(null);
            setSuccess(false);
            try {
                await userRepository.editUser(user.id, user);
                setSuccess(true);
            } catch (err) {
                console.error('Error updating user: ', error);
                setError('Error updating user');
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if(!user) {
        return <Typography variant='body1'>No se pudo cargar el usuario.</Typography>;
    }

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
                            value={user.id || ''}
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
                            value={user.firstName || ''}
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
                            value={user.lastName || ''}
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
                            value={user.email || ''}
                            onChange={handleFieldChange}
                            fullWidth
                            margin='normal'
                            required
                        />
                    </Grid>    
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Teléfono'
                            name='telefono'
                            value={user.phoneNumber || ''}
                            onChange={handleFieldChange}
                            fullWidth
                            margin='normal'
                            required
                        />
                    </Grid>    
                </Grid>

                <Typography variant='h6' gutterBottom>
                    Permisos
                </Typography>
                <Grid container spacing={2}>
                    {user.permissionList && user.permissionList.map((permission: IPermissionItem) => (
                        <Grid item xs={12} sm={6} key={permission.name}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={permission.checked || false}
                                        onChange={() => handlePermissionChange(permission.name)} 
                                    />
                                } 
                                label= {permission.description}
                            />
                        </Grid>
                    ))}
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
