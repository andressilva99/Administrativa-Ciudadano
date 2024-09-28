import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress,Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer, TableHead } from '@mui/material';
import { ByIdModule, ModuleByIdProps } from '../../core/entities/module/IModule';
import { ModuleRepository } from '../../infrastructure/repository/ModuleRepository';
import { ApiService } from '../../infrastructure/http/ApiService';

const apiService = new ApiService();
const moduleRepository = new ModuleRepository(apiService);

const fetchModulesById = async (id: number): Promise<ByIdModule> => {
  try {
    const response = await moduleRepository.findModulesById(id);
    return response;
  } catch (error) {
    console.error('Error fetching module:', error);
    throw new Error('Error fetching module');
  }
};

const ModuleById: React.FC<ModuleByIdProps> = ({ id }) => {
  const [module, setModule] = useState<ByIdModule | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getModule = async () => {
      try {
        const data = await fetchModulesById(id);
        setModule(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    getModule();
  }, [id]);

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

export default ModuleById;
