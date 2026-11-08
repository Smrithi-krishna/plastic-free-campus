export const notificationService = {
  async getNotifications() {
    return [
      { id: 1, title: 'Return Reminder', desc: 'Your container CNT-101 is due for return in 36 hours.', time: '2 hours ago', unread: true },
      { id: 2, title: 'Deposit Refunded', desc: '₹50 refunded to your wallet for container CNT-103.', time: 'Yesterday', unread: false },
      { id: 3, title: 'Green Points Earned', desc: '+50 points added for your on-time return.', time: '2 days ago', unread: false }
    ];
  }
};