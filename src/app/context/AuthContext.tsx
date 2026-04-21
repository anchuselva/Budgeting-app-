import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: { username: string; password: string; name: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<Map<string, { password: string; name: string }>>(new Map());

  const login = async (username: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const storedUser = users.get(username);
    if (storedUser && storedUser.password === password) {
      setUser({ id: Date.now().toString(), username, name: storedUser.name });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (data: { username: string; password: string; name: string }) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    if (users.has(data.username)) {
      throw new Error('Username already exists');
    }

    users.set(data.username, { password: data.password, name: data.name });
    setUsers(new Map(users));
    setUser({ id: Date.now().toString(), username: data.username, name: data.name });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
