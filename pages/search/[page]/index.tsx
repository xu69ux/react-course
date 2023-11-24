import React from 'react';
import { GetServerSidePropsContext } from 'next'
import { APIResponse, Philosopher } from '@/types/types';
import { SearchInput, SearchList, Pagination, Limitation } from '@components/index';

import styles from '@styles/SearchPage.module.css';
import { ErrorBoundaryButton } from '@components/index';

export default function SearchPage({ total, results, limit, page }: { total: number, results: Philosopher[], limit: number, page: number}) {
  const totalPages = Math.ceil(total / limit);
  
  return (
    <div className={styles.search_page}>
      <SearchInput/>
      <Limitation total={total}/>
      <SearchList results={results} page={page}/>
      <Pagination totalPages={totalPages}/>
      <ErrorBoundaryButton counter={0}/>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pageUrl = context.params?.page as string;
  const pageApi = Number(pageUrl) - 1;
  const limit = Number(context.query.limit) || 10;
  const id = context.query['search.id'];
  const name = context.query['search.name'];

  let res;
  if (id) {
    res = await fetch(`https://belka.romakhin.ru/api/v1/filosofem?${id}`);
  } else if (name) {
    res = await fetch(`https://belka.romakhin.ru/api/v1/filosofem?search.name=${name}&page=${pageApi}&page_size=${limit}`);
  } else {
    res = await fetch(`https://belka.romakhin.ru/api/v1/filosofem?page=${pageApi}&page_size=${limit}`);
  }

  const data = await res.json() as APIResponse;
  return {
    props: {
      total: data.total,
      results: data.results,
      limit,
      page: Number(pageUrl),
    },
  };
}
