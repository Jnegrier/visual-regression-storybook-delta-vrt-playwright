import { test, expect } from '@playwright/test';
import{ VisualRegressionTools } from "../common/VisualRegressionTools"

let vr_tools;

test.beforeAll(async () => {
  vr_tools = new VisualRegressionTools(test);
  await vr_tools.startVRT();
});
test.afterAll(async () => {
  await vr_tools.stopVRT()
});

test.describe('Default React Project Test', () => {
  test('Should check React default page', async ({ page }) => {

    await page.goto("http://localhost:3000/");

    await expect(page.locator('.App-header p')).toHaveText("Edit src/App.tsx and save to reload.");

    await vr_tools.checkPage(await page, "React default page", 0.1);

  });
});
