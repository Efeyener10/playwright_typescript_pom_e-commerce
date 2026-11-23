export type Title = 'Mr' | 'Mrs';

/** Everything the signup form and the createAccount API need for one user. */
export interface User {
  name: string;
  email: string;
  password: string;
  title: Title;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}
