'use client';
import { Job } from '@prisma/client';
import ApproveSubmissionButton from './approve-submission-button';
import DeleteJobButton from './delete-job-button';

export default function AdminSidebar({ job }: { job: Job }) {
  return (
    <aside className='flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch'>
      {job.approved ? (
        <span className='text-center font-semibold text-green-500'>
          Approved
        </span>
      ) : (
        <ApproveSubmissionButton jobId={job.id} />
      )}
      <DeleteJobButton jobId={job.id} />
    </aside>
  );
}
