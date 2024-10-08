import H1 from '@/components/ui/h1';

export default function JobSubmitted() {
  return (
    <main className='m-auto min-h-[calc(100vh-224px)] max-w-5xl flex flex-col items-center justify-center space-y-5 px-3 text-center'>
      <H1>Job submitted</H1>
      <p>Your job posting has been submitted and is pending approval.</p>
    </main>
  );
}
