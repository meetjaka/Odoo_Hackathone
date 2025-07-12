import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={clsx('bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-sm p-6', className)}>
    {children}
  </div>
);

export default Card; 