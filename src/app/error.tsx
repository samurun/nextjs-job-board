'use client';

import H1 from '@/components/ui/h1';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error);
  return (
    <main className='m-auto my-10 max-w-5xl space-y-5 px-3 text-center'>
      <H1>Error</H1>
      <p>{error.message || `An unexpected error occurred`}</p>
    </main>
  );
}
