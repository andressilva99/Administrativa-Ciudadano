import React, {useState, useEffect} from 'react';
import {List, ListItem, ListItemText, CircularProgress} from '@mui/material'
import { IUser } from '../../core/entities/user/IUser';
import { FindUsersById } from '../../core/use-cases/user/FindUserById';
import { ApiService } from '../../infrastructure/http/ApiService';
import { UserRepository } from '../../infrastructure/repository/UserRepository';
import { CustomError } from '../../core/errors/CustomError';

interface UserByIdProps {
    id: number,
}

const UserById: React.FC<UserByIdProps> = ({ id }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserById = async () => {
            const apiService = new ApiService();
            const userRepository = new UserRepository(apiService);

            try {
                const findById = new FindUsersById(userRepository);
                const data = await findById.findUsersById(id);
                setUser(data);
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

        fetchUserById();
    }, [id]);
    
    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if(!user || !user.admUser) {
        return <div>No se encontro un usario con ese ID</div>;
    }
    
    const admUser = user.admUser;
    const modules = user.moduleList || [];
    return(
        <List>
            <ListItem>
                <ListItemText primary="*ID" secondary={admUser?.id || 'N/A'} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*Nombre" secondary={admUser?.firstName || 'N/A'} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*Apellido" secondary={admUser?.lastName || 'N/A'} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*Email" secondary={admUser?.email || 'N/A'} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*DNI" secondary={admUser?.dni || 'N/A'} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*Teléfono" secondary={admUser?.phoneNumber || 'N/A'} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*Último acceso" secondary={admUser?.lastAccessDate || 'N/A'} />
            </ListItem>

            {modules.length > 0 && (
                <>
                    <ListItem>
                        <ListItemText primary="Módulos asignados: " />
                    </ListItem>
                    {modules.map((module, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`- ${module.name}`} />
                        </ListItem>
                    ))}
                </>
            )}
        </List>
    );
};

export default UserById;