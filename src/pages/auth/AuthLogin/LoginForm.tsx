import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

//  material ui
import { Button, FormHelperText, Grid, InputAdornment, InputLabel, Link, OutlinedInput, Stack } from '@mui/material';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';
import IconButton from '../../../components/@extended/IconButton';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import AnimateButton from '../../../components/@extended/AnimateButton';
import { AuthService } from '../../../core/application/AuthService';

const LoginForm = () => {
  const [capsWarning, setCapsWarning] = useState(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const onKeyDown = (keyEvent: any) => {
    if (keyEvent.getModifierState('CapsLock')) {
      setCapsWarning(true);
    } else {
      setCapsWarning(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', submit: null }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('El nombre de usuario es obligatorio'),
        password: Yup.string().max(255).required('La contraseña es obligatoria')
      })}
      onSubmit={async (values) => {
        const authService = new AuthService();
        try {
          const response = await authService.signin(values.username, values.password);
          console.log(response);
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel>Nombre de usuario</InputLabel>
                <OutlinedInput
                  id="username-login"
                  type="text"
                  value={values.username}
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Tu nombre de usuario"
                  fullWidth
                  error={Boolean(touched.username && errors.username)}
                />
                {touched.username && errors.username && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.username}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel>Contraseña</InputLabel>
                <OutlinedInput
                  id="password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={(event: React.FocusEvent<any, Element>) => {
                    setCapsWarning(false);
                    handleBlur(event);
                  }}
                  onChange={handleChange}
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  fullWidth
                  color={capsWarning ? 'warning' : 'primary'}
                  onKeyDown={onKeyDown}
                  error={Boolean(touched.password && errors.password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} sx={{ mt: -1 }}>
              <Stack>
                <Link variant="h6" component={RouterLink} color="text.primary" to="/forgot-password">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Stack>
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
