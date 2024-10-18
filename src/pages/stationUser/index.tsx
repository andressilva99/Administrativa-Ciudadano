import { 
  EditOutlined, 
  PersonAddAltOutlined, 
  Add,
  VisibilityOutlined, 
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
  Stack,
  Tooltip,
  useTheme,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import BasicTable from '../../components/common/BasicTable';
import { IStationUserData } from '../../core/entities/stationUser/IStationuser';
import { getAllStationUserUseCase } from '../../core/stationUser/usecase/getAll.stationUser.usecase';

const StationUserPage = () => {
  const [stationUserData, setStationUserData] = useState<IStationUserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false); 
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const [selectedStationId, setSelectedStationId] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  
  const theme = useTheme();
  const navigate = useNavigate();
  
  const handleEditClick = (id: number) => {
    navigate(`/stationUser/edit/${id}`);
  };
  const handleAddUserClick = (id: number) => {
    navigate(`/stationUser/add/${id}`);
  };

  const handleViewClick = (id: number) => {
    setSelectedStationId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'ID Estación',
        accessor: 'id',
      },
      {
        Header: 'Nombre Estación',
        accessor: 'name',
      },
      {
        Header: 'Usuarios Asignados',
        accessor: 'usersInStation',
        Cell: ({ row }: any) => (
          <ul>
            {row.values.usersInStation.map((user: any) => (
              <li key={user.id}>{user.infoAdmuserName}</li>
            ))}
          </ul>
        ),
      },
      {
        Header: 'Acciones',
        className: 'cell-center font-size',
        disableSortBy: true,
        Cell: ({ row }: any) => (
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
            <Tooltip title="Ver">
              <IconButton color="secondary" onClick={() => handleViewClick(row.values.id)}>
                <VisibilityOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar">
              <IconButton color="secondary" onClick={() => handleEditClick(row.values.id)}>
                <EditOutlined sx={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Añadir Usuario">
              <IconButton color="success" onClick={() => handleAddUserClick(row.values.id)}>
                <PersonAddAltOutlined />
              </IconButton>
            </Tooltip>
          </Stack>
        ),
      },
    ],
    []
  );

  const fetchData = useCallback(async (page: number, rowsPerPage: number) => {
    try {
      const results = await getAllStationUserUseCase.execute(rowsPerPage, page);
      setStationUserData(results.list);
      setTotalCount(results.total);
    } catch (error) {
      console.error('Error fetching station users:', error);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(() => {
      fetchData(page, rowsPerPage);
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [page, rowsPerPage, fetchData]);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <BasicTable
          data={stationUserData}
          columns={columns}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={totalCount}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          loading={loading}
        >
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="contained"
              sx={{ ml: 2 }}
              onClick={() => navigate('/station')}
              startIcon={<Add />}
            >
              Agregar Estación
            </Button>
          </Box>
        </BasicTable>
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Datos de la Estación</DialogTitle>
        <DialogContent>
          {/* Aquí podrías cargar datos adicionales de la estación seleccionada */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default StationUserPage;

