import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  className,
  showLabel = false,
}) => {
  const percentage = Math.min(100, (value / max) * 100);

  return (
    <div className={cn('w-full', className)}>
      <div className="w-full h-4 border-2 border-black bg-white">
        <div
          className="h-full bg-black transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-sm text-gray-600 text-right">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};
