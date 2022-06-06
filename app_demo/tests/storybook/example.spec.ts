import { test, expect } from '@playwright/test';
import{ VisualRegressionTools } from "../common/VisualRegressionTools"

const storybookUrl =
  "http://localhost:6006/iframe.html";

let vr_tools;

test.beforeAll(async () => {
  vr_tools = new VisualRegressionTools(test);
  await vr_tools.startVRT();
});
test.afterAll(async () => {
  await vr_tools.stopVRT()
});

test.describe('New Button Test', () => {
  test('Should check that button has a Hello value', async ({ page }) => {

    const componentUrlParams =
      "?id=example-button--primary&args=label:Hello&viewMode=story";

    await page.goto(storybookUrl + componentUrlParams);

    await expect(page.locator('.storybook-button')).toHaveText("Hello");

    await vr_tools.checkElement(await page.$(".storybook-button"), "Super Hello Button", 0.1);

  });
});
