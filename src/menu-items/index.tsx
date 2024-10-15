// third-party
//import { FormattedMessage } from 'react-intl';

// assets
import { HomeOutlined, UserOutlined, DatabaseOutlined, GoldOutlined } from '@ant-design/icons';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import DirectionsBikeOutlinedIcon from '@mui/icons-material/DirectionsBikeOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';


// project import
import { NavItemType } from '../types/menu';

//  icons
const icons = {
  HomeOutlined,
  UserOutlined,
  DatabaseOutlined,
  GoldOutlined,
  ReceiptLongOutlinedIcon,
  DirectionsBikeOutlinedIcon,
  GavelOutlinedIcon,
  RoomOutlinedIcon,
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
      id: 'group-penalty',
      type: 'group',
      children: [
        {
          id: 'penalty',
          type: 'item',
          title: 'Penalizaciones',
          icon: icons.ReceiptLongOutlinedIcon,
          url: '/penalty',
          permission: 'PENALTY_VIEW_N',
        },
      ],
    },
    {
      id: 'group-penaltyType',
      type: 'group',
      children: [
        {
          id: 'penaltyType',
          type: 'item',
          title: 'Tipos de Penalizaciones',
          icon: icons.GavelOutlinedIcon,
          url: '/penaltyType',
          permission: 'PENALTY_TYPE_VIEW_N',
        },
      ],
    },
    {
      id: 'group-bicycle',
      type: 'group',
      children: [
        {
          id: 'bicis',
          type: 'item',
          title: 'Bicicletas',
          icon: icons.DirectionsBikeOutlinedIcon,
          url: '/bicis',
          permission: 'BICIS_VIEW_N',
        },
      ],
    },
    {
      id: 'group-station',
      type: 'group',
      children: [
        {
          id: 'station',
          type: 'item',
          title: 'Estaciones',
          icon: icons.RoomOutlinedIcon,
          url: '/station',
          permission: 'STATION_VIEW_N',
        },
      ],
    },
  ],
};

export default menuItems;
