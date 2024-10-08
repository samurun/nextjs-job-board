import H1 from '@/components/ui/h1';
import JobFitlerSidebar from '@/components/jsob-filter-sidebar';
import { JobFilterValues } from '@/lib/validations';
import JobResults from '@/components/job-results';
import { Metadata } from 'next';

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
  };
}

function getTitle({ q, type, location, remote }: JobFilterValues) {
  const titlePrefix = q
    ? `${q} jobs`
    : type
      ? `${type} developer jobs`
      : location
        ? `${location} developer jobs`
        : remote
          ? `Remote developer jobs`
          : 'All developer jobs';

  const titleSuffix = location ? ` in ${location}` : '';

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({
  searchParams: { q, type, location, remote },
}: PageProps): Metadata {
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === 'true',
    })} | Flow Jobs`,
  };
}

export default async function Home({
  searchParams: { q, type, location, remote, page },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === 'true',
  };

  return (
    <main className='m-auto my-10 max-w-5xl space-y-10 px-3'>
      <div className='space-y-5 text-center'>
        <H1>{getTitle(filterValues)}</H1>
        <p className='text-muted-foreground'>Find your dream job.</p>
      </div>
      <section className='flex flex-col gap-4 md:flex-row'>
        <JobFitlerSidebar defaultValues={filterValues} />
        <JobResults
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </main>
  );
}
