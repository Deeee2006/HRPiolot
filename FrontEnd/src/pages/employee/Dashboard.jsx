import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEmployee } from '../../context/EmployeeContext';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { FaUser, FaCalendar, FaFileAlt, FaDollarSign, FaClock, FaArrowRight } from 'react-icons/fa';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const { getEmployeeById } = useEmployee();
  const navigate = useNavigate();

  const currentEmployee = getEmployeeById(user?.id);
  const attendance = currentEmployee?.attendance || [];
  const leaveReqs = currentEmployee?.leaveRequests || [];

  const cards = [
    {
      title: 'Profile',
      icon: FaUser,
      description: 'View and edit your profile',
      color: 'bg-blue-600',
      onClick: () => navigate('/employee/profile')
    },
    {
      title: 'Attendance',
      icon: FaCalendar,
      description: 'Check your attendance records',
      color: 'bg-blue-600',
      onClick: () => navigate('/employee/attendance')
    },
    {
      title: 'Leave Requests',
      icon: FaFileAlt,
      description: 'Apply and track leave requests',
      color: 'bg-blue-600',
      onClick: () => navigate('/employee/leave')
    },
    {
      title: 'Payroll',
      icon: FaDollarSign,
      description: 'View salary and payment details',
      color: 'bg-blue-600',
      onClick: () => navigate('/employee/payroll')
    }
  ];

  const presentCount = attendance.filter(a => a.status === 'present').length;
  const absentCount = attendance.filter(a => a.status === 'absent').length;
  const pendingLeaves = leaveReqs.filter(l => l.status === 'pending').length;

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Welcome back, {user?.name?.split(' ')[0]}!</h2>
          <p className="text-sm text-gray-500 mt-0.5">Here's what's happening today.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-md border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-emerald-700">Active</span>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="p-4 flex flex-col gap-3 cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all duration-200 group"
            onClick={card.onClick}
          >
            <div className={`w-10 h-10 rounded-md ${card.color} flex items-center justify-center text-white shrink-0`}>
              <card.icon size={18} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{card.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{card.description}</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-gray-400 group-hover:text-blue-600 transition-colors">
              Open <FaArrowRight size={10} />
            </div>
          </Card>
        ))}
      </div>

      {/* Activity + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <FaClock size={15} className="text-gray-400" />
            Recent Activity
          </h3>
          <div className="flex flex-col gap-2">
            {leaveReqs.length > 0 ? (
              leaveReqs.slice(-3).reverse().map((req) => (
                <div key={req.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{req.type} requested</p>
                    <p className="text-xs text-gray-500">{req.startDate}</p>
                  </div>
                  <Badge variant={req.status === 'approved' ? 'success' : req.status === 'rejected' ? 'danger' : 'warning'}>
                    {req.status}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">No recent activity</p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div>
                <p className="text-sm font-semibold text-emerald-800">Present Days</p>
                <p className="text-xs text-emerald-600 mt-0.5">Total records</p>
              </div>
              <span className="text-2xl font-bold text-emerald-600">{presentCount}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div>
                <p className="text-sm font-semibold text-red-800">Absent Days</p>
                <p className="text-xs text-red-600 mt-0.5">Total records</p>
              </div>
              <span className="text-2xl font-bold text-red-600">{absentCount}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div>
                <p className="text-sm font-semibold text-amber-800">Pending Leaves</p>
                <p className="text-xs text-amber-600 mt-0.5">Awaiting approval</p>
              </div>
              <span className="text-2xl font-bold text-amber-600">{pendingLeaves}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
