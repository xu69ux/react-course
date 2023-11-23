import Link from 'next/link';
import { GetServerSidePropsContext } from 'next'
import { APIResponse } from '../../../types';
import Pagination from '../../../components/Pagination';

import styles from '../../../styles/SearchPage.module.css';
import Limitation from '../../../components/Limitation';

export default function SearchPage({ total, results, limit, page }: { total: number, results: any[], limit: number, page: number}) {
  const totalPages = Math.ceil(total / limit);

 return (
    <div className={styles.search_page}>
      <Pagination totalPages={totalPages}/>
      <Limitation/>
      {Array.isArray(results) && results.map((philosopher) => (
        <Link className={styles.link} href={`/search/${page}/detail/${philosopher.id}`} key={philosopher.id}>
          <div key={philosopher.id}>
            <span className={styles.id}>{philosopher.id}</span>
            <span className={styles.name}>{philosopher.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pageUrl = context.params?.page as string;
  const pageApi = Number(pageUrl) - 1;
  const limit = Number(context.query.limit) || 10;


  const response = await fetch(`https://belka.romakhin.ru/api/v1/filosofem?page=${pageApi}&page_size=${limit}`);
  const data = await response.json() as APIResponse;

  return {
    props: {
      total: data.total,
      results: data.results,
      limit,
    },
  };
}

