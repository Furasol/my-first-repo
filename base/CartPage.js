export class CartPage {
  constructor(page) {
    this.page = page;

    this.inventoryItem = page.locator('[data-test="inventory-item"]');
    this.buttonCheckout = page.locator('[data-test="checkout"]');
    this.buttonContinueShopping = page.locator(
      '[data-test="continue-shopping"]',
    );
  }

  getCartItems() {
    return this.inventoryItem;
  }

  async goToCheckout() {
    await this.buttonCheckout.click();
  }
}
