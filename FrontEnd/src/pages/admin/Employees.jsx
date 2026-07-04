import React, { useState } from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Input from '../../components/Input';
import { FaSearch, FaUser, FaEnvelope, FaBriefcase, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

const Employees = () => {
  const { employees, setSelectedEmployee } = useEmployee();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const departments = ['All', 'Engineering', 'Marketing', 'Finance', 'Human Resources'];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-purple-800">Employees</h2>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={18} />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-3 rounded-2xl bg-white/60 backdrop-blur-sm border-2 border-purple-200 text-purple-900 focus:outline-none focus:border-purple-400 focus:shadow-[0_4px_12px_rgba(147,51,234,0.15)] transition-all duration-300"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-100">
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Employee</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Department</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Position</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Join Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-purple-50 hover:bg-purple-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold shadow-[0_4px_8px_rgba(147,51,234,0.2)]">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-purple-800">{employee.name}</p>
                        <p className="text-xs text-purple-500 flex items-center gap-1">
                          <FaEnvelope size={12} />
                          {employee.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-purple-600">
                      <MapPin size={16} />
                      {employee.department}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-purple-600">
                      <Briefcase size={16} />
                      {employee.position}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-purple-600">
                      <FaCalendar size={16} />
                      {employee.joinDate}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="success">Active</Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewEmployee(employee)}
                      className="flex items-center gap-2"
                    >
                      <FaUser size={16} />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <FaUser size={48} className="text-purple-300 mx-auto mb-4" />
            <p className="text-purple-500">No employees found</p>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-purple-800 mb-4">Department Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {departments.filter(d => d !== 'All').map((dept) => {
            const count = employees.filter(e => e.department === dept).length;
            return (
              <div key={dept} className="p-4 bg-purple-50 rounded-2xl text-center">
                <p className="text-2xl font-bold text-purple-600">{count}</p>
                <p className="text-sm text-purple-700">{dept}</p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Employees;
