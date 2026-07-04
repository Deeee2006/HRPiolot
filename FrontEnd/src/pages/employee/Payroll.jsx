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
    { label: 'Basic Salary', amount: user?.salary * 0.6, color: 'text-purple-600', bg: 'bg-purple-50/60' },
    { label: 'HRA', amount: user?.salary * 0.2, color: 'text-blue-600', bg: 'bg-blue-50/60' },
    { label: 'Special Allowance', amount: user?.salary * 0.1, color: 'text-emerald-600', bg: 'bg-emerald-50/60' },
    { label: 'Medical Allowance', amount: user?.salary * 0.05, color: 'text-pink-600', bg: 'bg-pink-50/60' },
    { label: 'Transport Allowance', amount: user?.salary * 0.05, color: 'text-amber-600', bg: 'bg-amber-50/60' },
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-800">Payroll</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-[0_4px_12px_rgba(147,51,234,0.25)]">
              <FaWallet size={22} />
            </div>
            <div>
              <p className="text-xs text-purple-500 font-medium">Net Salary</p>
              <p className="text-xl font-bold text-purple-800">${netSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-[0_4px_12px_rgba(16,185,129,0.25)]">
              <FaChartLine size={22} />
            </div>
            <div>
              <p className="text-xs text-emerald-600 font-medium">Annual Salary</p>
              <p className="text-xl font-bold text-emerald-800">${user?.salary?.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-[0_4px_12px_rgba(59,130,246,0.25)]">
              <FaCalendar size={22} />
            </div>
            <div>
              <p className="text-xs text-blue-600 font-medium">Next Pay Date</p>
              <p className="text-xl font-bold text-blue-800">Feb 28</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-base font-bold text-purple-800 mb-4 flex items-center gap-2">
            <FaArrowUp size={14} className="text-emerald-500" />
            Salary Breakdown
          </h3>
          <div className="space-y-2">
            {salaryBreakdown.map((item, index) => (
              <div key={index} className={`flex items-center justify-between p-3 ${item.bg} rounded-xl`}>
                <span className="text-sm font-medium text-purple-700">{item.label}</span>
                <span className={`text-sm font-bold ${item.color}`}>${item.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            ))}
            <div className="flex items-center justify-between p-3 bg-purple-100/80 rounded-xl border border-purple-200/60">
              <span className="text-sm font-bold text-purple-800">Total Earnings</span>
              <span className="text-sm font-bold text-purple-800">${totalEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-base font-bold text-purple-800 mb-4 flex items-center gap-2">
            <FaArrowDown size={14} className="text-red-500" />
            Deductions
          </h3>
          <div className="space-y-2">
            {deductions.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50/60 rounded-xl">
                <span className="text-sm font-medium text-red-700">{item.label}</span>
                <span className="text-sm font-bold text-red-700">-${item.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            ))}
            <div className="flex items-center justify-between p-3 bg-red-100/80 rounded-xl border border-red-200/60">
              <span className="text-sm font-bold text-red-800">Total Deductions</span>
              <span className="text-sm font-bold text-red-800">-${totalDeductions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white shadow-[0_8px_24px_rgba(147,51,234,0.3)]">
          <p className="text-sm font-medium opacity-90">Net Monthly Salary</p>
          <p className="text-4xl font-extrabold tracking-tight">${netSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-base font-bold text-purple-800 mb-4">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-100/60">
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Month</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Amount</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Date</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index} className="border-b border-purple-50/60 hover:bg-purple-50/40 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-purple-800">{payment.month}</td>
                  <td className="py-3 px-4 text-sm font-bold text-purple-800">${payment.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                  <td className="py-3 px-4 text-sm text-purple-500">{payment.date}</td>
                  <td className="py-3 px-4"><Badge variant="success">Paid</Badge></td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm" icon={<FaDownload size={12} />} onClick={handleDownload}>
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
