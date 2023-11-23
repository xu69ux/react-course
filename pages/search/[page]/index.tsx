import Link from 'next/link';
import { GetServerSidePropsContext } from 'next'
import { APIResponse, Philosopher } from '@/types/types';
import { SearchInput, Pagination, Limitation } from '@components/index';

import styles from '@styles/SearchPage.module.css';

export default function SearchPage({ total, results, limit, page }: { total: number, results: Philosopher[], limit: number, page: number}) {
  const totalPages = Math.ceil(total / limit);
  
  return (
    <div className={styles.search_page}>
      <SearchInput/>
      <Limitation total={total}/>
      {Array.isArray(results) && results.map((philosopher) => (
        <Link className={styles.link} href={`/search/${page}/detail/${philosopher.id}`} key={philosopher.id}>
          <div key={philosopher.id}>
            <span className={styles.id}>{philosopher.id}.</span>
            <span className={styles.name}>{philosopher.name}</span>
          </div>
        </Link>
      ))}
      <Pagination totalPages={totalPages}/>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pageUrl = context.params?.page as string;
  const pageApi = Number(pageUrl) - 1;
  const limit = Number(context.query.limit) || 10;
  const id = context.query['search.id'];
  const name = context.query['search.name'];

  let response;
  if (id) {
    response = await fetch(`https://belka.romakhin.ru/api/v1/filosofem?${id}`);
  } else if (name) {
    response = await fetch(`https://belka.romakhin.ru/api/v1/filosofem?search.name=${name}&page=${pageApi}&page_size=${limit}`);
  } else {
    response = await fetch(`https://belka.romakhin.ru/api/v1/filosofem?page=${pageApi}&page_size=${limit}`);
  }

  const data = await response.json() as APIResponse;
  console.log(data);
  return {
    props: {
      total: data.total,
      results: data.results,
      limit,
      page: Number(pageUrl),
    },
  };
}
