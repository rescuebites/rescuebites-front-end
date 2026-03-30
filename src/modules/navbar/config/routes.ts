import type { NavbarRoutes } from '../types';

export const navbarRoutes: Record<string, NavbarRoutes> = {
  client: {
    home: '/customer',
    orders: '/customer/orders',
    cart: '/customer/cart',
    notifications: '/customer/notifications',
    profile: '/customer/profile',
  },
  commerce: {
    home: '/commerce',
    orders: '/commerce/orders',
    //cart:'commerce/cart',
    notifications: '/commerce/notifications',
    profile: '/commerce/profile',
  },
  public: {
    home: '/public',
    orders: '/public/orders',
    cart:'/public/cart',
    notifications: '/public/notifications',
    profile: '/public/profile',
  },
};