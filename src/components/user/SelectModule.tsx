import {
    Button,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import React, { useState } from 'react';
import { IModule } from '../../core/entities/module/IModule';


interface SelectedModuleProps {
    modules: IModule[];
    selectedModules: number[];
    onModulesSelect: (selectedIds: number[]) => void;
    onCancel: () => void;
}

const SelectModules: React.FC<SelectedModuleProps> = ({ modules, onModulesSelect, onCancel, selectedModules}) => {
    const [tempSelectedModules, setTempSelectedModules] = useState<number[]>(selectedModules);

    const handleCheckboxChange = (moduleId: number) => {
        const newSelectedIds = tempSelectedModules.includes(moduleId)
            ? tempSelectedModules.filter((id) => id !== moduleId)
            : [...tempSelectedModules, moduleId];
        setTempSelectedModules(newSelectedIds);
    };

    const handleSaveChanges = () => {
        onModulesSelect(tempSelectedModules);
    };

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Seleccionar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {modules.map((module) => (
                            <TableRow key={module.id}>
                                <TableCell>{module.code}</TableCell>
                                <TableCell>{module.name}</TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={tempSelectedModules.includes(module.id)}
                                        onChange={() => handleCheckboxChange(module.id)} 
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{ display: 'flex', justifyContent:' flex-end', marginTop: '10px'}}>
                <Button variant="outlined" color="secondary" onClick={onCancel} style={{marginRight: '10px'}}>
                    Cancelar
                </Button>
                <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                    Guardar Cambios
                </Button>
            </div>
        </Paper>
    );
};

export default SelectModules;