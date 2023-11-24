import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function HomeSearchPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/search/1');
  }, [router]);

  return null;
};