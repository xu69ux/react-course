import React from "react";
import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react';
import { Button } from '.';
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
    `/search/1`);
  };

  useEffect(() => {
    const savedInputValue = typeof window !== 'undefined' ? localStorage.getItem('savedInputValue') : '';
    if (savedInputValue && savedInputValue !== '') {
      router.push({
        pathname: '/search/[page]',
        query: { 'search.name': savedInputValue }
      }, 
      `/search/${page}?search.name=${savedInputValue}`);
    }
  }, []);

  return (
    <div className={styles.container} data-testid="search-input">
      <Button
        className={styles.btn_clear}
        onClick={handleClearSearch}
        text="&#10005;"
      />
      <input
        className={styles.input} 
        type="text" 
        ref={inputRef}
        placeholder="enter a philosophical name"
        defaultValue={typeof window !== 'undefined' ? localStorage.getItem('savedInputValue') || '' : ''}
      />
      <Button
        className={styles.btn}
        onClick={handleSearch}
        text="search"
      />
    </div>
  );
}