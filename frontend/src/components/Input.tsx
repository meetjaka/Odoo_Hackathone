import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, className, ...props }) => (
  <div>
    {label && <label className="block mb-1 text-sm font-medium">{label}</label>}
    <input
      className={clsx(
        'w-full px-4 py-2 rounded-lg bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] focus:outline-none focus:ring-2 focus:ring-primary',
        className
      )}
      {...props}
    />
  </div>
);

export default Input; 