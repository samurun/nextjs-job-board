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
    .trim() // Trim leading and trailing spaces
    .replace(/\s+/g, '-') // Replace multiple spaces with a single hyphen
    .replace(/[^\w-]+/g, ''); // Remove all non-alphanumeric characters except hyphens
}

export function isAdmin(user: UserResource | User) {
  return user.publicMetadata?.role === 'admin';
}
