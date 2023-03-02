import { type Browser, firefox } from 'playwright';

import { OTS_SHARE_URL, checkUp } from './configs';

jest.setTimeout(40 * 1000);

describe('Example.com', () => {
  let browser: Browser;

  beforeAll(async () => {
    await checkUp();
    browser = await firefox.launch({ headless: true });
  });

  afterAll(async () => {
    await browser.close();
  });

  describe('Text based secret', () => {
    it('Title', async () => {
      const page = await browser.newPage();
      await page.goto(`${OTS_SHARE_URL}/text`);
      const title = await page.title();
      await expect(title).toEqual('Create One-time secret share - for a text');
    });

    it('Create text', async () => {
      const page = await browser.newPage();
      await page.goto(`${OTS_SHARE_URL}/text`);

      await page.locator('#content').fill('test string is here');
      await page.click('#submitTextContent');
      const text = await page.locator('#createdUrl').inputValue();

      expect(text).toMatch(new RegExp(`^${OTS_SHARE_URL}/r`));
    });

    it('View secret', async () => {
      const secretText = 'test string is here';

      const page = await browser.newPage();
      await page.goto(`${OTS_SHARE_URL}/text`);

      await page.locator('#content').fill(secretText);
      await page.click('#submitTextContent');
      const text = await page.locator('#createdUrl').inputValue();

      const pageReveal = await browser.newPage();
      await pageReveal.goto(text);
      await pageReveal.click('#fetchContentButton');
      const content = await pageReveal.locator('#content').allTextContents();
      expect(secretText).toBe(content[0]);
    });
  });
});
