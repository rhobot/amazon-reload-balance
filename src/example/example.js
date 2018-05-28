const { AmazonReloadBalance } = require("../");
const { localConfig } = require("../../config/local.json");

(async function main() {
  const amazonReloadBalance = new AmazonReloadBalance();
  const isSignedIn = await amazonReloadBalance.signIn(
    localConfig.email,
    localConfig.password
  );

  if (!isSignedIn) {
    console.error("Signing in failed");
    return;
  }

  if (Array.isArray(localConfig.reloads)) {
    for (const { amount, cardNumber } of localConfig.reloads) {
      const isReloaded = await amazonReloadBalance.reload(amount, cardNumber);

      if (!isReloaded) {
        const amountString = amount.toFixed(2);
        console.error(
          `Unabled to reload $${amountString} with card ending in ${cardNumber}`
        );
      }
    }
  }

  await amazonReloadBalance.signOut();
  await amazonReloadBalance.end();
})();
