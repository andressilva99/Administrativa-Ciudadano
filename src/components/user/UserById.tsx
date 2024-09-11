import React, {useState, useEffect} from 'react';
import {List, ListItem, ListItemText, CircularProgress} from '@mui/material'
import { IUser } from '../../core/entities/user/IUser';
import { FindUsersById } from '../../core/use-cases/user/FindUserById';
import { FindUsersByDni } from '../../core/use-cases/user/FindUserByDni';
import { ApiService } from '../../infrastructure/http/ApiService';
import { UserRepository } from '../../infrastructure/repository/UserRepository';

interface UserByIdProps {
    id?: number,
    dni?: string,
}

const useUserByIdOrDni = (id?: number, dni?: string) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const apiService = new ApiService();
            const userRepository = new UserRepository(apiService);

            try {
                let data: IUser | null = null;

                if(id) {
                    const findById = new FindUsersById(userRepository);
                    data = await findById.findUsersById(id);
                } else if (dni) {
                    const findByDni = new FindUsersByDni(userRepository);
                    data = await findByDni.findUsersByDni(dni);
                }
                console.log('Datos del user', data);

                setUser(data ?? null);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknow error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id, dni]);


    return { user, loading, error };
};

const UserById: React.FC<UserByIdProps> = ({ id, dni }) => {
    const { user, loading, error} = useUserByIdOrDni(id, dni);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if(!user) {
        return <div>No user found</div>;
    }
    
    const admUser = user.admUser;
    return(
        <List>
            <ListItem>
                <ListItemText primary="*ID" secondary={admUser.id || 'N/A'} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*Nombre" secondary={admUser.firstName || 'N/A'} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*Apellido" secondary={admUser.lastName || 'N/A'} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*Email" secondary={admUser.email || 'N/A'} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*DNI" secondary={admUser.dni || 'N/A'} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*Teléfono" secondary={admUser.phoneNumber || 'N/A'} />
            </ListItem>
            <ListItem>
                <ListItemText primary="Último acceso" secondary={admUser.lastAccessDate || 'N/A'} />
            </ListItem>
        </List>
    );
};

export default UserById;