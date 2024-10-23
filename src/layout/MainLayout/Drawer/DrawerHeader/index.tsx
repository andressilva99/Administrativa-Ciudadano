// material-ui
import { useTheme } from '@mui/material/styles';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from '../../../../components/logo';

// ==============================|| DRAWER HEADER ||============================== //

interface Props {
  open: boolean;
}

const DrawerHeader = ({ open }: Props) => {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Logo 
        isIcon={!open} 
        sx={{ 
            width: open ? '150px' : '0px', 
            height: open ? 'auto' : '0px',
            overflow: 'hidden',
            transition: 'width 0.3s ease, height 0.3s ease'
        }} 
      />
    </DrawerHeaderStyled>
  );
};

export default DrawerHeader;
