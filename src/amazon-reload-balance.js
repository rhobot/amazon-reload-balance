import Nightmare from 'nightmare'

const urls = {
  homepage: 'https://www.amazon.com',
  reloadOrder: 'https://www.amazon.com/asv/reload/order'
}

export default class AmazonReloadBalance {
  static validateSignInInputs(email, password) {
    if (!email) {
      console.error('email must be specified')
      return false
    }

    if (!password) {
      console.error('password must be specified')
      return false
    }

    return true
  }

  static validateReloadInputs(amount, cardLast4Digits) {
    if (!amount) {
      console.error('amount must be specified')
      return false
    }

    if (!cardLast4Digits) {
      console.error('last 4 digits of the card must be specified')
      return false
    }

    // TODO: Add thorough validations

    return true
  }

  constructor() {
    this.nightmare = Nightmare({
      show: true,
      waitTimeout: 5000
    })
  }

  async signIn(email, password) {
    const areInputsValid = AmazonReloadBalance.validateSignInInputs(email, password)

    if (!areInputsValid) {
      return false
    }

    try {
      await this.nightmare
        .goto(urls.homepage)
        .click('[data-nav-ref=nav_custrec_signin]')
        .type('input[type=email]', email)
        .type('input[type=password]', password)
        .click('#signInSubmit')
        .wait('#nav-link-accountList')
    } catch (e) {
      console.error(e)
      return false
    }

    return true
  }

  async signOut() {
    // TODO: Implement
    console.log('signOut() not implemented')
  }

  async end() {
    // TODO: Implement
    try {
      await this.nightmare.end()
    } catch (e) {
      console.error(e)
    }
  }

  async reload(amount, cardLast4Digits) {
    const areInputsValid = AmazonReloadBalance.validateReloadInputs(amount, cardLast4Digits)

    if (!areInputsValid) {
      return false
    }

    try {
      await this.nightmare
        .goto(urls.reloadOrder)
    } catch (e) {
      console.error(e)
      return false
    }

    return true
  }
}
