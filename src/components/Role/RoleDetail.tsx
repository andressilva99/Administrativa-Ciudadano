import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TablePagination,
} from '@mui/material';
import { FindRoles } from '../../core/use-cases/role/FindRoles';
import { RoleRepository } from '../../infrastructure/repository/RoleRepository';
import { ApiService } from '../../infrastructure/http/ApiService';
import { IRole } from '../../core/entities/role/IRole';

const RoleTable: React.FC = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [idModule] = useState<string>("MAIN");
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  const findRol = useCallback(() => {
    const apiService = new ApiService();
    const roleRepository = new RoleRepository(apiService);
    return new FindRoles(roleRepository);
  }, [])

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await findRol().findRoles(idModule, page, size);
      setRoles(data.list);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  }, [idModule, page, size, findRol]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ID DE MODULO</TableCell>
              <TableCell>NOMBRE</TableCell>
              <TableCell>DESCRIPCIÓN</TableCell>
             {/* <TableCell>FIJO</TableCell>*/}
              <TableCell>ACTIVO</TableCell>
              {/*<TableCell>DESHABILITADO</TableCell>
              <TableCell>TSI</TableCell>
              <TableCell>TSU</TableCell>
              } COMENTO LA PARTE VISUAL DE LOS PERMISOS
              <TableCell>PERMISOS</TableCell>
              */}
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.id}</TableCell>
                <TableCell>{role.idModule}</TableCell>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                {/*<TableCell>{role.fixed ? 'Yes' : 'No'}</TableCell>*/}
                <TableCell>{role.enabled ? 'Yes' : 'No'}</TableCell>
                {/*<TableCell>{role.deleted ? 'Yes' : 'No'}</TableCell>
                <TableCell>{role.tsi}</TableCell>
                <TableCell>{role.tsu}</TableCell>
                
                <TableCell>
                   comento la visualizacion de los permisos
                  <ul>
                    {role.permissionsList.map((permission, index) => (
                      <li key={index}>{permission}</li>
                    ))}
                  </ul>
                  
                </TableCell>
                */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={size}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default RoleTable;
