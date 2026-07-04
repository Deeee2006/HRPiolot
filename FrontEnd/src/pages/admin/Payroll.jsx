import { useState } from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import { useToast } from '../../context/ToastContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { FaDollarSign, FaEdit, FaSave, FaTimes, FaChartBar, FaUsers } from 'react-icons/fa';

const AdminPayroll = () => {
  const { employees, updateSalary } = useEmployee();
  const { addToast } = useToast();
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
    addToast('Salary updated successfully', 'success');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const totalPayroll = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const avgSalary = Math.round(totalPayroll / employees.length);

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Payroll Management</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage employee salaries and compensation</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <FaDollarSign className="text-blue-600" size={17} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Payroll</p>
              <p className="text-xl font-semibold text-gray-900">${(totalPayroll / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
<<<<<<< HEAD
            <div className="w-10 h-10 rounded-md bg-emerald-100 flex items-center justify-center shrink-0">
              <FaChartBar className="text-emerald-600" size={17} />
=======
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
              <FaChartLine className="text-emerald-600" size={17} />
>>>>>>> 538f960fe0d377671686f96df0e0381a06e50f4f
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Average Salary</p>
              <p className="text-xl font-semibold text-gray-900">${avgSalary.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
              <FaUsers className="text-purple-600" size={17} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Employees</p>
              <p className="text-xl font-semibold text-gray-900">{employees.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Salary Table */}
      <Card>
        <h3 className="text-base font-semibold text-gray-900 mb-4">Salary Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Salary</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 font-medium text-sm shrink-0">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                        <p className="text-xs text-gray-500">{employee.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{employee.department}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{employee.position}</td>
                  <td className="py-3 px-4">
                    {editingId === employee.id ? (
                      <Input value={editValue} onChange={(e) => setEditValue(e.target.value)} type="number" className="w-28" />
                    ) : (
                      <span className="text-sm font-medium text-gray-900">${employee.salary.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    ${(employee.salary / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-1.5">
                      {editingId === employee.id ? (
                        <>
                          <Button onClick={() => handleSave(employee.id)} variant="success" size="sm"><FaSave size={13} /></Button>
                          <Button onClick={handleCancel} variant="danger" size="sm"><FaTimes size={13} /></Button>
                        </>
                      ) : (
                        <Button onClick={() => handleEdit(employee)} variant="outline" size="sm" icon={<FaEdit size={13} />}>
                          Edit
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Department Breakdown */}
      <Card>
        <h3 className="text-base font-semibold text-gray-900 mb-4">Department Salary Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['Engineering', 'Marketing', 'Finance', 'Human Resources'].map((dept) => {
            const deptEmployees = employees.filter(e => e.department === dept);
            const deptTotal = deptEmployees.reduce((sum, e) => sum + e.salary, 0);
            const deptAvg = deptEmployees.length > 0 ? Math.round(deptTotal / deptEmployees.length) : 0;
            return (
              <div key={dept} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-900">{dept}</span>
                  <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">{deptEmployees.length} employees</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-md border border-gray-200">
                    <p className="text-xs text-gray-500 mb-0.5">Total</p>
                    <p className="text-sm font-semibold text-gray-900">${(deptTotal / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="p-3 bg-white rounded-md border border-gray-200">
                    <p className="text-xs text-gray-500 mb-0.5">Average</p>
                    <p className="text-sm font-semibold text-gray-900">${deptAvg.toLocaleString()}</p>
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
