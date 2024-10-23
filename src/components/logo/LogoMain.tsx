// material-ui
import { useTheme } from '@mui/material/styles';
import logoUTN from '../../assets/images/logoUtn.png'

const LogoMain = ({ reverse, ...others }: { reverse?: boolean }) => {
  const theme = useTheme();
  return (
    <img 
      src={logoUTN} 
      alt="Logo UTN"
      width="150"
      style={{
        filter: theme.palette.mode === 'dark' || reverse ? 'invert(1)' : 'none',
      }} 
    />
  );
};

export default LogoMain;
