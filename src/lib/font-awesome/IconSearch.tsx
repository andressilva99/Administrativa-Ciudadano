import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';
import { iconList } from './icons/fontAwesomeIcons';
import { SelectChangeEvent } from "@mui/material";
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { formatIconName } from "./iconsFormatter";


const IconSearch: React.FC = () => {
    const [prefix, setPrefix] = useState<'fas' | 'far'>('fas');
    const [iconName, setIconName] = useState<IconName>('calendar-check');

    const filteredIcons = iconList.filter(icon => icon.prefix === prefix);

    const handlePrefixChange = (event: SelectChangeEvent<'fas' | 'far'>) => {
        setPrefix(event.target.value as 'fas' | 'far');
        setIconName(filteredIcons[0]?.iconName || '');
    }

    const handleIconNameChange = (event: SelectChangeEvent<string>) => {
        setIconName(event.target.value as IconName)
    }

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
                Icon Search
            </Typography>

            <FormControl variant="outlined" style={{ marginBottom: '20px', minWidth: 120}}>
                <InputLabel>Style</InputLabel>
                <Select value={prefix} onChange={handlePrefixChange} label="Style">
                    <MenuItem value="fas">Solid</MenuItem>
                    <MenuItem value="far">Regular</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="outlined" style={{ marginBottom: '20px', minWidth: 200}}>
                <InputLabel>Icon Name</InputLabel>
                <Select value={iconName} onChange={handleIconNameChange} label="Icon Name">
                    {filteredIcons.map((icon) => (
                        <MenuItem key={icon.iconName} value={icon.iconName}>
                            {formatIconName(icon.iconName)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            
            <div style={{ marginTop: '20px'}}>
                <FontAwesomeIcon icon={[prefix, iconName]} size="lg"/> 
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                    {formatIconName(iconName)}
                </Typography>
            </div>   
        </div>
    )

}

export default IconSearch;