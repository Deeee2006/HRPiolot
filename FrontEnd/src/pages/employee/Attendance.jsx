import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEmployee } from '../../context/EmployeeContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import { FaClock, FaCalendar, FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';

const Attendance = () => {
  const { user } = useAuth();
  const { addAttendance } = useEmployee();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  const handleCheckIn = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toISOString().split('T')[0];
    
    setCheckInTime(timeString);
    setIsCheckedIn(true);
    
    addAttendance(user?.id, {
      date: dateString,
      checkIn: timeString,
      checkOut: null,
      status: 'present'
    });
  };

  const handleCheckOut = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toISOString().split('T')[0];
    
    setCheckOutTime(timeString);
    setIsCheckedIn(false);
    
    addAttendance(user?.id, {
      date: dateString,
      checkIn: checkInTime,
      checkOut: timeString,
      status: 'present'
    });
  };

  const mockAttendance = [
    { date: '2024-01-22', checkIn: '09:00', checkOut: '18:00', status: 'present' },
    { date: '2024-01-21', checkIn: '09:15', checkOut: '18:30', status: 'present' },
    { date: '2024-01-20', checkIn: null, checkOut: null, status: 'leave' },
    { date: '2024-01-19', checkIn: '09:00', checkOut: '18:00', status: 'present' },
    { date: '2024-01-18', checkIn: null, checkOut: null, status: 'absent' },
    { date: '2024-01-17', checkIn: '09:30', checkOut: '17:30', status: 'present' },
    { date: '2024-01-16', checkIn: '09:00', checkOut: '18:00', status: 'present' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'present':
        return <Badge variant="success">Present</Badge>;
      case 'absent':
        return <Badge variant="danger">Absent</Badge>;
      case 'leave':
        return <Badge variant="warning">Leave</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <FaCheckCircle className="text-green-500" size={20} />;
      case 'absent':
        return <FaTimesCircle className="text-red-500" size={20} />;
      case 'leave':
        return <FaExclamationCircle className="text-yellow-500" size={20} />;
      default:
        return <FaClock className="text-purple-500" size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-800">Attendance</h2>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white shadow-[0_8px_16px_rgba(147,51,234,0.3)]">
              <FaClock size={32} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-800">Today's Attendance</h3>
              <p className="text-purple-600">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
          <div className="flex gap-3">
            {!isCheckedIn ? (
              <Button onClick={handleCheckIn} size="lg" className="min-w-[140px]">
                Check In
              </Button>
            ) : (
              <Button onClick={handleCheckOut} variant="danger" size="lg" className="min-w-[140px]">
                Check Out
              </Button>
            )}
          </div>
        </div>

        {(checkInTime || checkOutTime) && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-2xl text-center">
              <p className="text-sm text-green-600 font-medium">Check In</p>
              <p className="text-2xl font-bold text-green-700">{checkInTime || '--:--'}</p>
            </div>
            <div className="p-4 bg-red-50 rounded-2xl text-center">
              <p className="text-sm text-red-600 font-medium">Check Out</p>
              <p className="text-2xl font-bold text-red-700">{checkOutTime || '--:--'}</p>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
          <FaCalendar size={20} />
          Attendance History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-100">
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Check In</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Check Out</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockAttendance.map((record, index) => (
                <tr key={index} className="border-b border-purple-50 hover:bg-purple-50/50 transition-colors">
                  <td className="py-3 px-4 text-sm text-purple-800">{record.date}</td>
                  <td className="py-3 px-4 text-sm text-purple-600">{record.checkIn || '--:--'}</td>
                  <td className="py-3 px-4 text-sm text-purple-600">{record.checkOut || '--:--'}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(record.status)}
                      {getStatusBadge(record.status)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-purple-800 mb-4">Weekly Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 rounded-2xl text-center">
            <p className="text-3xl font-bold text-green-600">5</p>
            <p className="text-sm text-green-700 font-medium">Present</p>
          </div>
          <div className="p-4 bg-red-50 rounded-2xl text-center">
            <p className="text-3xl font-bold text-red-600">1</p>
            <p className="text-sm text-red-700 font-medium">Absent</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-2xl text-center">
            <p className="text-3xl font-bold text-yellow-600">1</p>
            <p className="text-sm text-yellow-700 font-medium">Leave</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-2xl text-center">
            <p className="text-3xl font-bold text-purple-600">71%</p>
            <p className="text-sm text-purple-700 font-medium">Attendance Rate</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Attendance;
