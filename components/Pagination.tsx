import { useSelector, useDispatch } from 'react-redux';
import { setPage, selectPage } from '../redux/sliceSearch';
import { useRouter } from 'next/router';

import styles from '../styles/Pagination.module.css'

interface PaginationProps {
  total: number;
  limit: number;
}

export default function Pagination({ total, limit }: PaginationProps) {
  const dispatch = useDispatch();
  const page = useSelector(selectPage) || 1;
  const totalPages = Math.ceil(total / limit) || 1;
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
    router.push(`/search/${newPage}`);
  };

  return (
    <div className={styles.pagination}>
      <button className={page === 1 ? styles.btn : styles.btn_disabled} onClick={() => handlePageChange(page - 1)}>&lt;</button>
      <span>page {page} of {totalPages}</span>
      <button className={page === totalPages ? styles.btn_disable : styles.btn} onClick={() => handlePageChange(page + 1)}>&gt;</button>
    </div>
  );
}