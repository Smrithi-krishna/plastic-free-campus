export const authService = {
  async loginStudent(credentials) {
    // Simulated authentication response
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      token: 'demo-student-token-' + Date.now(),
      user: {
        id: credentials.studentId,
        name: 'Alex Johnson',
        email: `${credentials.studentId.toLowerCase()}@student.edu`,
        role: 'student',
        points: 450,
        walletBalance: 120.00
      }
    };
  },

  async registerStudent(studentData) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      token: 'demo-student-token-' + Date.now(),
      user: {
        id: studentData.studentId,
        name: studentData.fullName,
        email: studentData.email,
        role: 'student',
        points: 50, // Onboarding bonus
        walletBalance: 0.00
      }
    };
  },

  async loginStaff(credentials) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      token: 'demo-staff-token-' + Date.now(),
      user: {
        id: credentials.staffId,
        name: 'Manager Sarah',
        location: 'Central Campus Canteen',
        role: 'staff'
      }
    };
  },

  async logout() {
    localStorage.removeItem('pfc_user');
    localStorage.removeItem('pfc_token');
    return true;
  }
};