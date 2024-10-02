// material-ui
import { useTheme } from '@mui/material/styles';
import logoUTN from '../../assets/images/logoUtn.png'

const LogoIcon = () => {
  const theme = useTheme();

  return (
    <img 
      src={logoUTN} 
      alt="Logo UTN"
      width="150"
      style={{
        filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',  // Esto aplica un filtro en modo oscuro si lo necesitas
      }} 
    />
  );
};

export default LogoIcon;
