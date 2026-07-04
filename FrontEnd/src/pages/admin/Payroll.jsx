import { useState } from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import { useToast } from '../../context/ToastContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { FaDollarSign, FaEdit, FaSave, FaTimes, FaChartLine, FaUsers } from 'react-icons/fa';

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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-800">Payroll Management</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-[0_4px_12px_rgba(147,51,234,0.25)]">
              <FaDollarSign size={22} />
            </div>
            <div>
              <p className="text-xs text-purple-500 font-medium">Total Payroll</p>
              <p className="text-xl font-bold text-purple-800">${(totalPayroll / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-[0_4px_12px_rgba(16,185,129,0.25)]">
              <FaChartLine size={22} />
            </div>
            <div>
              <p className="text-xs text-emerald-600 font-medium">Average Salary</p>
              <p className="text-xl font-bold text-emerald-800">${avgSalary.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-[0_4px_12px_rgba(59,130,246,0.25)]">
              <FaUsers size={22} />
            </div>
            <div>
              <p className="text-xs text-blue-600 font-medium">Total Employees</p>
              <p className="text-xl font-bold text-blue-800">{employees.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-base font-bold text-purple-800 mb-4">Salary Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-100/60">
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Employee</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Department</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Position</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Annual Salary</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Monthly</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b border-purple-50/60 hover:bg-purple-50/40 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm shadow-[0_4px_8px_rgba(147,51,234,0.2)]">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-purple-800">{employee.name}</p>
                        <p className="text-xs text-purple-400">{employee.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-purple-500">{employee.department}</td>
                  <td className="py-4 px-4 text-sm text-purple-500">{employee.position}</td>
                  <td className="py-4 px-4">
                    {editingId === employee.id ? (
                      <Input value={editValue} onChange={(e) => setEditValue(e.target.value)} type="number" className="w-28" />
                    ) : (
                      <span className="text-sm font-semibold text-purple-800">${employee.salary.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-sm text-purple-500">
                    ${(employee.salary / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-4 px-4">
                    {editingId === employee.id ? (
                      <div className="flex gap-1.5">
                        <Button onClick={() => handleSave(employee.id)} variant="success" size="sm"><FaSave size={13} /></Button>
                        <Button onClick={handleCancel} variant="danger" size="sm"><FaTimes size={13} /></Button>
                      </div>
                    ) : (
                      <Button onClick={() => handleEdit(employee)} variant="outline" size="sm" icon={<FaEdit size={13} />}>
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
        <h3 className="text-base font-bold text-purple-800 mb-4">Department Salary Breakdown</h3>
        <div className="space-y-3">
          {['Engineering', 'Marketing', 'Finance', 'Human Resources'].map((dept) => {
            const deptEmployees = employees.filter(e => e.department === dept);
            const deptTotal = deptEmployees.reduce((sum, e) => sum + e.salary, 0);
            const deptAvg = deptEmployees.length > 0 ? Math.round(deptTotal / deptEmployees.length) : 0;
            return (
              <div key={dept} className="p-4 bg-purple-50/60 rounded-xl border border-purple-100/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-purple-800">{dept}</span>
                  <span className="text-xs text-purple-400">{deptEmployees.length} employees</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-2.5 bg-white/50 rounded-lg">
                    <p className="text-xs text-purple-400">Total</p>
                    <p className="font-bold text-purple-700">${(deptTotal / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="p-2.5 bg-white/50 rounded-lg">
                    <p className="text-xs text-purple-400">Average</p>
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
