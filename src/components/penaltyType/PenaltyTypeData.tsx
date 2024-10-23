import React, { useState, useEffect } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { IPenaltyTypeData } from '../../core/entities/penaltyType/IPenaltyType';
import { findByIdPenaltyTypeUseCase } from '../../core/penaltyType/usecase/findId.penaltyType.usecase';
import { CustomError } from '../../core/errors/CustomError';

interface PenaltyTypeDataProps {
    id: number;
}

const PenaltyTypesData: React.FC<PenaltyTypeDataProps> = ({ id }) => {
    const [penaltyType, setPenaltyType] = useState<IPenaltyTypeData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPenaltyTypeById = async () => {
            try {
                const data = await findByIdPenaltyTypeUseCase.execute(id);
                setPenaltyType(data);
                console.log(data);
            } catch (err) {
                if (err instanceof CustomError) {
                    setError(err.message);
                } else {
                    setError('Error desconocido al buscar el tipo de penalización');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPenaltyTypeById();
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!penaltyType) {
        return <div>No se encontró un tipo de penalización con ese ID</div>;
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
                        <TableCell>{penaltyType.id}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>{penaltyType.name || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Código</TableCell>
                        <TableCell>{penaltyType.code || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Fijado</TableCell>
                        <TableCell>{penaltyType.fixed ? 'Sí' : 'No'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Descripción</TableCell>
                        <TableCell>{penaltyType.description || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Habilitado</TableCell>
                        <TableCell>{penaltyType.enabled ? 'Sí' : 'No'}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PenaltyTypesData;
