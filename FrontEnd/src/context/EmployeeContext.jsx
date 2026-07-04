import { createContext, useContext, useState, useCallback } from 'react';
import { getAllEmployees } from '../services/mockData';

const EmployeeContext = createContext(null);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(getAllEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const getEmployeeById = useCallback((id) => {
    return employees.find(emp => emp.id === id);
  }, [employees]);

  const updateEmployee = (employeeId, updatedData) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === employeeId ? { ...emp, ...updatedData } : emp
    ));
    if (selectedEmployee?.id === employeeId) {
      setSelectedEmployee(prev => ({ ...prev, ...updatedData }));
    }
  };

  const addLeaveRequest = (employeeId, leaveRequest) => {
    const employee = getEmployeeById(employeeId);
    if (!employee) return;
    const newRequest = {
      id: Date.now(),
      ...leaveRequest,
      status: 'pending',
      comments: ''
    };
    updateEmployee(employeeId, {
      leaveRequests: [...(employee.leaveRequests || []), newRequest]
    });
  };

  const updateLeaveStatus = (employeeId, leaveId, status, comments) => {
    const employee = getEmployeeById(employeeId);
    if (employee) {
      const updatedLeaveRequests = employee.leaveRequests.map(req =>
        req.id === leaveId ? { ...req, status, comments } : req
      );
      updateEmployee(employeeId, { leaveRequests: updatedLeaveRequests });
    }
  };

  const addAttendance = (employeeId, attendance) => {
    const employee = getEmployeeById(employeeId);
    if (employee) {
      const existingIndex = employee.attendance.findIndex(att => att.date === attendance.date);
      let updatedAttendance;
      
      if (existingIndex >= 0) {
        updatedAttendance = [...employee.attendance];
        updatedAttendance[existingIndex] = attendance;
      } else {
        updatedAttendance = [...employee.attendance, attendance];
      }
      
      updateEmployee(employeeId, { attendance: updatedAttendance });
    }
  };

  const updateSalary = (employeeId, newSalary) => {
    updateEmployee(employeeId, { salary: newSalary });
  };

  return (
    <EmployeeContext.Provider value={{
      employees,
      selectedEmployee,
      setSelectedEmployee,
      updateEmployee,
      addLeaveRequest,
      updateLeaveStatus,
      addAttendance,
      updateSalary,
      getEmployeeById
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
};
