import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import styles from '@styles/Home.module.css'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Search Philosopher App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <main className={styles.main}>
        <h1>Search Philosopher App</h1>
        <Image className={styles.logo} width={150} height={150} src="/philosophy.svg" alt="logo" />
        <Link className={styles.link} href="search/1">let&apos;s search!</Link>
      </main>
    </>
  )
}
