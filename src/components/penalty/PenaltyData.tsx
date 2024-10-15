import React, {useState, useEffect} from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material'
import { IPenaltyData } from '../../core/entities/penalty/IPentalty';
import { findByIdPenaltyUseCase } from '../../core/penalty/usecases/findId.penaltys.usecase';
import { CustomError } from '../../core/errors/CustomError';

interface PenaltyDataProps {
    id: number,
}

const PenaltyData: React.FC<PenaltyDataProps> = ({ id }) => {
    const [penalty, setPenalty] = useState<IPenaltyData | null>(null);
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPenaltyById = async () => {
            try {
                const data = await findByIdPenaltyUseCase.execute(id);
                setPenalty(data);
                console.log(data);
            } catch (err) {
                if (err instanceof CustomError) {
                    setError(err.message);
                } else {
                    setError('Error desconocido para encontrar el usuario');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPenaltyById();
    }, [id]);
    
    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if(!penalty) {
        return <div>No se encontro un penalización con ese ID</div>;
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Campo</TableCell>
              <TableCell>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>{penalty.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Id CtzUser</TableCell>
              <TableCell>{penalty.idCtzUser || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Id penaltyType</TableCell>
              <TableCell>{penalty.idPenaltyType || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Id AdmUser</TableCell>
              <TableCell>{penalty.idAdmUser || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Id BycicleHistory</TableCell>
              <TableCell>{penalty.idBicycleHistory || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>{penalty.description || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fecha de Emisión</TableCell>
              <TableCell>{penalty.issuedDate || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fecha de Resolución</TableCell>
              <TableCell>{penalty.resolvedDate || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TSI</TableCell>
              <TableCell>{penalty.tsi || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TSU</TableCell>
              <TableCell>{penalty.tsu || 'N/A'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
};    

export default PenaltyData;