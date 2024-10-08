import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function AdminNavbar() {
  return (
    <header className='shadow-sm border-b sticky top-0 bg-background/40 backdrop-blur'>
      <div className='container'>
        <nav className='m-auto flex items-center justify-between h-14 '>
          <Link href={'/admin'} className='font-bold'>
            Admin
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </div>
    </header>
  );
}
