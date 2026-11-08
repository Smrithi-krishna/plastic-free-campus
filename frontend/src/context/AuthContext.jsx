import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pfc_user');
    return saved ? JSON.parse(saved) : null;
  });

  const loginStudent = (studentData) => {
    const sessionData = { ...studentData, role: 'student', token: 'demo-student-token-' + Date.now() };
    setUser(sessionData);
    localStorage.setItem('pfc_user', JSON.stringify(sessionData));
    return sessionData;
  };

  const loginStaff = (staffData) => {
    const sessionData = { ...staffData, role: 'staff', token: 'demo-staff-token-' + Date.now() };
    setUser(sessionData);
    localStorage.setItem('pfc_user', JSON.stringify(sessionData));
    return sessionData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pfc_user');
  };

  return (
    <AuthContext.Provider value={{ user, loginStudent, loginStaff, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}