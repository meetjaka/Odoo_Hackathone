import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={clsx('bg-[hsl(var(--card))]/95 border border-[hsl(var(--accent))] rounded-2xl shadow-xl p-6 transition-transform duration-200 hover:shadow-2xl hover:scale-[1.025]', className)}>
    {children}
  </div>
);

export default Card; 