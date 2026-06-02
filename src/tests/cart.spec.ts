import { test, expect } from "@playwright/test";

async function addFirstProductToCart(page: import("@playwright/test").Page) {
  await page.goto("/");
  await expect(page.getByTestId("loading-spinner")).toBeHidden({ timeout: 30000 });
  await page.getByTestId(/^view-details-/).first().click();
  await page.getByTestId("add-to-cart-btn").click();
}

test.describe("Cart page", () => {
  test("cart page renders", async ({ page }) => {
    await addFirstProductToCart(page);
    await page.getByTestId("cart-link").click();
    await expect(page.getByTestId("cart-page")).toBeVisible();
    await expect(page.getByTestId("checkout-btn")).toBeVisible();
  });

  test("quantity updates", async ({ page }) => {
    await addFirstProductToCart(page);
    await page.getByTestId("cart-link").click();

    const increaseBtn = page.getByTestId(/^increase-qty-/).first();
    const qtyLocator = page.getByTestId(/^cart-qty-/).first();

    await expect(qtyLocator).toHaveText("1");
    await increaseBtn.click();
    await expect(qtyLocator).toHaveText("2");
    await expect(page.getByTestId("cart-total-items")).toHaveText("2");
  });

  test("remove item works", async ({ page }) => {
    await addFirstProductToCart(page);
    await page.getByTestId("cart-link").click();

    await page.getByTestId(/^remove-item-/).first().click();
    await expect(page.getByTestId("empty-cart")).toBeVisible();
  });
});
