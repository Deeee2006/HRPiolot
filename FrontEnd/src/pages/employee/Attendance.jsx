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
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Attendance</h2>
          <p className="text-sm text-gray-500 mt-0.5">Track your daily check-ins and attendance history</p>
        </div>
      </div>

      {/* Check In/Out Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-md bg-blue-600 flex items-center justify-center text-white shrink-0">
              <FaClock size={22} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Today's Attendance</h3>
              <p className="text-sm text-gray-500 mt-0.5">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
          <div>
            {!isCheckedIn ? (
              <Button onClick={handleCheckIn} size="md" className="min-w-32">
                Check In
              </Button>
            ) : (
              <Button onClick={handleCheckOut} variant="danger" size="md" className="min-w-32">
                Check Out
              </Button>
            )}
          </div>
        </div>

        {(checkInTime || checkOutTime) && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 text-center">
              <p className="text-xs text-emerald-600 font-medium mb-1">Check In</p>
              <p className="text-2xl font-bold text-emerald-700">{checkInTime || '—'}</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-center">
              <p className="text-xs text-red-600 font-medium mb-1">Check Out</p>
              <p className="text-2xl font-bold text-red-700">{checkOutTime || '—'}</p>
            </div>
          </div>
        )}
      </Card>

      {/* Attendance History Table */}
      <Card className="p-6">
        <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <FaHistory size={15} className="text-gray-400" />
          Attendance History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center">
                    <FaCalendar size={28} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No attendance records yet</p>
                  </td>
                </tr>
              ) : (
                attendanceRecords.map((record, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{record.date}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{record.checkIn || '—'}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{record.checkOut || '—'}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(record.status)}
                        {getStatusBadge(record.status)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Weekly Summary */}
      {attendanceRecords.length > 0 && (
        <Card className="p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 text-center">
              <p className="text-3xl font-bold text-emerald-600">{presentCount}</p>
              <p className="text-xs text-emerald-700 font-medium mt-1">Present</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-center">
              <p className="text-3xl font-bold text-red-600">{absentCount}</p>
              <p className="text-xs text-red-700 font-medium mt-1">Absent</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-center">
              <p className="text-3xl font-bold text-amber-600">{leaveCount}</p>
              <p className="text-xs text-amber-700 font-medium mt-1">Leave</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
              <p className="text-3xl font-bold text-blue-600">{rate}%</p>
              <p className="text-xs text-blue-700 font-medium mt-1">Rate</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Attendance;
