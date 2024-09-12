import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { IUser } from '../../core/entities/user/IUser'; 
import { FindUsersByDni } from '../../core/use-cases/user/FindUserByDni';
import { ApiService } from '../../infrastructure/http/ApiService';
import { UserRepository } from '../../infrastructure/repository/UserRepository';

interface UserByDniProps {
    dni: string,
}

const UserByDni: React.FC<UserByDniProps> = ({ dni }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserByDni = async () => {
            const apiService = new ApiService();
            const userRepository = new UserRepository(apiService);

            try {
                const findByDni = new FindUsersByDni(userRepository);
                const data = await findByDni.findUsersByDni(dni);
                setUser(data);
            } catch (err) {
                if( err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknow error ocurred');
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchUserByDni();
    }, [dni]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if(!user || !user.list || user.list.length === 0) {
        return <div>No user found</div>;
    }
    
    const userList = user.list[0];
    return(
        <List>
            <ListItem>
                <ListItemText primary="*ID" secondary={userList.id || 'N/A'} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*Nombre" secondary={userList.firstName || 'N/A'} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*Apellido" secondary={userList.lastName || 'N/A'} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*Email" secondary={userList.email || 'N/A'} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*DNI" secondary={userList.dni || 'N/A'} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*Teléfono" secondary={userList.phoneNumber || 'N/A'} />
            </ListItem>
            <ListItem>
                <ListItemText primary="*Último acceso" secondary={userList.lastAccessDate || 'N/A'} />
            </ListItem>
        </List>
    );
};

export default UserByDni;
