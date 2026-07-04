import React, { useState } from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Badge from '../../components/Badge';
import { FaDollarSign, FaEdit, FaSave, FaTimes, FaChartLine, FaUsers } from 'react-icons/fa';

const AdminPayroll = () => {
  const { employees, updateSalary } = useEmployee();
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (employee) => {
    setEditingId(employee.id);
    setEditValue(employee.salary.toString());
  };

  const handleSave = (employeeId) => {
    updateSalary(employeeId, parseFloat(editValue));
    setEditingId(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const totalPayroll = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const avgSalary = Math.round(totalPayroll / employees.length);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-purple-800">Payroll Management</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white shadow-[0_4px_12px_rgba(147,51,234,0.3)]">
              <FaDollarSign size={24} />
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">Total Payroll</p>
              <p className="text-2xl font-bold text-purple-800">${(totalPayroll / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white shadow-[0_4px_12px_rgba(34,197,94,0.3)]">
              <FaChartLine size={24} />
            </div>
            <div>
              <p className="text-sm text-green-600 font-medium">Average Salary</p>
              <p className="text-2xl font-bold text-green-800">${avgSalary.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-[0_4px_12px_rgba(59,130,246,0.3)]">
              <FaUsers size={24} />
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Employees</p>
              <p className="text-2xl font-bold text-blue-800">{employees.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-purple-800 mb-4">Salary Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-100">
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Employee</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Department</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Position</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Annual Salary</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Monthly</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b border-purple-50 hover:bg-purple-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold shadow-[0_4px_8px_rgba(147,51,234,0.2)]">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-purple-800">{employee.name}</p>
                        <p className="text-xs text-purple-500">{employee.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-purple-600">{employee.department}</td>
                  <td className="py-4 px-4 text-sm text-purple-600">{employee.position}</td>
                  <td className="py-4 px-4">
                    {editingId === employee.id ? (
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        type="number"
                        className="w-32"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-purple-800">
                        ${employee.salary.toLocaleString()}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-sm text-purple-600">
                    ${(employee.salary / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-4 px-4">
                    {editingId === employee.id ? (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleSave(employee.id)}
                          variant="success"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <FaSave size={14} />
                        </Button>
                        <Button
                          onClick={handleCancel}
                          variant="danger"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <FaTimes size={14} />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleEdit(employee)}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <FaEdit size={16} />
                        Edit
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-purple-800 mb-4">Department Salary Breakdown</h3>
        <div className="space-y-4">
          {['Engineering', 'Marketing', 'Finance', 'Human Resources'].map((dept) => {
            const deptEmployees = employees.filter(e => e.department === dept);
            const deptTotal = deptEmployees.reduce((sum, e) => sum + e.salary, 0);
            const deptAvg = deptEmployees.length > 0 ? Math.round(deptTotal / deptEmployees.length) : 0;
            
            return (
              <div key={dept} className="p-4 bg-purple-50 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-purple-800">{dept}</span>
                  <span className="text-sm text-purple-600">{deptEmployees.length} employees</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-purple-500">Total</p>
                    <p className="font-bold text-purple-700">${(deptTotal / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-xs text-purple-500">Average</p>
                    <p className="font-bold text-purple-700">${deptAvg.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default AdminPayroll;
