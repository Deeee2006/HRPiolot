import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { FaChartLine, FaCalendar, FaDownload, FaWallet, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Payroll = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const salaryBreakdown = [
    { label: 'Basic Salary', amount: user?.salary * 0.6, color: 'text-gray-600', bg: 'bg-gray-50' },
    { label: 'HRA', amount: user?.salary * 0.2, color: 'text-gray-600', bg: 'bg-gray-50' },
    { label: 'Special Allowance', amount: user?.salary * 0.1, color: 'text-gray-600', bg: 'bg-gray-50' },
    { label: 'Medical Allowance', amount: user?.salary * 0.05, color: 'text-gray-600', bg: 'bg-gray-50' },
    { label: 'Transport Allowance', amount: user?.salary * 0.05, color: 'text-gray-600', bg: 'bg-gray-50' },
  ];

  const deductions = [
    { label: 'Provident Fund', amount: user?.salary * 0.12 },
    { label: 'Professional Tax', amount: 200 },
    { label: 'Income Tax', amount: user?.salary * 0.1 },
  ];

  const totalEarnings = salaryBreakdown.reduce((s, i) => s + i.amount, 0);
  const totalDeductions = deductions.reduce((s, i) => s + i.amount, 0);
  const netSalary = totalEarnings - totalDeductions;

  const paymentHistory = [
    { month: 'January 2024', amount: netSalary, status: 'paid', date: '2024-01-31' },
    { month: 'December 2023', amount: netSalary, status: 'paid', date: '2023-12-31' },
    { month: 'November 2023', amount: netSalary, status: 'paid', date: '2023-11-30' },
    { month: 'October 2023', amount: netSalary, status: 'paid', date: '2023-10-31' },
  ];

  const handleDownload = () => {
    addToast('Payslip downloaded successfully', 'success');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Payroll</h2>
          <p className="text-sm text-gray-500 mt-0.5">Your salary details and payment history</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <FaWallet className="text-blue-600" size={17} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Net Salary</p>
              <p className="text-xl font-semibold text-gray-900">${netSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
              <FaChartLine className="text-emerald-600" size={17} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Annual Salary</p>
              <p className="text-xl font-semibold text-gray-900">${user?.salary?.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
              <FaCalendar className="text-purple-600" size={17} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Next Pay Date</p>
              <p className="text-xl font-semibold text-gray-900">Feb 28</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Breakdown + Deductions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <FaArrowUp size={13} className="text-emerald-500" />
            Salary Breakdown
          </h3>
          <div className="flex flex-col gap-2">
            {salaryBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{item.label}</span>
                <span className="text-sm font-semibold text-gray-900">${item.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            ))}
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg border border-gray-200 mt-1">
              <span className="text-sm font-semibold text-gray-900">Total Earnings</span>
              <span className="text-sm font-semibold text-gray-900">${totalEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <FaArrowDown size={13} className="text-red-500" />
            Deductions
          </h3>
          <div className="flex flex-col gap-2">
            {deductions.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-sm text-red-700">{item.label}</span>
                <span className="text-sm font-semibold text-red-700">-${item.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            ))}
            <div className="flex items-center justify-between p-3 bg-red-100 rounded-lg border border-red-200 mt-1">
              <span className="text-sm font-semibold text-red-800">Total Deductions</span>
              <span className="text-sm font-semibold text-red-800">-${totalDeductions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Net Salary Banner */}
      <Card>
        <div className="p-6 bg-blue-600 rounded-lg text-white">
          <p className="text-sm font-medium opacity-80 mb-1">Net Monthly Salary</p>
          <p className="text-4xl font-bold tracking-tight">${netSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
      </Card>

      {/* Payment History */}
      <Card>
        <h3 className="text-base font-semibold text-gray-900 mb-4">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{payment.month}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900">${payment.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{payment.date}</td>
                  <td className="py-3 px-4"><Badge variant="success">Paid</Badge></td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end">
                      <Button variant="ghost" size="sm" icon={<FaDownload size={12} />} onClick={handleDownload}>
                        Payslip
                      </Button>
                    </div>
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
