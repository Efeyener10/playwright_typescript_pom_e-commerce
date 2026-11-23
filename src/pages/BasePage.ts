import type { Page } from '@playwright/test';
import { Header } from './components/Header';

/**
 * Base class for every page object.
 * - `path` is relative, so `baseURL` in the config decides the environment.
 * - Cookie consent and ads are handled once in the fixtures, not here.
 */
export abstract class BasePage {
  readonly header: Header;

  protected abstract readonly path: string;

  constructor(readonly page: Page) {
    this.header = new Header(page);
  }

  async goTo(): Promise<void> {
    await this.page.goto(this.path);
  }
}
