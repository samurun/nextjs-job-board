import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNowStrict } from 'date-fns';
import { User } from '@clerk/nextjs/server';
import { UserResource } from '@clerk/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function relativeDate(form: Date): string {
  return formatDistanceToNowStrict(form, { addSuffix: true });
}

export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export function isAdmin(user: UserResource | User) {
  return user.publicMetadata?.role === 'admin';
}
