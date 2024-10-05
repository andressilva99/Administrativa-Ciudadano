import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { RootStateProps } from '../../../../../types/root';
import NavGroup from './NavGroup';
import menuItem from '../../../../../menu-items';
import { selectUserPermissions, selectUserRoot } from '../../../../../store/reducers/slices/userSlice';

const Navigation = () => {
  const menu = useSelector((state: RootStateProps) => state.menu);
  const { drawerOpen } = menu;

  const userPermissions = useSelector(selectUserPermissions);
  const isRoot = useSelector(selectUserRoot);

  const navGroups = menuItem.items.map((item) => {
    if (item.type === 'group' && item.children) {
      
      const filteredChildren = item.children.filter((child) => {
        const hasPermission = isRoot || !child.permission || userPermissions.includes(child.permission);
        console.log(`Checking permission for ${child.title}:`, child.permission, hasPermission);
        return hasPermission;
      });
      
      // const filteredChildren = item.children.filter((child) => {
      //   return !child.permission || userPermissions.includes(child.permission);
      // })
      
      if (filteredChildren.length > 0) {
        return <NavGroup key={item.id} item={{...item, children: filteredChildren}} />
      }
    }
    return null;
  });

  return (
    <Box sx={{ pt: drawerOpen ? 2 : 0, '& > ul:first-of-type': { mt: 0 } }}>
      {navGroups.length > 0 ? navGroups : (
        <Typography variant="h6" color="error" align="center">
          No hay opciones disponibles.
        </Typography>
      )}
    </Box>
  );
};

export default Navigation;
