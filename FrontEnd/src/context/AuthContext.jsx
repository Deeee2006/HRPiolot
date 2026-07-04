import { createContext, useContext, useState, useEffect } from 'react';
import { authenticateUser, getAllEmployees } from '../services/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('hrpilot_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const authenticatedUser = authenticateUser(email, password);
    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('hrpilot_user', JSON.stringify(authenticatedUser));
      return { success: true, user: authenticatedUser };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = (employeeId, email, password, role) => {
    const employees = getAllEmployees();
    const existingEmployee = employees.find(emp => emp.email === email || emp.id === employeeId);
    
    if (existingEmployee) {
      return { success: false, error: 'Employee ID or Email already exists' };
    }

    const newUser = {
      id: employeeId,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      password,
      role,
      department: 'General',
      position: 'New Employee',
      salary: 0,
      joinDate: new Date().toISOString().split('T')[0],
      phone: '',
      address: '',
      avatar: null,
      documents: [],
      attendance: [],
      leaveRequests: []
    };

    setUser(newUser);
    localStorage.setItem('hrpilot_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hrpilot_user');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
