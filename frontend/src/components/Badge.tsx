import React from 'react';
import clsx from 'clsx';

type Color = 'primary' | 'success' | 'warning' | 'danger' | 'gray';

interface BadgeProps {
  children: React.ReactNode;
  color?: Color;
  className?: string;
}

const colorClasses: Record<Color, string> = {
  primary: 'bg-primary text-primary-foreground',
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-500 text-white',
  danger: 'bg-red-500 text-white',
  gray: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
};

const Badge: React.FC<BadgeProps> = ({ children, color = 'gray', className }) => (
  <span className={clsx('inline-block px-3 py-1 rounded-full text-xs font-semibold', colorClasses[color], className)}>
    {children}
  </span>
);

export default Badge; 