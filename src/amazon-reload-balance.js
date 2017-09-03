export default class AmazonReloadBalance {
  static validateSignInInputs(email, password) {
    if (!email) {
      console.error('email is a required param');
      return false;
    }

    if (!password) {
      console.error('param is a required param');
      return false;
    }

    return true;
  }

  signIn(email, password) {
    const areInputsValid = this.validateSignInInputs(email, password);

    if (!areInputsValid) {
      return false;
    }

    console.log('not implemented yet');
    console.log(email, password);
  }
}
