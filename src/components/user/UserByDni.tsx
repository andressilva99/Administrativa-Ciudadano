import React, { useState, useEffect } from 'react';
import { CircularProgress,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { IUser } from '../../core/entities/user/IUser'; 
import { FindUsersByDni } from '../../core/use-cases/user/FindUserByDni';
import { ApiService } from '../../infrastructure/http/ApiService';
import { UserRepository } from '../../infrastructure/repository/UserRepository';
import Swal from 'sweetalert2';


interface UserByDniProps {
    dni: string,
    onCancel: () => void;
}

const UserByDni: React.FC<UserByDniProps> = ({ dni, onCancel }) => {
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
                if (!data || !data.list || data.list.length === 0) {
                  onCancel();
                  Swal.fire({
                      title: 'No encontrado',
                      text: 'No se encontró un usuario con ese DNI.',
                      icon: 'warning',
                      confirmButtonText: 'Aceptar'
                  });
              } else {
                  setUser(data);
              }
          } catch (err) {
              console.error('Error al buscar el Usuario', err);
              onCancel();
              Swal.fire({
                  title: 'Error',
                  text: 'Hubo un problema al buscar el Usuario.',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
              });
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
