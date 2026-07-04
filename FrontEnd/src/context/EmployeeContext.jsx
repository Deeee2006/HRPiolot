import { createContext, useContext, useState } from 'react';
import { getAllEmployees, getEmployeeById } from '../services/mockData';

const EmployeeContext = createContext(null);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(getAllEmployees());
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const updateEmployee = (employeeId, updatedData) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === employeeId ? { ...emp, ...updatedData } : emp
    ));
    if (selectedEmployee?.id === employeeId) {
      setSelectedEmployee(prev => ({ ...prev, ...updatedData }));
    }
  };

  const addLeaveRequest = (employeeId, leaveRequest) => {
    const newRequest = {
      id: Date.now(),
      ...leaveRequest,
      status: 'pending',
      comments: ''
    };
    updateEmployee(employeeId, {
      leaveRequests: [...(getEmployeeById(employeeId)?.leaveRequests || []), newRequest]
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
      updateSalary
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
};
