import { House, LayoutGrid, ShoppingCart, Bell, User } from 'lucide-react'

export const navbarIcons = {
  home: <House size={26} />,
  orders: <LayoutGrid size={26} />,
  cart: <ShoppingCart size={28} />,
  notifications: <Bell size={26} />,
  profile: <User size={26} />,
};

export const navbarLabels = {
  home: 'Inicio',
  orders: 'Pedidos',
  cart: 'Carrito',
  notifications: 'Notificaciones',
  profile: 'Perfil',
};