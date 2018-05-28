const Nightmare = require("nightmare");

const urls = {
  homepage: "https://www.amazon.com",
  reloadOrder: "https://www.amazon.com/asv/reload/order"
};

module.exports = class AmazonReloadBalance {
  static validateSignInInputs(email, password) {
    if (!email) {
      console.error("email must be specified");
      return false;
    }

    if (!password) {
      console.error("password must be specified");
      return false;
    }

    return true;
  }

  static validateReloadInputs(amount, cardNumber) {
    if (!amount) {
      console.error("amount must be specified");
      return false;
    }

    if (!cardNumber) {
      console.error("last 4 digits of the card must be specified");
      return false;
    }

    // TODO: Add thorough validations

    return true;
  }

  constructor() {
    this.nightmare = Nightmare({
      show: true,
      waitTimeout: 10000
    });
  }

  async signIn(email, password) {
    const areInputsValid = AmazonReloadBalance.validateSignInInputs(
      email,
      password
    );

    if (!areInputsValid) {
      return false;
    }

    try {
      await this.nightmare
        .goto(urls.homepage)
        .click("[data-nav-ref=nav_custrec_signin]")
        .type("input[type=email]", email)
        .type("input[type=password]", password)
        .click("#signInSubmit")
        .wait("#nav-link-accountList");
    } catch (e) {
      console.error(e);
      return false;
    }

    return true;
  }

  async signOut() {
    // TODO: Implement
    console.log("signOut() not implemented");
    this.nightmare.end();
  }

  async end() {
    // TODO: Implement
    try {
      await this.nightmare.end();
    } catch (e) {
      console.error(e);
    }
  }

  async reload(amount, cardNumber) {
    const areInputsValid = AmazonReloadBalance.validateReloadInputs(
      amount,
      cardNumber
    );

    if (!areInputsValid) {
      return false;
    }

    try {
      const last4DigitCardNumbers = await this.getLast4DigitCardNumbers();

      if (!last4DigitCardNumbers.length) {
        throw new Error("Unable to find cerdit/debit card numbers");
      }

      const last4Digits = cardNumber.substr(cardNumber.length - 4);
      const elementOffset = 2;
      const last4DigitIndex =
        last4DigitCardNumbers.indexOf(last4Digits) + elementOffset;
      const cardRowSelector = `.pmts-credit-cards > .a-section.a-spacing-none:nth-of-type(${last4DigitIndex})`;
      const cardNumberInputSelector = `${cardRowSelector} input.a-input-text`;
      const cardNumberConfirmButtonSelector = `${cardRowSelector} button`;
      const doneButtonSelector = "#asv-form-submit";
      const amountInputSelector = "#asv-manual-reload-amount";
      const reloadButtonSelector = "#form-submit-button";

      const reloadButtonText = await this.nightmare
        .click(cardRowSelector)
        .click("#asv-form-submit")
        .wait(cardNumberInputSelector)
        .type(cardNumberInputSelector, cardNumber)
        .click(cardNumberConfirmButtonSelector)
        .wait(1000)
        .click(doneButtonSelector)
        .wait(amountInputSelector)
        .evaluate(
          amountInputSelector =>
            (document.querySelector(amountInputSelector).value = ""),
          amountInputSelector
        )
        .type(amountInputSelector, amount.toFixed(2))
        .evaluate(
          reloadButtonSelector =>
            document.querySelector(reloadButtonSelector).innerText,
          reloadButtonSelector
        );

      if (!reloadButtonText.includes(`Reload $${amount.toFixed(2)}`)) {
        throw new Error(
          `Reload button text is different from expected. To be safe, aborting. Actual text: ${reloadButtonText}`
        );
      }

      await this.nightmare.click(reloadButtonSelector).wait(".a-alert-success");
    } catch (e) {
      console.error(e);
      return false;
    }

    return true;
  }

  async getLast4DigitCardNumbers() {
    try {
      const last4DigitCardNumbers = await this.nightmare
        .goto(urls.reloadOrder)
        .click("#asv-payment-edit-link")
        .wait(".pmts-instrument-acct-number-tail")
        .evaluate(() => {
          const last4DigitCardNumberElements = document.querySelectorAll(
            ".pmts-instrument-acct-number-tail"
          );
          const last4DigitCardNumberList = Array.prototype.slice.call(
            last4DigitCardNumberElements
          );

          return last4DigitCardNumberList.map(c => c.innerText);
        });

      if (!last4DigitCardNumbers || !last4DigitCardNumbers.length) {
        throw new Error("Unable to find cerdit/debit card numbers");
      }

      return last4DigitCardNumbers;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
};
