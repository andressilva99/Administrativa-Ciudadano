// third-party
//import { FormattedMessage } from 'react-intl';

// assets
import { HomeOutlined, UserOutlined, DatabaseOutlined, GoldOutlined } from '@ant-design/icons';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';

// project import
import { NavItemType } from '../types/menu';

//  icons
const icons = {
  HomeOutlined,
  UserOutlined,
  DatabaseOutlined,
  GoldOutlined,
  DirectionsBikeIcon,
};

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [
    {
      id: 'group-home',
      type: 'group',
      children: [
        {
          id: 'home',
          title: 'Inicio',
          type: 'item',
          url: '/',
          icon: icons.HomeOutlined,
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'group-user',
      type: 'group',
      children: [
        {
          id: 'user',
          type: 'item',
          title: 'Usuarios',
          icon: icons.UserOutlined,
          url: '/user',
          permission: 'ADMUSER_VIEW_N',
        },
      ],
    },
    {
      id: 'group-role',
      type: 'group',
      children: [
        {
          id: 'role',
          type: 'item',
          title: 'Roles',
          icon: icons.DatabaseOutlined,
          url: '/role',
          permission: 'ADMROLE_VIEW_N',
        },
      ],
    },
    {
      id: 'group-module',
      type: 'group',
      children: [
        {
          id: 'module',
          type: 'item',
          title: 'Módulos',
          icon: icons.GoldOutlined,
          url: '/module',
          permission: 'MODULE_VIEW_N',
        },
      ],
    },
    {
      id: 'group-bycicle',
      type: 'group',
      children: [
        {
          id: 'bycicle',
          type: 'item',
          title: 'Bicicletas urbanas',
          icon: icons.DirectionsBikeIcon,
          url: '/bycicle',
          permission: 'BICIS_DELIVERY',
        },
      ],
    },
  ],
};

export default menuItems;
