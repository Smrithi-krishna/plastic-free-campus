export const rewardsService = {
  async getRewards() {
    return [
      { id: 1, name: 'Eco-Friendly Campus Hoodie', cost: 350, stock: 12, category: 'Merchandise' },
      { id: 2, name: 'Stainless Steel Water Bottle', cost: 250, stock: 25, category: 'Accessories' },
      { id: 3, name: 'Central Canteen ₹50 Food Voucher', cost: 100, stock: 150, category: 'Vouchers' },
      { id: 4, name: 'Organic Cotton Tote Bag', cost: 150, stock: 40, category: 'Accessories' }
    ];
  },

  async redeemReward(rewardId, currentPoints) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      remainingPoints: currentPoints - 50,
      message: 'Reward successfully redeemed!'
    };
  }
};