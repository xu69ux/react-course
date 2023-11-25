import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

import styles from '@styles/Home.module.css'

export default function HomePage() {
  return (
    <>
    <Head>
      <title>Search Philosopher App</title>
    </Head>
      <main className={styles.main}>
        <h1>Search Philosopher App</h1>
        <Image className={styles.logo} width={150} height={150} src="/philosophy.svg" alt="logo" />
        <Link className={styles.link} href="search/1">let&apos;s search!</Link>
      </main>
    </>
  )
}
