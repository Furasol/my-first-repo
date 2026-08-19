export class CheckoutCompletePage {
  constructor(page) {
    this.page = page;

    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.buttonBackToProducts = page.locator('[data-test="back-to-products"]');
  }

  getCompletionMessage() {
    return this.completeHeader;
  }

  async getBackToProducts() {
    await this.buttonBackToProducts.click();
  }
}
