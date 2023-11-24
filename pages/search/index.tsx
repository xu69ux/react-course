import { redirect } from "next/navigation";

export default async function Home() {
  redirect('/search/1');
  return null;
};