export const walletService = {
  async getWalletDetails() {
    return {
      balance: 120.00,
      heldDeposits: 50.00,
      activeCheckouts: 1
    };
  },

  async topUpWallet(amount) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      newBalance: 120.00 + Number(amount),
      message: `Successfully added ₹${Number(amount).toFixed(2)} to your wallet.`
    };
  }
};