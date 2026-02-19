import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'salesman' | 'marketing' | 'rnd' | 'supervisor' | 'admin' | null;

interface UserContextType {
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<Role>(() => {
    return (localStorage.getItem('userRole') as Role) || null;
  });

  useEffect(() => {
    if (role) {
      localStorage.setItem('userRole', role);
    } else {
      localStorage.removeItem('userRole');
    }
  }, [role]);

  const login = (newRole: Role) => setRole(newRole);
  const logout = () => setRole(null);

  return (
    <UserContext.Provider value={{ role, login, logout, isAuthenticated: !!role }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
