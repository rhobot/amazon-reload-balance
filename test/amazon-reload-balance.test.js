import {AmazonReloadBalance} from '../dist';

test('Sign-in input validation', () => {
  const areNoInputsValid = AmazonReloadBalance.validateSignInInputs(null, null);
  expect(areNoInputsValid).toBe(false);

  const isNoEmailValid = AmazonReloadBalance.validateSignInInputs(null, 'password');
  expect(isNoEmailValid).toBe(false);

  const isNoPasswordValid = AmazonReloadBalance.validateSignInInputs('email', null);
  expect(isNoPasswordValid).toBe(false);

  const areInputsValid = AmazonReloadBalance.validateSignInInputs('email', 'password');
  expect(areInputsValid).toBe(true);
});
