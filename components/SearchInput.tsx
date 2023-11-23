import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue, setResults } from '../redux/sliceSearch';

import styles from '../styles/SearchInput.module.css';

export default function SearchInput() {
  const dispatch = useDispatch();
  const [localSearchValue, setLocalSearchValue] = useState('');

  useEffect(() => {
    const storedSearchValue = localStorage.getItem('searchValue');
    if (storedSearchValue) {
      setLocalSearchValue(storedSearchValue);
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(event.target.value);
  };

  const handleSearchClick = async () => {
    localStorage.setItem('searchValue', localSearchValue);
    dispatch(setSearchValue(localSearchValue));
    const response = await fetch(`https://belka.romakhin.ru/api/v1/filosofem?search.name=${localSearchValue}`);
    const data = await response.json();
    dispatch(setResults(data));
  };

  const handleSearchClear = () => {
    localStorage.removeItem('searchValue');
    dispatch(setSearchValue(''));
    setLocalSearchValue('');
  };

  return (
    <div>
      <button className={styles.btn_clear} onClick={handleSearchClear}>x</button>
      <input className={styles.input} type="text" placeholder="enter a philosophical name" value={localSearchValue} onChange={handleInputChange} />
      <button className={styles.btn} onClick={handleSearchClick}>Search</button>
    </div>
  );
}