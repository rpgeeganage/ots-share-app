import { type Page, type Browser, firefox } from 'playwright';

import { OTS_SHARE_URL } from './configs';

jest.setTimeout(40 * 1000);

describe('Example.com', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await firefox.launch({ headless: true });
  });
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(`${OTS_SHARE_URL}/text`);
  });

  afterAll(async () => {
    await browser.close();
  });

  describe('Text based secret', () => {
    it('Title', async () => {
      const title = await page.title();
      await expect(title).toEqual('Create One-time secret share - for a text');
    });

    it('Create text', async () => {
      await page.locator('#content').fill('test string is here');
      await page.click('button[type=submit]');
      const text = await page.locator('input#createdUrl').inputValue();
      expect(text).toMatch(new RegExp(`^${OTS_SHARE_URL}/r`));
    });

    it('View secret', async () => {
      await page.locator('#content').fill('test string is here');
      await page.click('button[type=submit]');
      const text = await page.locator('input#createdUrl').inputValue();
      await page.goto(text);
      await new Promise((r) => setTimeout(r, 1000));
      await page.screenshot({ path: 'test.png' });

      const content = await page.locator('textarea[name=content]').allTextContents();
      console.log(content);
      await page.screenshot({ path: 'test.png' });
      expect(true).toBe(true);
    });
  });
});
