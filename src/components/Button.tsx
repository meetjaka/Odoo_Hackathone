import React from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary:
    'bg-secondary text-[hsl(var(--foreground))] hover:bg-secondary/80',
  outline:
    'border border-[hsl(var(--border))] bg-transparent hover:bg-accent',
  ghost:
    'bg-transparent hover:bg-accent',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 