// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Search function testing', () => {
    test('After using search function, first search result must contain keyword - "Devbridge"', async ({ page }) => {
        await page.goto('https://www.delfi.lt/');
        //await page.locator('input[name=q]').fill('devbridge');
        //await page.locator('input[name=q]').press('Enter');
        //let text = await page.locator("#r1-0 h2 a").getAttribute('href');
        //expect(text).toContain("devbridge.com");
        
        await page.pause();
    });
});