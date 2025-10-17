import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'error' | 'warning';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className,
}) => {
  const variantStyles = {
    default: 'bg-gray-200 text-black',
    success: 'bg-success text-white',
    error: 'bg-error text-white',
    warning: 'bg-warning text-black',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-xs font-bold border-2 border-black',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
