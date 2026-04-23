import { ReactElement } from 'react';

export interface NavItem {
  key: string;
  route: string;
  icon: ReactElement;
  label: string;
  badgeCount?: number;
  isMainAction?: boolean;
}

export interface NavbarConfig {
  items: NavItem[];
  cartItem?: NavItem;
}

export type NavbarRole = 'client' | 'commerce' | 'user';
export interface NavbarRoutes {
  home: string;
  products?: string;
  orders: string;
  cart?: string; 
  notifications: string;
  profile: string;
}