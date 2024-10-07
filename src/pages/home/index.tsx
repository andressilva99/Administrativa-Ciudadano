import { Typography, Box, useMediaQuery } from '@mui/material';
import { useTheme  } from '@mui/material/styles';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: theme.spacing(isMobile ? 2 : 4), 
        minHeight: '100vh',
        maxWidth: '100vw',
      }}
    >
      <Typography
        variant={isMobile ? 'h3' : 'h1'} 
        component="h1"
        gutterBottom
      >
        Inicio
      </Typography>
      <Typography
        variant={isMobile ? 'h5' : 'h3'} 
        component="h2"
        gutterBottom
      >
        Bienvenido al sistema administrativo de la aplicación del ciudadano
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: theme.palette.text.secondary,
          opacity: 0.7,
          fontSize: isMobile ? '0.9rem' : '1rem', 
        }}
      >
        Seleccione una opción del menú lateral para continuar
      </Typography>
    </Box>
  );
};

export default Home;
