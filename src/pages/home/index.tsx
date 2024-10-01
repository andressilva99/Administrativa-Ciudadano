import { Grid, Typography, Box, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Home = () => {
  const theme = useTheme();

  return (
    <Grid 
      container 
      spacing={3} 
      justifyContent="center" 
      alignItems="flex-start"
      style={{ minHeight: '70vh', textAlign: 'center', paddingTop: theme.spacing(4) }}
    >
      {/* Contenedor para la imagen y las tarjetas */}
      <Grid item container xs={12} spacing={3} justifyContent="center">
        {/* Tarjeta con texto de bienvenida y descripción */}
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ maxWidth: '100%', margin: 'auto', padding: 2 }}>
            <CardContent>
              <Typography 
                variant="h2" 
                color={theme.palette.primary.main} 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 2, 
                  fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3rem' } 
                }}
              >
                ¡Bienvenido a la App Administrativa!
              </Typography>

              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                Funcionalidades de la App
              </Typography>

              <div>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  Esta aplicación facilita la administración de usuarios, roles y módulos de manera eficiente. Dependiendo de los permisos que tengas habilitados, podrás:
                </Typography>
                <ul style={{ listStyleType: 'disc', paddingLeft: '0', textAlign: 'left' }}>
                  <li><strong>Crear:</strong> nuevos usuarios y roles para gestionar tu equipo.</li>
                  <li><strong>Modificar:</strong> actualizar la información de usuarios y roles según sea necesario.</li>
                  <li><strong>Ver detalles:</strong> consultar la información específica de usuarios, roles y módulos.</li>
                  <li><strong>Realizar asignaciones:</strong> asignar roles y permisos a los usuarios para optimizar el flujo de trabajo.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Imagen más grande */}
        <Grid item xs={12} sm={6} md={6}>
          <Box
            component="img"
            src="https://sanfrancisco.utn.edu.ar/imagenes/noticias/fotografias/gf-2336-692651.jpg" 
            alt="Logo UTN"
            sx={{ 
              width: { xs: '90%', sm: '80%', md: '100%' }, 
              height: 'auto', 
              borderRadius: '16px', 
              boxShadow: theme.shadows[3] 
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
