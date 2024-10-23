import ReactTableNoPagination from './ReactTableNoPagination';
import MainCard from '../MainCard';
import ScrollX from '../ScrollX';
import { ReactNode } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/material';

interface BasicTableNoPaginationProps {
  columns: any[];
  data: any[];
  loading: boolean;
  striped?: boolean;
  children: ReactNode;
}

const BasicTableNoPagination: React.FC<BasicTableNoPaginationProps> = ({
  columns,
  data,
  loading,
  striped,
  children,
}) => {
  return (
    <MainCard content={false}>
      {children}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size="1.5rem" sx={{ mr: 1 }} />
          <Typography variant="h6">Cargando...</Typography>
        </Box>
      ) : (
        <ScrollX>
          <ReactTableNoPagination columns={columns} data={data} striped={striped} />
        </ScrollX>
      )}
    </MainCard>
  );
};

export default BasicTableNoPagination;
