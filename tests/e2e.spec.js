import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";

test("Успешный логин и проверка страницы товаров @ui", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  await loginPage.open();
  await loginPage.login("standard_user", "secret_sauce");

  const pageTitle = await inventoryPage.getPageTitle();
  await expect(pageTitle).toHaveText("Products");

  await page
    .locator('[data-test="product-sort-container"]')
    .selectOption("hilo");
  const mostExpensiveItemName = await page
    .locator('[data-test="inventory-item-name"]')
    .first()
    .textContent();
  await inventoryPage.addItemToCart(mostExpensiveItemName);
  await inventoryPage.openCart();

  const toHaveItem = await cartPage.getCartItems();
  await expect(toHaveItem).toContainText(mostExpensiveItemName);
  await cartPage.goToCheckout();

  await checkoutStepOnePage.fillUserInfo("Test", "User", "12345");
  await checkoutStepOnePage.clickContinue();

  await checkoutStepTwoPage.finishCheckout();

  await expect(checkoutCompletePage.getCompletionMessage()).toHaveText(
    "Thank you for your order!",
  );
  await checkoutCompletePage.getBackToProducts();

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});
