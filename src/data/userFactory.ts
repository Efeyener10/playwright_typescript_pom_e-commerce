import { randomUUID } from 'node:crypto';
import type { User } from './types';

/**
 * Builds a user with a unique email, so tests never collide with each other,
 * with parallel workers, or with leftovers from an earlier failed run.
 * Pass overrides for the fields a test cares about.
 */
export function buildUser(overrides: Partial<User> = {}): User {
  const id = randomUUID().slice(0, 8);
  return {
    name: `qa-${id}`,
    email: `qa.${Date.now()}.${id}@example.com`,
    password: `Pw-${randomUUID()}`,
    title: 'Mr',
    birthDay: '15',
    birthMonth: '6',
    birthYear: '1995',
    firstName: 'Test',
    lastName: 'User',
    company: 'QA Corp',
    address1: 'Katze Strasse 22',
    address2: 'Apt 1',
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    zipcode: 'M5V 2T6',
    mobileNumber: '+15550100100',
    ...overrides,
  };
}
