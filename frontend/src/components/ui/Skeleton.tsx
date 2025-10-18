import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200',
        className
      )}
    />
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="border-2 border-black p-4">
      <Skeleton className="h-6 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
};

export const ChallengeSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-7xl mx-auto">
        <Skeleton className="h-10 w-64 mb-4" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <CardSkeleton />
          </div>
          <div>
            <Skeleton className="h-96 w-full border-2 border-black" />
          </div>
        </div>
      </div>
    </div>
  );
};
