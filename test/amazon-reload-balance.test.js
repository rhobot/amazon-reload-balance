import {AmazonReloadBalance} from '../dist';

describe('Sign-in input validation', () => {
  test('no input', () => {
    const isValid = AmazonReloadBalance.validateSignInInputs(null, null);
    expect(isValid).toBe(false);
  })

  test('no email', () => {
    const isValid = AmazonReloadBalance.validateSignInInputs(null, 'password');
    expect(isValid).toBe(false);
  });

  test('no password', () => {
    const isValid = AmazonReloadBalance.validateSignInInputs('email', null);
    expect(isValid).toBe(false);
  });

  test('both email and password filled out', () => {
    const isValid = AmazonReloadBalance.validateSignInInputs('email', 'password');
    expect(isValid).toBe(true);
  });
});
