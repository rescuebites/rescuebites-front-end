import type { NavbarRoutes } from '../types';

export const navbarRoutes: Record<string, NavbarRoutes> = {
  client: {
    home: '/',
    orders: '/orders',
    cart: '/cart',
    notifications: '/notifications',
    profile: '/profile',
  },
  commerce: {
    home: '/commerce',
    orders: '/commerce/orders',
    notifications: '/commerce/notifications',
    profile: '/commerce/profile',
  },
  public: {
    home: '/',
    orders: '/orders',
    cart: '/cart',
    notifications: '/notifications',
    profile: '/profile',
  },
  void: {
    home: '/',
    orders: '/',
    cart: '/',
    notifications: '/',
    profile: '/',
  }
};