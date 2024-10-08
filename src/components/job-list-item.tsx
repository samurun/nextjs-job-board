import { Job } from '@prisma/client';
import { Banknote, Briefcase, Clock, Globe2, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { formatMoney, relativeDate } from '@/lib/utils';

export default function JobListItem({
  title,
  type,
  locationType,
  location,
  salary,
  companyName,
  companyLogoUrl,
  createdAt,
}: Job) {
  return (
    <article className='flex gap-3 border rounded p-5 hover:bg-muted/60'>
      <Image
        width={100}
        height={100}
        src={companyLogoUrl || './placeholder.svg'}
        className='self-center rounded-sm'
        alt={companyName}
      />
      <div className='flex-grow space-y-2'>
        <div>
          <h2 className='text-lg font-semibold'>{title}</h2>
          <p className='text-muted-foreground'>{companyName}</p>
        </div>
        <div className='text-muted-foreground text-sm'>
          <p className='flex items-center gap-1.5 sm:hidden'>
            <Briefcase size={16} className='shrink-0' />
            {type}
          </p>
          <p className='flex items-center gap-1.5'>
            <MapPin size={16} className='shrink-0' />
            {locationType}
          </p>
          <p className='flex items-center gap-1.5'>
            <Globe2 size={16} className='shrink-0' />
            {location || 'Worldwide'}
          </p>
          <p className='flex items-center gap-1.5'>
            <Banknote size={16} className='shrink-0' />
            {formatMoney(salary)}
          </p>
          <p className='flex items-center gap-1.5 sm:hidden'>
            <Clock size={16} className='shrink-0' />
            {relativeDate(createdAt)}
          </p>
        </div>
      </div>
      <div className='hidden shrink-0 flex-col items-end justify-between sm:flex'>
        <Badge className='rounded border bg-muted text-muted-foreground hover:bg-muted text-xs font-medium'>
          {type}
        </Badge>
        <span className='flex items-center gap-1.5 text-muted-foreground'>
          <Clock size={16} />
          {relativeDate(createdAt)}
        </span>
      </div>
    </article>
  );
}
