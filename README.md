# Work in progress

--------

# Amazon Reload Balance

Reload your Amazon's account balance with your credit/debit cards.

## Usage

```js
import {AmazonReloadBalance} from 'amazon-reload-balance';

const amazonReloadBalance = new AmazonReloadBalance();
await amazonReloadBalance.signIn('username', 'password');

// The credit card you would like to use should be already registered on your Amazon account.
// Minimum amount is 0.50
await amazonReloadBalance.reload(20.00, 'last 4 digits of your card number');
await amazonReloadBalance.reload(15.75, 'last 4 digits of your card number');

await amazonReloadBalance.signOut();
```

For running the example:

1. create `/config/local.json` and fill out values like this:

```json
{
  "email": "your email on Amazon",
  "password": "your password"
}
```


## Requirements

Intended to be run on Node 4.x or higher as a requirement of Nightmare.

## Why did you build this?

Sometimes you want to automate reloading Amazon balance :)

In addition, I wanted to try out Nightmare, Vue, Jest, and no semicolons.

## License

[WTFPL](http://www.wtfpl.net)
