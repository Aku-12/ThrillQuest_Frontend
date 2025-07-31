import { test, expect } from "@playwright/test";

test.describe("Login Modal from Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/"); // adjust if your homepage route is different
    await page.getByRole("button", { name: "Log in" }).click();
  });

  test("should display the login modal", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Welcome Back" })).toBeVisible();
  });

  test("should validate empty form submission", async ({ page }) => {
    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page.locator("text=Email is required")).toBeVisible();
    await expect(page.locator("text=Password is required")).toBeVisible();
    await expect(page.locator("text=Please fix the errors below")).toBeVisible();
  });

  test("should validate short password", async ({ page }) => {
    await page.getByPlaceholder("Enter your email").fill("user@example.com");
    await page.getByPlaceholder("Enter your password").fill("123");
    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page.locator("text=Password must be at least 6 characters")).toBeVisible();
  });


  test("should check 'Remember me' checkbox", async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"][name="rememberMe"]');
    await expect(checkbox).not.toBeChecked();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });

  test("should close modal when 'X' or outside is clicked (if implemented)", async ({ page }) => {
    // Modify this if your modal supports clicking outside or has a close button
    const modal = page.locator('[data-testid="login-modal"]'); // use this only if you add data-testid
    const closeButton = page.locator('button[aria-label="Close"]'); // example

    if (await closeButton.isVisible()) {
      await closeButton.click();
      await expect(modal).toBeHidden();
    }
  });

  test("should enable Sign In button when inputs are valid", async ({ page }) => {
    await page.getByPlaceholder("Enter your email").fill("user@example.com");
    await page.getByPlaceholder("Enter your password").fill("securepassword");

    const button = page.getByRole("button", { name: "Sign In" });
    await expect(button).toBeEnabled();
  });

});
