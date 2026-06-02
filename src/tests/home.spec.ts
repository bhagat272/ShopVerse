import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("home page loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Discover Amazing Deals/i })).toBeVisible();
  });

  test("products render", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("loading-spinner")).toBeHidden({ timeout: 30000 });
    const grid = page.getByTestId("products-grid");
    await expect(grid).toBeVisible({ timeout: 30000 });
    await expect(grid.locator("article").first()).toBeVisible();
  });

  test("product detail page opens", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("loading-spinner")).toBeHidden({ timeout: 30000 });
    await page.getByTestId(/^view-details-/).first().click();
    await expect(page.getByTestId("product-detail")).toBeVisible();
    await expect(page.getByTestId("add-to-cart-btn")).toBeVisible();
  });

  test("add to cart works", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("loading-spinner")).toBeHidden({ timeout: 30000 });
    await page.getByTestId(/^view-details-/).first().click();
    await page.getByTestId("add-to-cart-btn").click();
    await expect(page.getByTestId("cart-link")).toContainText("Cart (1)");
    await expect(page.getByTestId("footer-item-count")).toContainText("Items: 1");
  });
});
