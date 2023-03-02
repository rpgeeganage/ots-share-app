import * as fs from 'node:fs';

import { type Browser, firefox } from 'playwright';

import { OTS_SHARE_URL } from './configs';

const filePath = './sample_artifacts/favicon.ico';

jest.setTimeout(40 * 1000);

describe('Example.com', () => {
  let browser: Browser;

  beforeAll(async () => {
    browser = await firefox.launch({ headless: true });
  });

  afterAll(async () => {
    await browser.close();
  });

  describe('File based secret', () => {
    it('Title', async () => {
      const page = await browser.newPage();
      await page.goto(`${OTS_SHARE_URL}/file`);
      const title = await page.title();
      await expect(title).toEqual('Create One-time secret share - for a small file');
    });

    it('Create file based secret', async () => {
      const page = await browser.newPage();
      await page.goto(`${OTS_SHARE_URL}/file`);

      await page.setInputFiles('input[type="file"]', filePath);
      await page.click('#submitFileContent');
      const text = await page.locator('#createdUrl').inputValue();

      expect(text).toMatch(new RegExp(`^${OTS_SHARE_URL}/r`));
    });

    it('View secret', async () => {
      const page = await browser.newPage();
      await page.goto(`${OTS_SHARE_URL}/file`);

      await page.setInputFiles('input[type="file"]', filePath);
      await page.click('#submitFileContent');
      const text = await page.locator('#createdUrl').inputValue();

      const pageReveal = await browser.newPage();
      await pageReveal.goto(text);
      await pageReveal.click('#fetchContentButton');

      const downloadPromise = pageReveal.waitForEvent('download');
      await pageReveal.click('#downloadFile');
      const download = await downloadPromise;
      const savedPath = `/tmp/${Date.now()}`;
      await download.saveAs(savedPath);
      expect(fs.readFileSync(filePath)).toEqual(fs.readFileSync(savedPath));
    });
  });
});
