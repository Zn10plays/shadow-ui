// config/nav.ts
export type NavItem = {
  name: string;
  href: string;
};

export const navItems: NavItem[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    name: 'Features',
    href: '/features',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];