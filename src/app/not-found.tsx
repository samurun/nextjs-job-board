import H1 from '@/components/ui/h1';

export default function notFound() {
  return (
    <main className='m-auto max-w-5xl space-y-5 px-3 text-center flex flex-col items-center justify-center min-h-[calc(100vh-224px)]'>
      <H1>Not Found</H1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </main>
  );
}
