import { ReactNode } from 'react';

import styles from '@styles/MainLayout.module.css';

export function MainLayout({ children }: { children: ReactNode }) {
  return <div className={styles.main_layout}>{children}</div>;
};

