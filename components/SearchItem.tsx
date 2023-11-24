import React from 'react';
import Link from 'next/link';
import { Philosopher } from '@/types/types';
import styles from '@styles/SearchItem.module.css';

export function SearchItem({ philosopher, page }: { philosopher: Philosopher, page: number }) {
  return (
    <li className={styles.item}>
      <Link href={`/search/${page}/detail/${philosopher.id}`}>
        <span className={styles.id}>{philosopher.id}.</span>
        <span className={styles.name}> {philosopher.name}</span>
      </Link>
    </li>
  );
};