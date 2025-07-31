import { test, expect } from "@playwright/test";

test.describe("Register Modal from Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/"); // adjust if needed
    await page.getByRole("button", { name: "Sign up" }).click();
  });

  test("should display the registration modal", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Create Account" })).toBeVisible();
    await expect(page.getByPlaceholder("First Name")).toBeVisible();
    await expect(page.getByPlaceholder("Last Name")).toBeVisible();
    await expect(page.getByPlaceholder("Email Address")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(page.getByPlaceholder("Phone Number")).toBeVisible();
  });

  test("should validate empty form submission", async ({ page }) => {
    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page.locator("text=First name is required")).toBeVisible();
    await expect(page.locator("text=Last name is required")).toBeVisible();
    await expect(page.locator("text=Email is required")).toBeVisible();
    await expect(page.locator("text=Password is required")).toBeVisible();
    await expect(page.locator("text=Phone number is required")).toBeVisible();
    await expect(page.locator("text=Please fix the errors below")).toBeVisible();
  });

  test("should show invalid email error", async ({ page }) => {
    await page.getByPlaceholder("Email Address").fill("invalidemail");
    await page.getByPlaceholder("Email Address").blur();
    await expect(page.locator("text=Invalid email address")).toBeVisible();
  });

  test("should show password length error", async ({ page }) => {
    await page.getByPlaceholder("Password").fill("123");
    await page.getByPlaceholder("Password").blur();
    await expect(page.locator("text=Must be at least 6 characters")).toBeVisible();
  });

  test("should show phone number length error", async ({ page }) => {
    await page.getByPlaceholder("Phone Number").fill("12345");
    await page.getByPlaceholder("Phone Number").blur();
    await expect(page.locator("text=Must be at least 10 digits")).toBeVisible();
  });

  test("should enable Create Account button when all inputs are valid", async ({ page }) => {
    await page.getByPlaceholder("First Name").fill("John");
    await page.getByPlaceholder("Last Name").fill("Doe");
    await page.getByPlaceholder("Email Address").fill("john@example.com");
    await page.getByPlaceholder("Password").fill("strongpassword");
    await page.getByPlaceholder("Phone Number").fill("9800000000");

    const button = page.getByRole("button", { name: "Create Account" });
    await expect(button).toBeEnabled();
  });

  test("should close modal when clicking close button (if implemented)", async ({ page }) => {
    const closeButton = page.locator("button[aria-label='Close']");
    const modal = page.locator("text=Create Account");

    if (await closeButton.isVisible()) {
      await closeButton.click();
      await expect(modal).toHaveCount(0);
    }
  });
});
