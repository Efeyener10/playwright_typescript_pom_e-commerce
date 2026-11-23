import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  protected readonly path = '/';
  readonly slider: Locator;
  readonly featuredItems: Locator;

  constructor(page: Page) {
    super(page);
    this.slider = page.locator('#slider');
    this.featuredItems = page.getByRole('heading', { name: 'Features Items' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL('/');
    await expect(this.slider).toBeVisible();
    await expect(this.featuredItems).toBeVisible();
  }
}
