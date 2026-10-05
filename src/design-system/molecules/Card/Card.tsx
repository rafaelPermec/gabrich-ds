'use client';
import React from 'react';
import styles from './Card.module.css';

export type CardVariant = 'content' | 'icon' | 'project' | 'data' | 'value';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  label?: string;
  title?: string;
  body?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageAspect?: '4/3' | '4/5';
  icon?: React.ReactNode;
  stat?: string;
  statLabel?: string;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  dark?: boolean;
}

export function Card({
  variant = 'content',
  label,
  title,
  body,
  imageSrc,
  imageAlt = '',
  imageAspect = '4/3',
  icon,
  stat,
  statLabel,
  action,
  footer,
  dark = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        styles.card,
        styles[`variant-${variant}`],
        dark ? styles.dark : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {/* Project card: image on top */}
      {variant === 'project' && imageSrc && (
        <div className={styles.imageWrapper} style={{ aspectRatio: imageAspect }}>
          <img src={imageSrc} alt={imageAlt} className={styles.image} />
        </div>
      )}

      <div className={styles.body}>
        {/* Label or Icon */}
        {variant === 'icon' && icon ? (
          <span className={styles.icon}>{icon}</span>
        ) : label ? (
          <span className={styles.label}>{label}</span>
        ) : null}

        {/* Data/Stat card */}
        {variant === 'data' && stat && (
          <span className={styles.stat}>{stat}</span>
        )}

        {title && <p className={styles.title}>{title}</p>}
        {body && <p className={styles.bodyText}>{body}</p>}
        {children}
        {statLabel && <p className={styles.statLabel}>{statLabel}</p>}

        {/* Value card action */}
        {(variant === 'value' || footer || action) && (
          <div className={styles.footer}>{footer ?? action}</div>
        )}
      </div>
    </div>
  );
}
