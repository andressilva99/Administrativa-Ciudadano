import {
  DeleteOutline,
  EditOutlined,
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
  Stack,
  Tooltip,
  useTheme
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { IPenaltyTypeData } from '../../core/entities/penaltyType/IPenaltyType';
import { deletePenaltyTypeUseCase } from '../../core/penaltyType/usecase/delete.penaltyType.usecase';
import { getAllPentalyTypeUseCase } from '../../core/penaltyType/usecase/getall.pentalyType.usecase';

import { useNavigate } from 'react-router';
import BasicTable from '../../components/common/BasicTable';
import PenaltyTypesData from '../../components/penaltyType/PenaltyTypeData';

const PenaltyTypePage = () => {
  const [penaltyTypeData, setPenaltyTypeData] = useState<IPenaltyTypeData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedPenaltyTypeId, setSelectedPenaltyTypeId] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [penaltyTypeToDelete, setPenaltyTypeToDelete] = useState<number | null>(null);

  const theme = useTheme();
  const navigate = useNavigate();

  const handleEditCLick = (id: number) => {
    navigate(`/penaltyType/edit/${id}`);
  };

  const handleViewClick = (id: number) => {
    setSelectedPenaltyTypeId(id);
    setOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setPenaltyTypeToDelete(id);
    setDeleteOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (penaltyTypeToDelete !== null) {
      try {
        await deletePenaltyTypeUseCase.execute(penaltyTypeToDelete);
        setPenaltyTypeData((prev) => prev.filter((item) => item.id !== penaltyTypeToDelete));
        setDeleteOpen(false);
      } catch (error) {
        console.error('Error deleting penalty type:', error);
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Nombre',
        accessor: 'name',
      },
      {
        Header: 'Código',
        accessor: 'code',
      },
      {
        Header: 'Descripción',
        accessor: 'description',
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
              <IconButton color="secondary" onClick={() => handleEditCLick(row.values.id)}>
                <EditOutlined sx={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                color="secondary"
                sx={{ color: theme.palette.error.main }}
                onClick={() => handleDeleteClick(row.values.id)}
              >
                <DeleteOutline />
              </IconButton>
            </Tooltip>
          </Stack>
        ),
      },
    ],
    [],
  );

  const fetchData = useCallback(async (page: number, rowsPerPage: number) => {
    try {
      const results = await getAllPentalyTypeUseCase.execute(rowsPerPage, page);
      setPenaltyTypeData(results.list);
      setTotalCount(results.total);

      console.log(results);
    } catch (error) {
      console.error('Error fetching penalty types:', error);
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
          data={penaltyTypeData}
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
              onClick={() => navigate('/penaltyType/new')}
              startIcon={<Add />}
            >
              Agregar 
            </Button>
          </Box>
        </BasicTable>
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Datos del tipo de penalización</DialogTitle>
        <DialogContent>
          {selectedPenaltyTypeId && <PenaltyTypesData id={selectedPenaltyTypeId} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>¿Está seguro de que desea eliminar este tipo de penalización?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" variant="contained">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default PenaltyTypePage;
