import React from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

import styles from '@styles/Pagination.module.css'

export function Pagination({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;
  
  const handlePageChange = (pageNumber: number) => {
    const query = { ...router.query, page: String(pageNumber) };
    router.push({
      pathname: router.pathname,
      query,
    });
  };

  return (
    <div className={styles.pagination}>
      <button 
        className={currentPage === 1 ? styles.btn_disbl : styles.btn} 
        onClick={() => handlePageChange(currentPage - 1)}
      >&lt;</button>
      <span>page {currentPage} of {totalPages}</span>
      <button 
        className={currentPage === totalPages ? styles.btn_disbl : styles.btn}
        onClick={() => handlePageChange(currentPage + 1)}
      >&gt;</button>
    </div>
  );
};
