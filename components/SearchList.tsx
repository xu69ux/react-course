import React from 'react';
import { Philosopher } from '@/types/types';
import { SearchItem } from '@components/index';
import styles from '@styles/SearchList.module.css';


interface SearchListProps {
  results: Philosopher[];
  page: number;
}

export function SearchList({ results, page }: SearchListProps) {
  const renderResults = ({ results, page }: SearchListProps) => {
    return (
      <>
      <h2 className={styles.title}>search results:</h2>
      <ul className={styles.list} data-testid="search-list">
        {Array.isArray(results) && results.map((philosopher) => (
            <SearchItem key={philosopher.id} philosopher={philosopher} page={page}/>
        ))}
      </ul>
      </>
    );
  };
  const renderNoResults = () => {
    return (
      <>
        <h2 className={styles.title}>no search results:</h2>
        <div className={styles.no_result}>
          sorry, your request looks bad, please try again with correct name
        </div>
      </>
    );
  };
  if (results.length === 0) {
    return renderNoResults();
  } else {
    return renderResults({ results, page });
  }
}


