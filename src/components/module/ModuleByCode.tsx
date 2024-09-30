import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, TableBody,
  TableRow,
  TableCell,
  TableContainer, TableHead, Table } from '@mui/material';
import { ByCodeModule, ModuleDetailProps } from '../../core/entities/module/IModule';
import { ModuleRepository } from '../../infrastructure/repository/ModuleRepository'; // Asegúrate de importar la clase implementada del repositorio
import { ApiService } from '../../infrastructure/http/ApiService';

const apiService = new ApiService();
const moduleRepository = new ModuleRepository(apiService);

const fetchModulesByCode = async (code: string) => {
  try {
    const response = await moduleRepository.findModulesByCode(code);
    return response;
  } catch (error) {
    throw new Error('Error fetching modules');
  }
};

const ModuleByCode: React.FC<ModuleDetailProps> = ({ code }) => {
  const [module, setModule] = useState<ByCodeModule | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getModule = async () => {
      try {
        const data = await fetchModulesByCode(code);
        setModule(data);
      } catch (error) {
        console.error('Error fetching module:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    getModule();
  }, [code]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!module) return <Typography>No module found</Typography>;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>*Campo</TableCell>
            <TableCell>Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>*ID:</TableCell>
            <TableCell>{module.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*NOMBRE:</TableCell>
            <TableCell>{module.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*CÓDIGO:</TableCell>
            <TableCell>{module.code}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*TIPO DE MÓDULO:</TableCell>
            <TableCell>{module.moduleType}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*NP HABILITADO:</TableCell>
            <TableCell>{module.enabledNp ? 'Yes' : 'No'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*LP HABILITADO:</TableCell>
            <TableCell>{module.enabledLp ? 'Yes' : 'No'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*MIN NIVEL NP:</TableCell>
            <TableCell>{module.minNpLevel}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>*MIN NIVEL LP:</TableCell>
            <TableCell>{module.minLpLevel}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ModuleByCode;


