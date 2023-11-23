import { useRouter } from 'next/router';
import { useRef } from 'react';

import styles from '@styles/SearchInput.module.css';

export function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const page = Number(router.query.page) || 1;

  const handleSearch = () => {
    const savedInputValue = localStorage.setItem('savedInputValue', inputRef.current?.value || '');
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      router.push({
        pathname: '/search/[page]',
        query: { 'search.name': inputValue }
      }, 
      `/search/${page}?search.name=${inputValue}`);
    }
  };

  const handleClearSearch = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('savedInputValue');
    }
    inputRef.current!.value = '';
    router.push({
      pathname: '/search/[page]',
    }, 
    `/search/${page}`);
  };

  return (
    <div>
      <button 
        className={styles.btn_clear} 
        onClick={handleClearSearch}>&#10005;</button>
      <input
        className={styles.input} 
        type="text" 
        ref={inputRef}
        placeholder="enter a philosophical name"
        defaultValue={typeof window !== 'undefined' ? localStorage.getItem('savedInputValue') || '' : ''}
      />
      <button 
      className={styles.btn} 
      onClick={handleSearch}>search</button>
    </div>
  );
}