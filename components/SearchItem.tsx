import React from 'react';
import Link from 'next/link';
import { Philosopher } from '@/types/types';
import { useRouter } from 'next/router';

import styles from '@styles/SearchItem.module.css';

export function SearchItem({ philosopher, page }: { philosopher: Philosopher, page: number }) {
  const router = useRouter();
  const { ['search.name']: searchName, limit } = router.query;

  const params = { 
    ...(searchName && { 'search.name': searchName }), 
    ...(limit && { limit }) 
  };

  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return (
    <li className={styles.item}>
      <Link href={`/search/${page}/detail/${philosopher.id}?${queryString}`}>
        <span className={styles.id}>{philosopher.id}.</span>
        <span className={styles.name}> {philosopher.name}</span>
      </Link>
    </li>
  );
};