// pages/search/[page]/detail/[id].tsx
import { GetServerSidePropsContext } from 'next';
import { APIResponse, Philosopher } from '../../../../types';

interface DetailPageProps {
  data: Philosopher;
}

export default function DetailPage({ data }: DetailPageProps) {
  return (
    <div>
      <h1>DetailPage</h1>
      <h2>{data.name}</h2>
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