import ReactTable from './ReactTable'; // Importar el componente reutilizable
import MainCard from '../MainCard';
import ScrollX from '../ScrollX';
import { ReactNode } from 'react';
import { CircularProgress, TablePagination, Typography } from '@mui/material'; // Importar paginación de Material UI
import { Box } from '@mui/material';

interface BasicTableProps {
  columns: any[];
  data: any[];
  loading: boolean;
  striped?: boolean;
  children: ReactNode;
  page: number; // Página actual
  rowsPerPage: number; // Cantidad de filas por página
  totalCount: number; // Total de filas
  onPageChange: (event: unknown, newPage: number) => void; // Callback para cambiar de página
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Callback para cambiar filas por página
}

const BasicTable: React.FC<BasicTableProps> = ({
  columns,
  data,
  loading,
  striped,
  children,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <MainCard content={false}>
      {children}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size="1.5rem" sx={{ mr: 1 }} />
          <Typography  variant="h6">Cargando...</Typography>
        </Box>
      ) : (
        <>
          <ScrollX>
            <ReactTable columns={columns} data={data} striped={striped} />
          </ScrollX>
          <TablePagination
            component="div"
            count={totalCount} // Total de usuarios
            page={page} // Página actual
            onPageChange={onPageChange} // Función para cambiar de página
            rowsPerPage={rowsPerPage} // Cantidad de filas por página
            onRowsPerPageChange={onRowsPerPageChange} // Función para cambiar la cantidad de filas
          />
        </>
      )}
    </MainCard>
  );
};

export default BasicTable;
