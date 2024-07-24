import React, { useEffect, useState } from 'react';
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
import { AuthService } from '../core/application/AuthService';

interface Module {
  id: number;
  code: string;
  moduleType: string;
  name: string;
  enabledNp: boolean;
  enabledLp: boolean;
  minNpLevel: number;
  minLpLevel: number;
  configuraciones: {
    empty: boolean;
  };
}

interface ModuleResponse {
  list: Module[];
  total: number;
  size: number;
}

const fetchModules = async (page: number, size: number) => {
  const authService = new AuthService();
  const response = await authService.findModules(page, size);
  return response.data;
};

const ModulesTable: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const getModules = async () => {
      setLoading(true);
      try {
        const data: ModuleResponse = await fetchModules(page, size);
        setModules(data.list);
        setTotal(data.total);
      } catch (error) {
        console.error('Error fetching modules:', error);
      } finally {
        setLoading(false);
      }
    };

    getModules();
  }, [page, size]);

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
              <TableCell>Código</TableCell>
              <TableCell>Tipo de módulo</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>NP Habilitado</TableCell>
              <TableCell>LP Habilitado</TableCell>
              <TableCell>Min Nilvel NP</TableCell>
              <TableCell>Min Nivel LP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modules.map((module) => (
              <TableRow key={module.id}>
                <TableCell>{module.id}</TableCell>
                <TableCell>{module.code}</TableCell>
                <TableCell>{module.moduleType}</TableCell>
                <TableCell>{module.name}</TableCell>
                <TableCell>{module.enabledNp ? 'Yes' : 'No'}</TableCell>
                <TableCell>{module.enabledLp ? 'Yes' : 'No'}</TableCell>
                <TableCell>{module.minNpLevel}</TableCell>
                <TableCell>{module.minLpLevel}</TableCell>
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

export default ModulesTable;

// Configura Axios
//const api = axios.create({
//  baseURL: 'http://lavalle253.ddns.net:8090',
//});

//api.interceptors.request.use((config) => {
 // config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJVVE5GUlNGIiwic3ViIjoiQ3R6VXNlciIsImlkIjoxLCJpYXQiOjE3MjA0NDkyNzAsImV4cCI6MTcyMzA0MTI3MCwianRpIjoiNDAyY2RmNzctMDgwOC00NWQ1LTlkOWMtYzg4YmFiYWQxYTg1In0.NglGkRcTSaiFkMtpeIBxp9B35wOcwbYaCSvxceSf0bk'; // Reemplaza 'YOUR_AUTH_TOKEN' con el token real
  //return config;
//});
