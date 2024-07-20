//  material-ui
import { Grid, Stack, Typography } from '@mui/material';

//  third party
import LoginForm from './LoginForm';

const AuthLogin = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          sx={{ mb: { xs: -0.5, sm: 0.5 } }}
        >
          <Typography variant="h3">Ingresar</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default AuthLogin;
