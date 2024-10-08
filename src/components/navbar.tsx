import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';

export default function Navbar() {
  return (
    <header className='shadow-sm border-b sticky top-0 bg-background/40 backdrop-blur'>
      <nav className='m-auto flex max-w-5xl items-center justify-between px-3 py-5'>
        <Link href={'/'} className='font-bold'>
          Flow Jobs
        </Link>
        <Link href='/jobs/new' className={cn(buttonVariants())}>
          Post a job
        </Link>
      </nav>
    </header>
  );
}
