export const containerService = {
  async getAvailableContainers() {
    return [
      { id: 'CNT-101', name: 'Stainless Steel Lunchbox (Large)', canteen: 'Central Campus Canteen', stock: 42, status: 'Available', deposit: '₹50' },
      { id: 'CNT-102', name: 'Insulated Thermal Soup Bowl', canteen: 'North Block Cafeteria', stock: 15, status: 'Available', deposit: '₹50' },
      { id: 'CNT-103', name: 'Stainless Steel Tumbler (500ml)', canteen: 'Library Snack Kiosk', stock: 68, status: 'Available', deposit: '₹30' },
      { id: 'CNT-104', name: 'Bento Compartment Box', canteen: 'Central Campus Canteen', stock: 3, status: 'Low Stock', deposit: '₹50' }
    ];
  },

  async borrowContainer(containerId, canteen) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const borrowedItem = {
      id: containerId,
      name: containerId === 'CNT-102' ? 'Insulated Thermal Soup Bowl' : 'Stainless Steel Lunchbox (Large)',
      canteen: canteen,
      borrowDate: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dueDate: 'Within 48 hours',
      deposit: '₹50',
      status: 'Active'
    };
    const existing = JSON.parse(localStorage.getItem('pfc_borrowed') || '[]');
    localStorage.setItem('pfc_borrowed', JSON.stringify([borrowedItem, ...existing]));
    return { success: true, message: `Container ${containerId} borrowed successfully.` };
  },

  async returnContainer(containerId) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const existing = JSON.parse(localStorage.getItem('pfc_borrowed') || '[]');
    const updated = existing.filter(item => item.id !== containerId);
    localStorage.setItem('pfc_borrowed', JSON.stringify(updated));
    return { success: true, message: `Container ${containerId} returned. Deposit refunded & points awarded.` };
  }
};