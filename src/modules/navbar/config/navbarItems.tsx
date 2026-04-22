import { House, ShoppingCart, ShoppingBag, Bell, User } from 'lucide-react'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import StorefrontIcon from '@mui/icons-material/Storefront';

export const navbarIcons = {
  home: <House size={26} />,
  products: <StorefrontIcon sx={{ fontSize: 27 }} />,     
  orders: <ShoppingBag size={26} />,        
  cart: <ShoppingCart size={28} />,        
  commerceOrders: <LocalMallIcon sx={{ fontSize: 32 }} />,  
  notifications: <Bell size={26} />,
  profile: <User size={26} />,
};

export const navbarLabels = {
  home: 'Inicio',
  products: 'Productos',
  orders: 'Pedidos',
  notifications: 'Notificaciones',
  profile: 'Perfil',
};