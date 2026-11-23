import { expect, type APIRequestContext, type APIResponse } from '@playwright/test';
import type { User } from '@data/types';

const TRANSIENT = [502, 503, 504];
const MAX_RETRIES = 2;

/** Shape shared by every response of the site's API. */
export interface ApiBody {
  responseCode: number;
  message?: string;
  [key: string]: unknown;
}

/**
 * Thin typed client for https://automationexercise.com/api_list.
 *
 * Gotcha: the API always answers HTTP 200. The real status is the
 * `responseCode` field inside the JSON body, so callers must assert on that.
 */
export class AutomationExerciseApi {
  constructor(private readonly request: APIRequestContext) {}

  async getProducts(): Promise<ApiBody> {
    return this.send(() => this.request.get('/api/productsList'));
  }

  async getBrands(): Promise<ApiBody> {
    return this.send(() => this.request.get('/api/brandsList'));
  }

  async searchProduct(term: string): Promise<ApiBody> {
    return this.send(() => this.request.post('/api/searchProduct', { form: { search_product: term } }));
  }

  async createAccount(user: User): Promise<ApiBody> {
    return this.send(() =>
      this.request.post('/api/createAccount', {
        form: {
          name: user.name,
          email: user.email,
          password: user.password,
          title: user.title,
          birth_date: user.birthDay,
          birth_month: user.birthMonth,
          birth_year: user.birthYear,
          firstname: user.firstName,
          lastname: user.lastName,
          company: user.company,
          address1: user.address1,
          address2: user.address2,
          country: user.country,
          zipcode: user.zipcode,
          state: user.state,
          city: user.city,
          mobile_number: user.mobileNumber,
        },
      }),
    );
  }

  async deleteAccount(email: string, password: string): Promise<ApiBody> {
    return this.send(() => this.request.delete('/api/deleteAccount', { form: { email, password } }));
  }

  async verifyLogin(email: string, password: string): Promise<ApiBody> {
    return this.send(() => this.request.post('/api/verifyLogin', { form: { email, password } }));
  }

  async getUserByEmail(email: string): Promise<ApiBody> {
    return this.send(() => this.request.get('/api/getUserDetailByEmail', { params: { email } }));
  }

  /** Creates the account and fails fast if the API did not accept it. */
  async registerUser(user: User): Promise<void> {
    const body = await this.createAccount(user);
    expect(body.responseCode, `createAccount failed: ${body.message}`).toBe(201);
  }

  /**
   * Sends a request, retrying only on gateway/overload errors (502/503/504).
   * The public demo site returns 503 now and then under load; a real bug
   * (4xx, wrong body) still fails immediately.
   */
  private async send(request: () => Promise<APIResponse>): Promise<ApiBody> {
    let response = await request();
    for (let attempt = 1; attempt <= MAX_RETRIES && TRANSIENT.includes(response.status()); attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
      response = await request();
    }
    return this.parse(response);
  }

  private async parse(response: APIResponse): Promise<ApiBody> {
    expect(response.ok(), `HTTP ${response.status()} from ${response.url()}`).toBe(true);
    // The server sends JSON with a text/html content type, so parse the text ourselves.
    return JSON.parse(await response.text()) as ApiBody;
  }
}
