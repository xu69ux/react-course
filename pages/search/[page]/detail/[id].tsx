import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { Philosopher, APIResponse } from '@/types/types';
import { useRouter } from 'next/router';
import { Button, SearchInput, Limitation, SearchList, Pagination, ErrorBoundaryButton } from '@components/index';

import styles from '@styles/Details.module.css';

interface DetailPageProps {
  data: Philosopher;
  results: Philosopher[];
  total: number;
  totalPages: number;
}

export default function DetailPage({ data, results, total, totalPages }: DetailPageProps) {
  const router = useRouter();
  const page = Number(router.query.page) || 1;

  const closeDetailHandler = () => {
    const { ['search.name']: searchName, limit } = router.query;
  
    const params = { 
      ...(searchName && { 'search.name': searchName }),   
      ...(limit && { limit }) 
    };
  
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  
    router.push({
      pathname: '/search/[page]',
      query: params,
    }, 
    `/search/${page}?${queryString}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.search_page}>
        <SearchInput/>
        <Limitation total={total}/>
        <SearchList results={results} page={page}/>
        <Pagination totalPages={totalPages}/>
        <ErrorBoundaryButton counter={0}/>
      </div>
      <div className={styles.details_page}>
        <Button 
            data-testid="btn_close"
            className={styles.btn_close} 
            onClick={closeDetailHandler} 
            text="&#10005;"/>
        <h1 className={styles.title}>details:</h1>
        <div className={styles.content}>
          <div className={styles.data}>name: {data.name}</div>
          <div className={styles.data}>born: {data.birth_year}</div>
          <div className={styles.data}>died: {data.death_year}</div>
          <div className={styles.data}>idea: {data.idea}</div>
          <div className={styles.data}>famous work: {data.famous_work}</div>
        </div>
      </div>
    </div>

  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params?.id as string;
  const pageUrl = context.query.page as string;
  const pageApi = Number(pageUrl) - 1;
  const limit = Number(context.query.limit) || 10;
  const name = context.query['search.name'];

  let url = `https://belka.romakhin.ru/api/v1/filosofem?page=${pageApi}&page_size=${limit}`;

  if (name) {
    url += `&search.name=${name}`;
  }

  const [data, dataSearch] = await Promise.all([
    fetch(`https://belka.romakhin.ru/api/v1/filosofem/${id}`).then((res) => res.json()),
    fetch(url).then((res) => res.json()),
  ]);
  return {
    props: {
      data,
      total: dataSearch.total,
      results: dataSearch.results,
      totalPages: Math.ceil(dataSearch.total / Number(limit)),
    },
  };
}

