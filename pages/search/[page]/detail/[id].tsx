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
  console.log(totalPages);
  const closeDetailHandler = () => {
    router.push({
      pathname: '/search/[page]',
    }, 
    `/search/${page}`);
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

  const res = await fetch(`https://belka.romakhin.ru/api/v1/filosofem/${id}`);
  const data: Philosopher = await res.json();

  const resSearch = await fetch(`https://belka.romakhin.ru/api/v1/filosofem?page=${pageApi}&page_size=${limit}`);
  const dataSearch = await resSearch.json() as APIResponse;
  console.log(dataSearch);

  return {
    props: {
      data,
      total: dataSearch.total,
      results: dataSearch.results,
      totalPages: Math.ceil(dataSearch.total / Number(limit)),
    },
  };
}

