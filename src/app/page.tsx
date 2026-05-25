import { redirect } from 'next/navigation';

export default function Home() {
  // By default, redirect the root to the customer view
  redirect('/customer');
}
