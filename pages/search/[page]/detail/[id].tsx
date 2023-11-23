import { GetServerSidePropsContext } from 'next';
import { Philosopher } from '@/types/types';
import { useRouter } from 'next/router';

import styles from '@styles/Details.module.css';
import { Button } from '@components/Button';

interface DetailPageProps {
  data: Philosopher;
}

export default function DetailPage({ data }: DetailPageProps) {
  const router = useRouter();
  const page = Number(router.query.page) || 1;

  const closeDetailHandler = () => {
    router.push({
      pathname: '/search/[page]',
    }, 
    `/search/${page}`);
  };

  return (
    <div className={styles.details_page}>
      <Button className={styles.btn_close} onClick={closeDetailHandler} text="&#10005;"/>
      <h1 className={styles.title}>details:</h1>
      <div className={styles.content}>
        <div className={styles.data}>name: {data.name}</div>
        <div className={styles.data}>born: {data.birth_year}</div>
        <div className={styles.data}>died: {data.death_year}</div>
        <div className={styles.data}>idea: {data.idea}</div>
        <div className={styles.data}>famous work: {data.famous_work}</div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params?.id as string;
  const response = await fetch(`https://belka.romakhin.ru/api/v1/filosofem/${id}`);
  const data: Philosopher = await response.json();

  return {
    props: {
      data,
    },
  };
}

