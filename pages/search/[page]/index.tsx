import Link from 'next/link';
import { GetServerSidePropsContext } from 'next'
import { APIResponse } from '../../../types';
import { useRouter } from 'next/router';
import Pagination from '../../../components/Pagination';
import Limitation from '../../../components/Limitation';
import SearchInput from '../../../components/SearchInput';

import styles from '../../../styles/SearchPage.module.css';

export default function SearchPage({ total, results, limit }: { total: number, results: any[], limit: number}) {
  const router = useRouter();
  const page = router.query.page;

 return (
    <div className={styles.search_page}>
      <SearchInput />
      <Pagination total={total} limit={limit} />
      <Limitation />
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
  const page = context.params?.page as string;
  let limit = context.query.limit as string;

  if (!limit) {
    limit = '10';
  }

  const response = await fetch(`https://belka.romakhin.ru/api/v1/filosofem?page=${page}&limit=${limit}`);
  const data = await response.json() as APIResponse;

  return {
    props: {
      total: data.total,
      results: data.results,
      page: Number(page),
      limit: Number(limit),
    },
  };
}

