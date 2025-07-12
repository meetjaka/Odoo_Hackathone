import React from 'react';
import clsx from 'clsx';

// Add 'as' and 'to' to the props
type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  as?: React.ElementType;
  to?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-[hsl(var(--primary-foreground))] shadow-md hover:shadow-lg hover:brightness-110 hover:scale-105',
  secondary:
    'bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] shadow hover:bg-[hsl(var(--secondary))]/80 hover:shadow-md hover:scale-105',
  outline:
    'border border-[hsl(var(--accent))] bg-transparent hover:bg-[hsl(var(--accent))]/20 hover:shadow-md hover:scale-105',
  ghost:
    'bg-transparent hover:bg-[hsl(var(--accent))]/20 hover:shadow-md hover:scale-105',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  as: Component = 'button',
  ...props
}) => {
  return (
    <Component
      className={clsx(
        'px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button; 