import { useState } from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Input from '../../components/Input';
import { FaSearch, FaUser, FaEnvelope, FaBriefcase, FaCalendar, FaMapMarkerAlt, FaFilter, FaTimes } from 'react-icons/fa';

const Employees = () => {
  const { employees, setSelectedEmployee } = useEmployee();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const departments = ['All', ...new Set(employees.map(e => e.department))];

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
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Employees</h2>
      </div>

      <Card className="p-4 rounded-lg flex flex-col gap-4 h-full">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <Input
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none" size={13} />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="pl-10 pr-8 py-2.5 rounded-md bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 appearance-none minimal-select text-sm min-w-40"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-blue-600 flex items-center justify-center text-white font-medium">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <FaEnvelope size={11} />
                          {employee.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt size={13} className="text-gray-400" />
                      {employee.department}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaBriefcase size={13} className="text-gray-400" />
                      {employee.position}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaCalendar size={13} className="text-gray-400" />
                      {employee.joinDate}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="success">Active</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm" icon={<FaUser size={13} />} onClick={() => handleViewEmployee(employee)}>
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
            <FaUser size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No employees found</p>
            {searchTerm || selectedDepartment !== 'All' ? (
              <button
                onClick={() => { setSearchTerm(''); setSelectedDepartment('All'); }}
                className="mt-2 text-xs text-gray-600 hover:text-gray-800 font-medium flex items-center gap-1 mx-auto"
              >
                <FaTimes size={10} /> Clear filters
              </button>
            ) : null}
          </div>
        )}
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {departments.filter(d => d !== 'All').map((dept) => {
          const count = employees.filter(e => e.department === dept).length;
          return (
            <Card key={dept} className="p-4 rounded-lg flex flex-col justify-between h-full text-center">
              <p className="text-2xl font-semibold text-gray-600">{count}</p>
              <p className="text-sm text-gray-700 font-medium">{dept}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Employees;
