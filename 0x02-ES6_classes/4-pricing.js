import Currency from './3-currency';

export default class Pricing {
  constructor(amount, currency) {
    this._amount = 0;
    this.currency = null;

    this.amount = amount;
    this.currency = currency;
  }

  get amount() {
    return this._amount;
  }

  set amount(value) {
    if (typeof value === 'number') {
      this._amount = value;
    } else {
      throw new TypeError('Amount must be a number');
    }
  }

  get currency() {
    return this._currency;
  }

  set currency(value) {
    if (!(value instanceof Currency)) {
      this._currency = value;
    } else {
      throw new TypeError('Currency must be an instance of Currency');
    }
  }

  displayFullPrice() {
    return `${this.amount} ${this.currency.name} (${this.currency.code})`;
  }

  static convertPrice(amount, conversionRate) {
    if (typeof amount === 'number' && typeof conversionRate === 'number') {
      return amount * conversionRate;
    } else {
      throw new TypeError('Amount and conversion rate must be numbers');
    }
  }
}
