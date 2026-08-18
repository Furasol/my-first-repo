export class CheckoutStepTwoPage {
  constructor(page) {
    this.page = page;

    this.paymentInfo = page.locator('[data-test="payment-info-value"]');
    this.shippingInfo = page.locator('[data-test="shipping-info-value"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.buttonFinish = page.locator('[data-test="finish"]');
  }

  async finishCheckout() {
    await this.buttonFinish.click();
  }
}
