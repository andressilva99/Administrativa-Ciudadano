import {
  EditOutlined,
  SearchOutlined,
  VisibilityOutlined,
  Add,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Stack,
  TextField,
  Tooltip,
  useTheme,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { IPenaltyData } from '../../core/entities/penalty/IPentalty';
import { getAllPenaltysUseCase } from '../../core/penalty/usecases/getall.penaltys.usecase';

import moment from 'moment';
import { useNavigate } from 'react-router';
import BasicTable from '../../components/common/BasicTable';
import PenaltyData from '../../components/penalty/PenaltyData';

interface Property {
  name: string;
  value: string;
}

const properties: Property[] = [
  { name: 'Ciudadano', value: 'firstName' },
  { name: 'Tipo', value: 'type' },
  { name: 'Fecha de emisión', value: 'issuedDateFrom' },
];

const PenaltiesPage = () => {
  const [penaltyData, setPenaltyData] = useState<IPenaltyData[]>([]);
  const [issuedDateFrom, setIssuedDateFrom] = useState<string>(
    moment('2024-10-08').startOf('day').toISOString(),
  );
  const [issuedDateTo, setIssuedDateTo] = useState<string>(moment().endOf('day').toISOString());
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchProp, setSearchProp] = useState<Property>({ name: 'Ciudadano', value: 'firstName' });
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedPenaltyId, setSelectedPenaltyId] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const theme = useTheme();

  const navigate = useNavigate();

  const handleEditCLick = (id: number) => {
    navigate(`/penalty/edit/${id}`);
  };

  const handleViewClick = (id: number) => {
    setSelectedPenaltyId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Descripción',
        accessor: 'description',
      },
      {
        Header: 'Fecha de Emisión',
        accessor: 'issuedDate',
      },
      {
        Header: 'Fecha de Resolución',
        accessor: 'resolvedDate',
      },
      {
        Header: 'Acciones',
        className: 'cell-center font-size',
        disableSortBy: true,
        Cell: ({ row }: any) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="Ver">
                <IconButton color="secondary" onClick={() => handleViewClick(row.values.id)}>
                  <VisibilityOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip title="Editar">
                <IconButton color="secondary" onClick={() => handleEditCLick(row.values.id)}>
                  <EditOutlined sx={{ color: theme.palette.primary.main }} />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        },
      },
    ],
    [],
  );

  const fetchData = useCallback(
    async (page: number, rowsPerPage: number) => {
      try {
        const { value } = searchProp;
        const results = await getAllPenaltysUseCase.execute(
          value,
          search,
          rowsPerPage,
          page,
          issuedDateFrom,
          issuedDateTo,
        );
        setPenaltyData(results.list);
        setTotalCount(results.total);
        console.log(results);
      } catch (error) {
        console.error('Error fetching penalties:', error);
      }
    },
    [searchProp, search, issuedDateFrom, issuedDateTo],
  );

  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(() => {
      fetchData(page, rowsPerPage);
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [page, rowsPerPage, search, issuedDateFrom, issuedDateTo, fetchData]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <BasicTable
          data={penaltyData}
          columns={columns}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={totalCount}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          loading={loading}
        >
          <Box
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <TextField
                select
                label="Buscar por"
                defaultValue=""
                sx={{ width: '150px', mr: 2 }}
                value={searchProp.value}
                onChange={(e) => {
                  const property = properties.find((prop) => prop.value === e.target.value);
                  setSearchProp(property!);
                }}
              >
                {properties.map((prop) => (
                  <MenuItem key={prop.value} value={prop.value}>
                    {prop.name}
                  </MenuItem>
                ))}
              </TextField>
              <OutlinedInput
                placeholder={`Buscar por ${searchProp.name}`}
                sx={{ width: '200px' }}
                endAdornment={
                  <InputAdornment position="end">
                    <SearchOutlined />
                  </InputAdornment>
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            <Button 
              variant="contained" 
              sx={{ ml: 2 }} 
              onClick={() => navigate('/penalty/new')}
              startIcon={<Add />}
            >
              Agregar
            </Button>
          </Box>
        </BasicTable>
      </Grid>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Datos de la penalización</DialogTitle>
        <DialogContent>{selectedPenaltyId && <PenaltyData id={selectedPenaltyId} />}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default PenaltiesPage;
