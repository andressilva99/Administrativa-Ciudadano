import React, {useState, useEffect} from 'react';
import {List, ListItem, ListItemText, CircularProgress} from '@mui/material'
import { IUser } from '../../core/entities/user/IUser';
import { FindUsersById } from '../../core/use-cases/user/FindUserById';
import { findUsersByDni } from '../../core/use-cases/user/FindUserByDni';
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
                if(id) {
                    const findById = new FindUsersById(userRepository);
                    const data = await findById.findUsersById(id);
                    setUser(data);
                } else if (dni) {
                    const findByDni = new findUsersByDni(userRepository);
                    const data = await findByDni.findUsersByDni(dni);
                    setUser(data);
                }
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

    return(
        <List>
            <ListItem>
                <ListItemText primary="*ID" secondary={user.id} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*Nombre" secondary={user.firstName} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*Apellido" secondary={user.lastName} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*Email" secondary={user.email} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*DNI" secondary={user.dni} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*Teléfono" secondary={user.phoneNumber} />
            </ListItem>
        </List>
    );
};

export default UserById;