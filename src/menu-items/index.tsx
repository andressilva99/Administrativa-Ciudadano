// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { HomeOutlined, UserOutlined, DatabaseOutlined, GoldOutlined } from '@ant-design/icons';

// project import
import { NavItemType } from '../types/menu';

//  icons
const icons = {
  HomeOutlined,
  UserOutlined,
  DatabaseOutlined,
  GoldOutlined,
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
          title: <FormattedMessage id="Inicio" />,
          type: 'item',
          url: '/',
          icon: icons.HomeOutlined,
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
          title: <FormattedMessage id="Usuarios" />,
          icon: icons.UserOutlined,
          url: '/user',
        },
      ],
    },
    {
      id: 'group-role',
      type: 'group',
      children: [
        {
          id: 'user',
          type: 'item',
          title: <FormattedMessage id="Roles" />,
          icon: icons.DatabaseOutlined,
          url: '/role',
        },
      ],
    },
    {
      id: 'group-module',
      type: 'group',
      children: [
        {
          id: 'user',
          type: 'item',
          title: <FormattedMessage id="Módulos" />,
          icon: icons.GoldOutlined,
          url: '/module',
        },
      ],
    },
  ],
};

export default menuItems;
