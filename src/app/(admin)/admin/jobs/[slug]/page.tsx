import JobPage from '@/components/job-detail';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import AdminSidebar from '../../../components/admin-sidebar';

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const job = await prisma.job.findUnique({ where: { slug } });

  if (!job) notFound();

  return (
    <div className='m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start'>
      <JobPage job={job} />
      <AdminSidebar job={job} />
    </div>
  );
}
