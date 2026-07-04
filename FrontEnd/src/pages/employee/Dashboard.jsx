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
      gradient: 'from-purple-500 to-purple-600',
      shadow: 'rgba(147,51,234,0.3)',
      onClick: () => navigate('/employee/profile')
    },
    {
      title: 'Attendance',
      icon: FaCalendar,
      description: 'Check your attendance records',
      gradient: 'from-pink-400 to-pink-600',
      shadow: 'rgba(236,72,153,0.3)',
      onClick: () => navigate('/employee/attendance')
    },
    {
      title: 'Leave Requests',
      icon: FaFileAlt,
      description: 'Apply and track leave requests',
      gradient: 'from-blue-400 to-blue-600',
      shadow: 'rgba(59,130,246,0.3)',
      onClick: () => navigate('/employee/leave')
    },
    {
      title: 'Payroll',
      icon: FaDollarSign,
      description: 'View salary and payment details',
      gradient: 'from-emerald-400 to-emerald-600',
      shadow: 'rgba(16,185,129,0.3)',
      onClick: () => navigate('/employee/payroll')
    }
  ];

  const presentCount = attendance.filter(a => a.status === 'present').length;
  const absentCount = attendance.filter(a => a.status === 'absent').length;
  const pendingLeaves = leaveReqs.filter(l => l.status === 'pending').length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-purple-800">Welcome back, {user?.name?.split(' ')[0]}!</h2>
          <p className="text-purple-500 text-sm">Here's what's happening today.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white/40 backdrop-blur-sm rounded-xl border border-purple-100/50">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-emerald-600">Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="h-full p-4 rounded-2xl flex flex-col justify-between group cursor-pointer hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] transition-all duration-300"
            onClick={card.onClick}
          >
            <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${card.gradient} flex items-center justify-center text-white shadow-[0_4px_12px_${card.shadow}]`}>
              <card.icon size={20} />
            </div>
            <h3 className="text-base font-bold text-purple-800">{card.title}</h3>
            <p className="text-xs text-purple-500">{card.description}</p>
            <div className="flex items-center gap-1 text-xs font-semibold text-purple-400 group-hover:text-purple-600 transition-colors">
              Open <FaArrowRight size={10} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 rounded-2xl flex flex-col gap-4 h-full">
          <h3 className="text-base font-bold text-purple-800 flex items-center gap-2">
            <FaClock size={16} />
            Recent Activity
          </h3>
          <div className="flex flex-col gap-2">
            {leaveReqs.length > 0 ? (
              leaveReqs.slice(-3).reverse().map((req) => (
                <div key={req.id} className="flex items-center justify-between p-3 bg-purple-50/60 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-purple-800">{req.type} requested</p>
                    <p className="text-xs text-purple-400">{req.startDate}</p>
                  </div>
                  <Badge variant={req.status === 'approved' ? 'success' : req.status === 'rejected' ? 'danger' : 'warning'}>
                    {req.status}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-purple-400 text-center py-6">No recent activity</p>
            )}
          </div>
        </Card>

        <Card className="p-4 rounded-2xl flex flex-col gap-4 h-full">
          <h3 className="text-base font-bold text-purple-800">Quick Stats</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-4 bg-emerald-50/80 rounded-xl border border-emerald-100/50">
              <div>
                <span className="text-sm font-medium text-emerald-800">Present Days</span>
                <p className="text-xs text-emerald-500">Total records</p>
              </div>
              <span className="text-xl font-bold text-emerald-600">{presentCount}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50/80 rounded-xl border border-red-100/50">
              <div>
                <span className="text-sm font-medium text-red-800">Absent Days</span>
                <p className="text-xs text-red-500">Total records</p>
              </div>
              <span className="text-xl font-bold text-red-600">{absentCount}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-amber-50/80 rounded-xl border border-amber-100/50">
              <div>
                <span className="text-sm font-medium text-amber-800">Pending Leaves</span>
                <p className="text-xs text-amber-500">Awaiting approval</p>
              </div>
              <span className="text-xl font-bold text-amber-600">{pendingLeaves}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
