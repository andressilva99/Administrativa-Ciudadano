import React, { useState, useEffect } from 'react';
import { CircularProgress,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { IUser } from '../../core/entities/user/IUser'; 
import { FindUsersByDni } from '../../core/use-cases/user/FindUserByDni';
import { ApiService } from '../../infrastructure/http/ApiService';
import { UserRepository } from '../../infrastructure/repository/UserRepository';
import { CustomError } from '../../core/errors/CustomError';

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
                if (err instanceof CustomError) {
                    setError(err.message);
                } else {
                    setError('Error desconocido para encontrar el usuario');
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
        return <div>No se encontro un usuario con ese DNI</div>;
    }
    
    const userList = user.list[0];
    return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>*Campo</TableCell>
                <TableCell>Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>*ID</TableCell>
                <TableCell>{userList.id || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>*Nombre</TableCell>
                <TableCell>{userList.firstName || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>*Apellido</TableCell>
                <TableCell>{userList.lastName || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>*Email</TableCell>
                <TableCell>{userList.email || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>*DNI</TableCell>
                <TableCell>{userList.dni || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>*Teléfono</TableCell>
                <TableCell>{userList.phoneNumber || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>*Último acceso</TableCell>
                <TableCell>{userList.lastAccessDate || 'N/A'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      );
};

export default UserByDni;
