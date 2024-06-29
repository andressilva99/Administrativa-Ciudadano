// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

// project import
import { NavItemType } from '../types/menu';

//  icons
const icons = {
  HomeOutlined,
  UserOutlined,
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
      id: 'group-others',
      type: 'group',
      children: [
        {
          id: 'user',
          type: 'item',
          title: <FormattedMessage id="Usuarios" />,
          icon: icons.UserOutlined,
        },
      ],
    },
  ],
};

export default menuItems;
