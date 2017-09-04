import Nightmare from 'nightmare'

const urls = {
  homepage: 'https://www.amazon.com',
  reloadOrder: 'https://www.amazon.com/asv/reload/order'
}

export default class AmazonReloadBalance {
  static validateSignInInputs(email, password) {
    if (!email) {
      console.error('email is a required param')
      return false
    }

    if (!password) {
      console.error('param is a required param')
      return false
    }

    return true
  }

  constructor() {
    this.nightmare = Nightmare({show: true})
  }

  async signIn(email, password, cb = () => {}) {
    const areInputsValid = AmazonReloadBalance.validateSignInInputs(email, password)

    if (!areInputsValid) {
      cb({error: 'input validation failed'})
      return
    }

    try {
      await this.nightmare
        .goto(urls.homepage)
        .click('[data-nav-ref=nav_custrec_signin]')
        .type('input[type=email]', email)
        .type('input[type=password]', password)
        .click('#signInSubmit')
        .goto(urls.reloadOrder)
        .end()
    } catch (e) {
      // TODO: Handle error
    }

    cb(null)
  }
}
