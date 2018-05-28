# Amazon Reload Balance

Reload your Amazon's account balance with your credit/debit cards in Node.

![amazon-reload-balance](https://user-images.githubusercontent.com/872220/30046500-0d8b20d4-91c0-11e7-914b-331ab410e5ec.gif)

## Usage

```js
const { AmazonReloadBalance } = require("amazon-reload-balance");

const amazonReloadBalance = new AmazonReloadBalance();
const isSignedIn = await amazonReloadBalance.signIn("username", "password");

if (!isSignedIn) {
  console.error("Signing-in failed!");
  return;
}

// The credit/debit card you would like to use should be already registered on your Amazon account.
// Minimum amount is 0.50
await amazonReloadBalance.reload(20.00, "card number 1");
await amazonReloadBalance.reload(15.75, "card number 2");

await amazonReloadBalance.signOut();
```

For running the example:

1.  create `/config/local.json` and fill out values like this:

```json
{
  "email": "your email on Amazon",
  "password": "your password",
  "reloads": [
    { "amount": 0.5, "cardNumber": "123456789012" },
    { "amount": 1.25, "cardNumber": "777777777777" }
  ]
}
```

## Requirements

Intended to be run on Node 7.6.0 or higher as this module requires Nightmare & async/await.

## FAQ

### Why did you build this?

I've been optimizing the micro management of my life and one of them is periodically
using ~20 of my unused credit cards to prevent them from being closed. Otherwise, it would negatively affect my credit score.
But still I wanted to pay little amounts with my unused credit cards.

I found that you can reload your Amazon balance as low as 50 cents,
so I've been reloading it with all of my unused credit cards each month.
I wanted to automate this to simplify this tedious work.

## Caveat

Amazon doesn't officially provide API for reloading Amazon balances. In order to support this module, I'm using Nightmare.
This means that if an Amazon web page used in this module is modified, reloading Amazon balance with this may not work.

If you find that this module doesn't work, file a new issue.

## License

[WTFPL](http://www.wtfpl.net)
