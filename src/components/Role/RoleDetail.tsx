import React, { useState, useEffect } from 'react';
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
import { AuthService } from '../../core/application/AuthService';

interface Role {
  id: number;
  moduleCode: string;
  idModule: number;
  name: string;
  description: string;
  fixed: boolean;
  enabled: boolean;
  deleted: boolean;
  tsi: string;
  tsu: string;
  permissionsList: string[];
}

interface RoleResponse {
  list: Role[];
  total: number;
  size: number;
}

const fetchRole = async (moduleCode: string, page: number, size: number): Promise<RoleResponse> => {
  const authService = new AuthService();
  try {
    console.log(`Fetching roles with params: module_Code=${moduleCode}, page=${page}, size=${size}`);
    const response = await authService.findRoles(moduleCode, page, size);
    return response;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw new Error('Error fetching roles');
  }
};

const RoleTable: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [moduleCode, setModuleCode] = useState<string>("MAIN");
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const getRoles = async () => {
      setLoading(true);
      try {
        const data: RoleResponse = await fetchRole(moduleCode, page, size);
        setRoles(data.list);
        setTotal(data.total);
      } catch (error) {
        console.error('Error fetching roles:', error);
      } finally {
        setLoading(false);
      }
    };

    getRoles();
  }, [moduleCode, page, size]);

  const handleChangePage = (event: unknown, newPage: number) => {
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
              <TableCell>FIJO</TableCell>
              <TableCell>HABILITADO</TableCell>
              <TableCell>DESHABILITADO</TableCell>
              <TableCell>TSI</TableCell>
              <TableCell>TSU</TableCell>
              {/*} COMENTO LA PARTE VISUAL DE LOS PERMISOS
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
                <TableCell>{role.fixed ? 'Yes' : 'No'}</TableCell>
                <TableCell>{role.enabled ? 'Yes' : 'No'}</TableCell>
                <TableCell>{role.deleted ? 'Yes' : 'No'}</TableCell>
                <TableCell>{role.tsi}</TableCell>
                <TableCell>{role.tsu}</TableCell>
                {/*
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
