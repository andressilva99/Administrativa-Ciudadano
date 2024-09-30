import { useState } from 'react';
import { Link as RouterLink, useNavigate} from 'react-router-dom';

//  material ui
import {
  Button,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '../../../components/@extended/IconButton';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import AnimateButton from '../../../components/@extended/AnimateButton';
import { LoginUser } from '../../../core/use-cases/auth/LoginUsers';
import { ApiService } from '../../../infrastructure/http/ApiService';
import { AuthRepository } from '../../../infrastructure/repository/AuthRepository';
import RecoverPassword from '../../../components/auth/RecoverPassword';

const LoginForm = () => {
  const navigate = useNavigate();

  const [capsWarning, setCapsWarning] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Formik
        initialValues={{ username: '', password: '', submit: null }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('El nombre de usuario es obligatorio'),
          password: Yup.string().max(255).required('La contraseña es obligatoria'),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const apiService = new ApiService();
          const authRepository = new AuthRepository(apiService);
          const loginUser = new LoginUser(authRepository);

          try {
            await loginUser.signin({ username: values.username, password: values.password });
            navigate('/');
          } catch (err) {
            console.error('Error during sin in', err);
            setErrors({ submit: 'Error de autentificación, por favor verifica tus credenciales' });
          } finally {
            setSubmitting(false);
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
                  <Link
                    variant="h6"
                    component="button"
                    onClick={handleClickOpen}
                    color="text.primary"
                  >
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
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Recuperar Contraseña
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <RecoverPassword />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginForm;
