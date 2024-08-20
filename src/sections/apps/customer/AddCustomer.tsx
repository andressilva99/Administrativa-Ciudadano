import { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
  FilledInput,
  Input,
  InputAdornment,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

// project imports
import Avatar from '../../../components/@extended/Avatar';
import IconButton from '../../../components/@extended/IconButton';
import { openSnackbar } from '../../../store/reducers/snackbar';

// assets
import { CameraOutlined, DeleteFilled } from '@ant-design/icons';
import { AuthService } from '../../../core/application/AuthService';

// const avatarImage = require('../../../assets/images/users');

// constant
const getInitialValues = (customer: FormikValues | null) => {
  if (customer) {
    const newCustomer = {
      firstName: customer.firstName,
      lastName: customer.lastName,
      dni: customer.dni,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      password: customer.Password,
    };
    return newCustomer;
  } else {
    const newCustomer = {
      firstName: '',
      lastName: '',
      dni: '',
      email: '',
      phoneNumber: '',
      password: '',
    };
    return newCustomer;
  }
};

const allStatus = ['Complicated', 'Single', 'Relationship'];

// ==============================|| CUSTOMER ADD / EDIT / DELETE ||============================== //

export interface Props {
  customer?: any;
  onCancel: () => void;
}

const AddCustomer = ({ customer, onCancel }: Props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isCreating = !customer;

  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  // const [avatar, setAvatar] = useState<string | undefined>(
  //   avatarImage(`./avatar-${isCreating && !customer?.avatar ? 1 : customer.avatar}.png`).default
  // );

  const [showPassword, setShowPassword] = useState<Boolean>(false);

  useEffect(() => {
    if (selectedImage) {
      // setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const CustomerSchema = Yup.object().shape({
    firstName: Yup.string().max(255).required('El nombre es requerido'),
    lastName: Yup.string().max(255).required('El apellido es requerido'),
    dni: Yup.string().required('El DNI es requerido'),
    email: Yup.string()
      .max(255)
      .required('El email es requerido')
      .email('El email contiene un formato inválido'),
    phoneNumber: Yup.string().max(10).required('El número de celular es requerido'),
    password: Yup.string().max(16).required('La contraseña es requerida'),
  });

  const deleteHandler = () => {
    // dispatch(deleteCustomer(customer?.id)); - delete
    dispatch(
      openSnackbar({
        open: true,
        message: 'Usuario eliminado exitosamente.',
        variant: 'alert',
        alert: {
          color: 'success',
        },
        close: false,
      }),
    );
    onCancel();
  };

  const formik = useFormik({
    initialValues: getInitialValues(customer),
    validationSchema: CustomerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const authService = new AuthService();
      try {
        if (customer) {
          // dispatch(updateCustomer(customer.id, newCustomer)); - update
          dispatch(
            openSnackbar({
              open: true,
              message: 'Usuario actualizado exitosamente.',
              variant: 'alert',
              alert: {
                color: 'success',
              },
              close: false,
            }),
          );
        } else {
          const response = await authService.register(
            values.firstName,
            values.lastName,
            values.dni,
            values.email,
            values.phoneNumber,
            values.password,
          );
          console.log(response.data);
          dispatch(
            openSnackbar({
              open: true,
              message: 'Usuario añadido exitosamente.',
              variant: 'alert',
              alert: {
                color: 'success',
              },
              close: false,
            }),
          );
        }
        setSubmitting(false);
        onCancel();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormikProvider value={formik}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogTitle>{customer ? 'Editar Usuario' : 'Nuevo Usuario'}</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                  <FormLabel
                    htmlFor="change-avtar"
                    sx={{
                      position: 'relative',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      '&:hover .MuiBox-root': { opacity: 1 },
                      cursor: 'pointer',
                    }}
                  >
                    {/* <Avatar alt="Avatar 1" src={avatar} sx={{ width: 72, height: 72, border: '1px dashed' }} /> */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundColor:
                          theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, .75)'
                            : 'rgba(0,0,0,.65)',
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Stack spacing={0.5} alignItems="center">
                        <CameraOutlined
                          style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }}
                        />
                        <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                      </Stack>
                    </Box>
                  </FormLabel>
                  <TextField
                    type="file"
                    id="change-avtar"
                    label="Outlined"
                    variant="outlined"
                    sx={{ display: 'none' }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSelectedImage(e.target.files?.[0])
                    }
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="customer-firstName">Nombre</InputLabel>
                      <TextField
                        fullWidth
                        id="customer-firstName"
                        placeholder="Ingrese el nombre completo"
                        {...getFieldProps('firstName')}
                        error={Boolean(touched.firstName && errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="customer-lastName">Apellido</InputLabel>
                      <TextField
                        fullWidth
                        id="customer-lastName"
                        placeholder="Ingrese el apellido"
                        {...getFieldProps('lastName')}
                        error={Boolean(touched.lastName && errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="customer-dni">DNI</InputLabel>
                      <TextField
                        fullWidth
                        id="customer-dni"
                        placeholder="Ingrese el DNI"
                        {...getFieldProps('dni')}
                        error={Boolean(touched.dni && errors.dni)}
                        helperText={touched.dni && errors.dni}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="customer-email">Email</InputLabel>
                      <TextField
                        fullWidth
                        id="customer-email"
                        placeholder="Enter Customer Email"
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="customer-phoneNumber">Número de celular</InputLabel>
                      <TextField
                        fullWidth
                        id="customer-phoneNumber"
                        placeholder="Ingrese el número de celular (sin 0 y sin 15)"
                        {...getFieldProps('phoneNumber')}
                        error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                      />
                    </Stack>
                  </Grid>
                  {customer ? null : (
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-password">Contraseña</InputLabel>
                        <OutlinedInput
                          fullWidth
                          id="customer-password"
                          placeholder="Ingrese la contraseña"
                          type={showPassword ? 'text' : 'password'}
                          {...getFieldProps('password')}
                          error={Boolean(touched.password && errors.password)}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                style={{ color: 'rgba(102, 102, 102, 1)' }}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </Stack>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 2.5 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                {!isCreating && (
                  <Tooltip title="Eliminar usuario" placement="top">
                    <IconButton onClick={deleteHandler} size="large" color="error">
                      <DeleteFilled />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button color="error" onClick={onCancel}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {customer ? 'Editar' : 'Añadir'}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </DialogActions>
        </Form>
      </LocalizationProvider>
    </FormikProvider>
  );
};

export default AddCustomer;
