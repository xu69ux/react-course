import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import SearchPage from "../pages/search/[page]";
import DetailPage from "../pages/search/[page]/detail/[id]";
import { GetServerSidePropsContext } from "next";

import styles from "../styles/MainLayout.module.css";


interface APIResponse {
  results: Philosopher[];
  total: number;
}

export interface Philosopher {
  birth_year: number;
  death_year: number;
  famous_work: string;
  id: number;
  ideas: string;
  name: string;
}

export default function MainLayout( { children }: { children: React.ReactNode }) {
  const router = useRouter();
  const showDetailPage = router.asPath.includes('detail');
  const data = null;
  

  return (
    <div className={styles.main_layout}>
      <SearchPage />
      {showDetailPage && <DetailPage />}
    </div>
  );
}
