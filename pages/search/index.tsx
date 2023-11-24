import { redirect } from "next/navigation";

export default async function HomeSearchPage() {
  redirect('/search/1');
  return null;
};