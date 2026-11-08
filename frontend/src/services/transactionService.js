export const transactionService = {
  async getTransactions() {
    return [
      { id: 'TXN-901', title: 'Container Return Refund', type: 'Credit', amount: '+₹50.00', date: 'Yesterday, 2:15 PM', status: 'Completed', canteen: 'Central Canteen' },
      { id: 'TXN-902', title: 'Container Borrow Deposit Hold', type: 'Debit', amount: '-₹50.00', date: 'Today, 12:30 PM', status: 'Active', canteen: 'Central Canteen' },
      { id: 'TXN-895', title: 'Wallet Top-Up via UPI', type: 'Credit', amount: '+₹200.00', date: '3 days ago', status: 'Completed', canteen: 'Digital Wallet' }
    ];
  }
};