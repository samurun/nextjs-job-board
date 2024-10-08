import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { cn, formatMoney, isAdmin, relativeDate, toSlug } from '@/lib/utils';
import {
  formatDistance,
  formatDistanceToNowStrict,
  subDays,
  subMilliseconds,
  subSeconds,
  subYears,
} from 'date-fns';
import { UserResource } from '@clerk/types';
import { User } from '@clerk/nextjs/server';

describe('utils', () => {
  describe('cn func', () => {
    test('should handle a single class name', () => {
      expect(cn('btn')).toBe('btn');
    });

    test('should handle multiple class names', () => {
      expect(cn('btn', 'active')).toBe('btn active');
    });

    test('should handle falsy values', () => {
      expect(cn('btn', null, undefined, false)).toBe('btn');
    });

    test('should handle objects with boolean values', () => {
      expect(cn('btn', { active: true, disabled: false })).toBe('btn active');
      expect(cn('btn', { active: false, hidden: true })).toBe('btn hidden');
    });

    test('should handle arrays of class names', () => {
      expect(cn(['btn', 'active'], ['large', false])).toBe('btn active large');
    });

    test('should handle deeply nested arrays', () => {
      expect(cn(['btn', ['active', ['nested'], false]], 'primary')).toBe(
        'btn active nested primary'
      );
    });

    test('should handle arrays with objects and other falsy values', () => {
      expect(
        cn(['btn', { active: true, large: false }, null, undefined, false])
      ).toBe('btn active');
    });

    test('should deduplicate classes', () => {
      expect(cn('text-base', 'text-base', 'font-bold')).toBe(
        'text-base font-bold'
      );
    });

    test('should maintain the order of classes as they appear', () => {
      expect(cn('first', 'second', 'third')).toBe('first second third');
      expect(cn('third', 'second', 'first')).toBe('third second first');
    });

    test('should handle empty input gracefully', () => {
      expect(cn()).toBe('');
    });

    test('should handle non-string inputs', () => {
      expect(cn(123, null, ['array', 456])).toBe('123 array 456');
    });
  });

  describe('formatMoney func', () => {
    test('should correctly format positive amounts', () => {
      expect(formatMoney(1234)).toBe('$1,234.00');
      expect(formatMoney(99.99)).toBe('$99.99');
      expect(formatMoney(1000.5)).toBe('$1,000.50');
    });

    test('should correctly format negative amounts', () => {
      expect(formatMoney(-1234)).toBe('-$1,234.00');
      expect(formatMoney(-99.99)).toBe('-$99.99');
      expect(formatMoney(-1000.5)).toBe('-$1,000.50');
    });

    test('should handle zero', () => {
      expect(formatMoney(0)).toBe('$0.00');
    });

    test('should handle very large numbers', () => {
      expect(formatMoney(1234567890.12)).toBe('$1,234,567,890.12');
    });

    test('should format numbers with many decimal places', () => {
      expect(formatMoney(99.999999)).toBe('$100.00');
      expect(formatMoney(100.555)).toBe('$100.56');
    });

    test('should format very small postive numbers closer to zero', () => {
      expect(formatMoney(0.01)).toBe('$0.01');
      expect(formatMoney(0.001)).toBe('$0.00');
    });

    test('should format very small negative numbers closer to zero', () => {
      expect(formatMoney(-0.01)).toBe('-$0.01');
      expect(formatMoney(-0.001)).toBe('-$0.00');
    });
  });

  describe('relativeDate func', () => {
    test('should return "10 seconds ago" for a date 10 seconds ago', () => {
      expect(relativeDate(subSeconds(new Date(), 10))).toBe('10 seconds ago');
    });

    test('should return "3 days ago" for a date 3 days ago', () => {
      expect(relativeDate(subDays(new Date(), 3))).toBe('3 days ago');
    });

    test('should return "1 year ago" for a date 1 year ago', () => {
      expect(relativeDate(subYears(new Date(), 1))).toBe('1 year ago');
    });
  });

  describe('toSlug func', () => {
    test('should convert a string with spaces to lowercase and replace spaces with hyphens', () => {
      expect(toSlug('Hello World')).toEqual('hello-world');
    });

    test('should remove special characters from the string', () => {
      expect(toSlug('Hello, World!')).toBe('hello-world');
    });

    test('should keep alphanumeric characters and hyphens', () => {
      expect(toSlug('Keep-This_123')).toBe('keep-this_123');
    });

    test('should handle strings with multiple spaces', () => {
      expect(toSlug('  Hello   World  ')).toBe('hello-world');
    });

    test('should return an empty string when given an empty string', () => {
      expect(toSlug('')).toBe('');
    });

    test('should return a slug when the string contains numbers', () => {
      expect(toSlug('Test 123')).toBe('test-123');
    });

    test('should handle strings with underscores and not remove them', () => {
      expect(toSlug('Test_with_underscores')).toBe('test_with_underscores');
    });

    test('should trim leading and trailing spaces', () => {
      expect(toSlug('  trim spaces   ')).toBe('trim-spaces');
    });
  });
});
