export class InventoryPage {
  constructor(page) {
    this.page = page;

    this.title = page.locator('[data-test="title"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.inventoryItem = page.locator('[data-test="inventory-item"]');
    this.buttonInventory = page.locator(".btn_inventory");
  }

  async addItemToCart(itemName) {
    await this.inventoryItem
      .filter({ hasText: itemName })
      .locator(".btn_inventory")
      .click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  getPageTitle() {
    return this.title;
  }
}
