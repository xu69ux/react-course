import React from "react";
import { useRouter } from 'next/router';

import styles from '@styles/Limitation.module.css'

export function Limitation({total}: {total: number}) {

  const router = useRouter();
  const limit = Number(router.query.limit) || 10;


  const handleLimitChange = (newLimit: number) => {
    const query = { ...router.query, limit: String(newLimit), page: String(1) };
    router.push({
      pathname: router.pathname,
      query,
    });
  };

  return (
    <div className={styles.limitation} data-testid="limitation">
      <button 
        className={limit === 1 ? styles.btn_disbl : styles.btn} 
        onClick={() => handleLimitChange(limit - 1)}
      >-</button>
      <span>{limit} per page</span>
      <button 
        className={limit === total ? styles.btn_disbl : styles.btn} 
        onClick={() => handleLimitChange(limit + 1)}
        >+</button>
    </div>
  )
};