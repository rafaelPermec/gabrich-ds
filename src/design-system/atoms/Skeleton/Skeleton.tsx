'use client';
import React from 'react';
import styles from './Skeleton.module.css';

export type SkeletonShape = 'rect' | 'circle';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  shape?: SkeletonShape;
  className?: string;
}

export function Skeleton({ width = '100%', height = 16, shape = 'rect', className }: SkeletonProps) {
  return (
    <span
      className={[styles.skeleton, styles[`shape-${shape}`], className].filter(Boolean).join(' ')}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
