import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEmployee } from '../../context/EmployeeContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Badge from '../../components/Badge';
import { FaFileAlt, FaPlus, FaCalendar } from 'react-icons/fa';

const Leave = () => {
  const { user } = useAuth();
  const { addLeaveRequest } = useEmployee();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Sick Leave',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [errors, setErrors] = useState({});

  const mockLeaveRequests = [
    { id: 1, type: 'Sick Leave', startDate: '2024-01-20', endDate: '2024-01-22', reason: 'Not feeling well', status: 'pending', comments: '' },
    { id: 2, type: 'Annual Leave', startDate: '2024-01-10', endDate: '2024-01-12', reason: 'Personal work', status: 'approved', comments: 'Approved by manager' },
    { id: 3, type: 'Sick Leave', startDate: '2024-01-05', endDate: '2024-01-05', reason: 'Fever', status: 'rejected', comments: 'Please provide medical certificate' },
  ];

  const handleApplyLeave = () => {
    const newErrors = {};
    if (!formData.type) newErrors.type = 'Leave type is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.reason) newErrors.reason = 'Reason is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      addLeaveRequest(user?.id, formData);
      setIsModalOpen(false);
      setFormData({ type: 'Sick Leave', startDate: '', endDate: '', reason: '' });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'rejected':
        return <Badge variant="danger">Rejected</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-purple-800">Leave Requests</h2>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <FaPlus size={20} />
          Apply Leave
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
              <FaCalendar className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">12</p>
              <p className="text-sm text-yellow-700">Leave Balance</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <FaFileAlt className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">1</p>
              <p className="text-sm text-green-700">Approved</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <FaFileAlt className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">1</p>
              <p className="text-sm text-purple-700">Pending</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-purple-800 mb-4">Leave History</h3>
        <div className="space-y-4">
          {mockLeaveRequests.map((request) => (
            <div key={request.id} className="p-4 bg-purple-50 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-purple-800">{request.type}</h4>
                    {getStatusBadge(request.status)}
                  </div>
                  <p className="text-sm text-purple-600 mb-1">
                    {request.startDate} {request.startDate !== request.endDate ? `- ${request.endDate}` : ''}
                  </p>
                  <p className="text-sm text-purple-500">{request.reason}</p>
                  {request.comments && (
                    <p className="text-xs text-purple-400 mt-1">Comment: {request.comments}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Apply for Leave">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-700">Leave Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-white/60 backdrop-blur-sm border-2 border-purple-200 text-purple-900 focus:outline-none focus:border-purple-400 focus:shadow-[0_4px_12px_rgba(147,51,234,0.15)] transition-all duration-300"
            >
              <option value="Sick Leave">Sick Leave</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Personal Leave">Personal Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
            </select>
            {errors.type && <span className="text-xs text-red-500">{errors.type}</span>}
          </div>

          <Input
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            error={errors.startDate}
          />

          <Input
            label="End Date"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            error={errors.endDate}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-700">Reason</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="Provide reason for leave"
              rows={3}
              className="w-full px-4 py-3 rounded-2xl bg-white/60 backdrop-blur-sm border-2 border-purple-200 text-purple-900 placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:shadow-[0_4px_12px_rgba(147,51,234,0.15)] transition-all duration-300 resize-none"
            />
            {errors.reason && <span className="text-xs text-red-500">{errors.reason}</span>}
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleApplyLeave} className="flex-1">
              Submit Request
            </Button>
            <Button onClick={() => setIsModalOpen(false)} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Leave;
