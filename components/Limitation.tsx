import { useRouter } from 'next/router';
import styles from '../styles/Limitation.module.css'

export default function Limitation() {

  const router = useRouter();
  const limit = Number(router.query.limit) || 10;


  const handleLimitChange = (newLimit: number) => {
    const query = { ...router.query, limit: newLimit };
    router.push({
      pathname: router.pathname,
      query,
    });
  };

  return (
    <div className={styles.limitation}>
      <button className={styles.btn} onClick={() => handleLimitChange(limit - 1)}>-</button>
      <span>{limit} per page</span>
      <button className={styles.btn} onClick={() => handleLimitChange(limit + 1)}>+</button>
    </div>
  )
};