import React, {useState, useEffect} from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material'
import { IUser } from '../../core/entities/user/IUser';
import { FindUsersById } from '../../core/use-cases/user/FindUserById';
import { ApiService } from '../../infrastructure/http/ApiService';
import { UserRepository } from '../../infrastructure/repository/UserRepository';
import { CustomError } from '../../core/errors/CustomError';
import Swal from 'sweetalert2';

interface UserByIdProps {
    id: number,
    onCancel: () => void;
}

const UserById: React.FC<UserByIdProps> = ({ id, onCancel}) => {
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
                if (!data || !data.admUser) {
                  onCancel();
                  Swal.fire({
                      title: 'Usuario no encontrado',
                      text: 'No se encontró un usuario con ese ID.',
                      icon: 'warning',
                      confirmButtonText: 'Aceptar'
                  });
              } else {
                  setUser(data);
              }
          } catch (err) {              
              onCancel();
              Swal.fire({
                  title: 'Usuario no encontrado',
                  text: 'No se encontró un usuario con ese ID.',
                  icon: 'warning',
                  confirmButtonText: 'Aceptar'
              });
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
        return <div> {error}</div>;
    }

    if(!user || !user.admUser) {
        return <div>No se encontro un usuario con ese ID</div>;
    }
    
    const admUser = user.admUser;
    const modules = user.moduleList || [];
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
                <TableCell>{admUser?.id || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>*Nombre</TableCell>
                <TableCell>{admUser?.firstName || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>*Apellido</TableCell>
                <TableCell>{admUser?.lastName || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>*Email</TableCell>
                <TableCell>{admUser?.email || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>*DNI</TableCell>
                <TableCell>{admUser?.dni || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>*Teléfono</TableCell>
                <TableCell>{admUser?.phoneNumber || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>*Último acceso</TableCell>
                <TableCell>{admUser?.lastAccessDate || 'N/A'}</TableCell>
              </TableRow>                          
    
              {modules.length > 0 && (
                <>
                <TableRow>
                  <TableCell>---------*MÓDULOS ASIGNADOS*---------</TableCell>
                  
                </TableRow>                
                  {modules.map((module, index) => (
                    <TableRow key={index}>
                      <TableCell>- {module.name}</TableCell>
                      <TableCell>{module.configuraciones.description}</TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      );
};

export default UserById;