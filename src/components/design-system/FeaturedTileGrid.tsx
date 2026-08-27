import type { ReactNode } from 'react';
import styles from './FeaturedTileGrid.module.css';

export function FeaturedTileGrid({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`${styles.grid} grid gap-4 md:grid-cols-2 lg:grid-cols-3 ${className}`}>{children}</div>;
}
