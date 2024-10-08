import H1 from '@/components/ui/h1';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import JobListItem from '@/components/job-list-item';
export default async function Admin() {
  const unapprovedJobs = await prisma.job.findMany({
    where: { approved: false },
  });
  return (
    <div className=' my-10 '>
      <H1 className='text-center'>Admin Dashboard</H1>
      <section className='flex flex-col gap-3 mt-4'>
        <h2 className='text-lg font-bold'>Unapproved jobs:</h2>
        {unapprovedJobs.map((job) => (
          <Link key={job.id} href={`/admin/jobs/${job.slug}`} className='block'>
            <JobListItem {...job} />
          </Link>
        ))}
        {unapprovedJobs.length === 0 && (
          <p className='text-muted-foreground'>No unapproved jobs</p>
        )}
      </section>
    </div>
  );
}
