import { jobTypes } from '@/lib/job-types';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import prisma from '@/lib/prisma';
import FormSubmitButton from './form-submit-button';
import { jobFilterSchema, JobFilterValues } from '@/lib/validations';
import { redirect } from 'next/navigation';

async function filterJobs(formData: FormData) {
  'use server';

  const values = Object.fromEntries(formData.entries());

  const { q, type, location, remote } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type === 'all' ? '' : { type }),
    ...(location === 'all' ? '' : { location }),
    ...(remote && { remote: 'true' }),
  });

  redirect(`/?${searchParams.toString()}`);
}

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
}

export default async function JobFitlerSidebar({
  defaultValues,
}: JobFilterSidebarProps) {
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ['location'],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean)
    )) as string[];

  return (
    <aside className='sticky top-28 h-fit rounded border bg-background p-4 md:w-[260px]'>
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className='space-y-4'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='1'>Search</Label>
            <Input
              id='q'
              name='q'
              defaultValue={defaultValues.q}
              placeholder='Title, company, etc.'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='type'>Type</Label>
            <Select name='type' defaultValue={defaultValues.type || 'all'}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a type' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='all'>All types</SelectItem>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className='flex flex-col gap-2'>
            <Label htmlFor='location'>Location</Label>
            <Select name='location' defaultValue={defaultValues.type || 'all'}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a location' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='all'>All locations</SelectItem>
                  {distinctLocations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <input
              id='remote'
              name='remote'
              type='checkbox'
              className='scale-125 accent-black'
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor='remote'>Remote jobs</Label>
          </div>
          <FormSubmitButton className='w-full'>Filter jobs</FormSubmitButton>
        </div>
      </form>
    </aside>
  );
}
