import { ReactNode, SyntheticEvent, useRef, useState } from 'react';

import { selectUserFirstName, selectUserLastName } from '../../../../../store/reducers/slices/userSlice';
import { useSelector } from 'react-redux';

//  material-ui
import {
  Box,
  Button,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ChangePasswordModal from '../../../../../components/auth/ChangePassword';

//  project import
import Avatar from '../../../../../components/@extended/Avatar';
import IconButton from '../../../../../components/@extended/IconButton';
import Transitions from '../../../../../components/@extended/Transitions';
import MainCard from '../../../../../components/MainCard';

//  assets
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import avatar1 from '../../../../../assets/images/users/avatar-1.png';

//  types
interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
}

// tab panel wrapper
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const firstName = useSelector(selectUserFirstName);
  const lastName = useSelector(selectUserLastName);

  const [openChangePasswordModal, setOpenChangePasswordModal] = useState<boolean>(false);

  const handleLogout = () => {
    window.localStorage.removeItem('access_token');
    setTimeout(() => {
      navigate('/auth/login');
    }, 100);
    console.log('Cierre de sesión');
  };

  const handleOpenChangePasswordModal = () => {
    setOpenChangePasswordModal(true);
  };
  const handleCloseChangePasswordModal = () => {
    setOpenChangePasswordModal(false);
  };

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const iconBackColorOpen = theme.palette.mode === 'dark' ? 'grey.200' : 'grey.300';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': {
            bgcolor: theme.palette.mode === 'dark' ? 'secondary.light' : 'secondary.lighter',
          },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2,
          },
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt="profile user" src={avatar1} size="xs" />
          <Typography variant="subtitle1">{firstName} {lastName}</Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down('md')]: {
                    maxWidth: 250,
                  },
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Stack direction="row" spacing={1.25} alignItems="center">
                            <Avatar
                              alt="profile user"
                              src={avatar1}
                              sx={{ width: 32, height: 32 }}
                            />
                            <Stack>
                              <Typography variant="h6">Sección Activa</Typography>
                              <Typography variant="body2" color="textSecondary">
                                UI/UX Designer
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item>
                          <Tooltip title='Cambiar Contraseña'>
                            <Button onClick={handleOpenChangePasswordModal}>Cambiar Contraseña</Button>
                          </Tooltip>
                        </Grid>
                        <Grid item>
                          <Tooltip title="Logout">
                            <IconButton
                              size="large"
                              sx={{ color: 'text.primary' }}
                              onClick={handleLogout}
                            >
                              <LogoutOutlined />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
      <ChangePasswordModal
        open={openChangePasswordModal}
        onClose={handleCloseChangePasswordModal}
      />
    </Box>
  );
};

export default Profile;
