import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setLimit, selectLimit } from '../redux/sliceSearch';

import styles from '../styles/Limitation.module.css'

export default function LimitSelector() {
  const dispatch = useDispatch();
  const router = useRouter();
  const limit = useSelector(selectLimit);

  const handleIncrease = () => {
    const newLimit = limit + 10;
    dispatch(setLimit(newLimit));
    router.push(`/search/1?limit=${newLimit}`);
  };

  const handleDecrease = () => {
    if (limit > 10) {
      const newLimit = limit - 10;
      dispatch(setLimit(newLimit));
      router.push(`/search/1?limit=${newLimit}`);
    }
  };

  return (
    <div className={styles.limitation}>
      <button className={styles.btn} onClick={handleDecrease}>-</button>
      <span>{limit} per page</span>
      <button className={styles.btn} onClick={handleIncrease}>+</button>
    </div>
  );
}