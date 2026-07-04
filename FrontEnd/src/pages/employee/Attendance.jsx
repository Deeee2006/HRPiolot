import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEmployee } from '../../context/EmployeeContext';
import { useToast } from '../../context/ToastContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import { FaClock, FaCalendar, FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaHistory } from 'react-icons/fa';

const Attendance = () => {
  const { user } = useAuth();
  const { addAttendance, getEmployeeById } = useEmployee();
  const { addToast } = useToast();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  const currentEmployee = getEmployeeById(user?.id);
  const attendanceRecords = currentEmployee?.attendance || [];

  const handleCheckIn = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toISOString().split('T')[0];
    setCheckInTime(timeString);
    setIsCheckedIn(true);
    addAttendance(user?.id, { date: dateString, checkIn: timeString, checkOut: null, status: 'present' });
    addToast('Checked in successfully', 'success');
  };

  const handleCheckOut = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toISOString().split('T')[0];
    setCheckOutTime(timeString);
    setIsCheckedIn(false);
    addAttendance(user?.id, { date: dateString, checkIn: checkInTime, checkOut: timeString, status: 'present' });
    addToast('Checked out successfully', 'success');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'present': return <Badge variant="success">Present</Badge>;
      case 'absent': return <Badge variant="danger">Absent</Badge>;
      case 'leave': return <Badge variant="warning">Leave</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <FaCheckCircle className="text-emerald-500" size={18} />;
      case 'absent': return <FaTimesCircle className="text-red-500" size={18} />;
      case 'leave': return <FaExclamationCircle className="text-amber-500" size={18} />;
      default: return <FaClock className="text-purple-400" size={18} />;
    }
  };

  const presentCount = attendanceRecords.filter(r => r.status === 'present').length;
  const absentCount = attendanceRecords.filter(r => r.status === 'absent').length;
  const leaveCount = attendanceRecords.filter(r => r.status === 'leave').length;
  const rate = attendanceRecords.length > 0 ? Math.round((presentCount / attendanceRecords.length) * 100) : 0;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-purple-800">Attendance</h2>
      </div>

      <Card className="p-4 rounded-2xl flex flex-col gap-4 h-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-linear-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white shadow-[0_8px_16px_rgba(147,51,234,0.25)]">
              <FaClock size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-800">Today's Attendance</h3>
              <p className="text-sm text-purple-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
          <div className="flex gap-3">
            {!isCheckedIn ? (
              <Button onClick={handleCheckIn} size="lg" className="min-w-35">
                Check In
              </Button>
            ) : (
              <Button onClick={handleCheckOut} variant="danger" size="lg" className="min-w-35">
                Check Out
              </Button>
            )}
          </div>
        </div>

        {(checkInTime || checkOutTime) && (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-100/50 text-center">
              <p className="text-xs text-emerald-600 font-semibold">Check In</p>
              <p className="text-2xl font-bold text-emerald-700">{checkInTime || '--:--'}</p>
            </div>
            <div className="p-4 bg-red-50/80 rounded-xl border border-red-100/50 text-center">
              <p className="text-xs text-red-600 font-semibold">Check Out</p>
              <p className="text-2xl font-bold text-red-700">{checkOutTime || '--:--'}</p>
            </div>
          </div>
        )}
      </Card>

      <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">
        <h3 className="text-base font-bold text-purple-800 flex items-center gap-2">
          <FaHistory size={16} />
          Attendance History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-100/60">
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Date</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Check In</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Check Out</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center">
                    <FaCalendar size={32} className="text-purple-300 mx-auto mb-3" />
                    <p className="text-purple-400 text-sm">No attendance records yet</p>
                  </td>
                </tr>
              ) : (attendanceRecords.map((record, index) => (
                <tr key={index} className="border-b border-purple-50/60 hover:bg-purple-50/40 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-purple-800">{record.date}</td>
                  <td className="py-3 px-4 text-sm text-purple-500">{record.checkIn || '--:--'}</td>
                  <td className="py-3 px-4 text-sm text-purple-500">{record.checkOut || '--:--'}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(record.status)}
                      {getStatusBadge(record.status)}
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>

      <Card className="p-4 rounded-2xl flex flex-col gap-4 h-full">
        <h3 className="text-base font-bold text-purple-800">Weekly Summary</h3>
        {attendanceRecords.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-100/50 text-center">
              <p className="text-3xl font-bold text-emerald-600">{presentCount}</p>
              <p className="text-sm text-emerald-700 font-medium">Present</p>
            </div>
            <div className="p-4 bg-red-50/80 rounded-xl border border-red-100/50 text-center">
              <p className="text-3xl font-bold text-red-600">{absentCount}</p>
              <p className="text-sm text-red-700 font-medium">Absent</p>
            </div>
            <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-100/50 text-center">
              <p className="text-3xl font-bold text-amber-600">{leaveCount}</p>
              <p className="text-sm text-amber-700 font-medium">Leave</p>
            </div>
            <div className="p-4 bg-purple-50/80 rounded-xl border border-purple-100/50 text-center">
              <p className="text-3xl font-bold text-purple-600">{rate}%</p>
              <p className="text-sm text-purple-700 font-medium">Attendance Rate</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-purple-400 text-center py-6">No attendance data available</p>
        )}
      </Card>
    </div>
  );
};

export default Attendance;
