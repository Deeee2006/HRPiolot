import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { FaDollarSign, FaChartLine, FaCalendar, FaDownload } from 'react-icons/fa';

const Payroll = () => {
  const { user } = useAuth();

  const salaryBreakdown = [
    { label: 'Basic Salary', amount: user?.salary * 0.6, color: 'purple' },
    { label: 'HRA', amount: user?.salary * 0.2, color: 'blue' },
    { label: 'Special Allowance', amount: user?.salary * 0.1, color: 'green' },
    { label: 'Medical Allowance', amount: user?.salary * 0.05, color: 'pink' },
    { label: 'Transport Allowance', amount: user?.salary * 0.05, color: 'yellow' },
  ];

  const deductions = [
    { label: 'Provident Fund', amount: user?.salary * 0.12 },
    { label: 'Professional Tax', amount: 200 },
    { label: 'Income Tax', amount: user?.salary * 0.1 },
  ];

  const totalEarnings = salaryBreakdown.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);
  const netSalary = totalEarnings - totalDeductions;

  const paymentHistory = [
    { month: 'January 2024', amount: netSalary, status: 'paid', date: '2024-01-31' },
    { month: 'December 2023', amount: netSalary, status: 'paid', date: '2023-12-31' },
    { month: 'November 2023', amount: netSalary, status: 'paid', date: '2023-11-30' },
    { month: 'October 2023', amount: netSalary, status: 'paid', date: '2023-10-31' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-800">Payroll</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white shadow-[0_4px_12px_rgba(147,51,234,0.3)]">
              <FaDollarSign size={24} />
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">Net Salary</p>
              <p className="text-2xl font-bold text-purple-800">${netSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white shadow-[0_4px_12px_rgba(34,197,94,0.3)]">
              <FaChartLine size={24} />
            </div>
            <div>
              <p className="text-sm text-green-600 font-medium">Annual Salary</p>
              <p className="text-2xl font-bold text-green-800">${user?.salary?.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-[0_4px_12px_rgba(59,130,246,0.3)]">
              <FaCalendar size={24} />
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Next Pay Date</p>
              <p className="text-2xl font-bold text-blue-800">Feb 28</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-purple-800 mb-4">Salary Breakdown</h3>
          <div className="space-y-3">
            {salaryBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-2xl">
                <span className="text-sm font-medium text-purple-700">{item.label}</span>
                <span className="text-sm font-bold text-purple-800">${item.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            ))}
            <div className="flex items-center justify-between p-3 bg-purple-100 rounded-2xl border-2 border-purple-200">
              <span className="text-sm font-bold text-purple-800">Total Earnings</span>
              <span className="text-sm font-bold text-purple-800">${totalEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-purple-800 mb-4">Deductions</h3>
          <div className="space-y-3">
            {deductions.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-2xl">
                <span className="text-sm font-medium text-red-700">{item.label}</span>
                <span className="text-sm font-bold text-red-800">-${item.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            ))}
            <div className="flex items-center justify-between p-3 bg-red-100 rounded-2xl border-2 border-red-200">
              <span className="text-sm font-bold text-red-800">Total Deductions</span>
              <span className="text-sm font-bold text-red-800">-${totalDeductions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="p-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl text-white shadow-[0_8px_16px_rgba(147,51,234,0.3)]">
          <p className="text-sm font-medium mb-1">Net Monthly Salary</p>
          <p className="text-4xl font-bold">${netSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-purple-800 mb-4">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-100">
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Month</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Payment Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index} className="border-b border-purple-50 hover:bg-purple-50/50 transition-colors">
                  <td className="py-3 px-4 text-sm text-purple-800">{payment.month}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-purple-800">${payment.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                  <td className="py-3 px-4 text-sm text-purple-600">{payment.date}</td>
                  <td className="py-3 px-4">
                    <Badge variant="success">Paid</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <FaDownload size={16} />
                      Payslip
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Payroll;
