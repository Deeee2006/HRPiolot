import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEmployee } from '../../context/EmployeeContext';
import { useToast } from '../../context/ToastContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Badge from '../../components/Badge';
import { FaFileAlt, FaPlus, FaCalendar, FaClock } from 'react-icons/fa';

const Leave = () => {
  const { user } = useAuth();
  const { addLeaveRequest, getEmployeeById } = useEmployee();
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ type: 'Sick Leave', startDate: '', endDate: '', reason: '' });
  const [errors, setErrors] = useState({});

  const currentEmployee = getEmployeeById(user?.id);
  const leaveRequests = currentEmployee?.leaveRequests || [];

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
      addToast('Leave request submitted successfully', 'success');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved': return <Badge variant="success">Approved</Badge>;
      case 'rejected': return <Badge variant="danger">Rejected</Badge>;
      case 'pending': return <Badge variant="warning">Pending</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  const approved = leaveRequests.filter(r => r.status === 'approved').length;
  const pending = leaveRequests.filter(r => r.status === 'pending').length;
  const rejected = leaveRequests.filter(r => r.status === 'rejected').length;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-purple-800">Leave Requests</h2>
        <Button onClick={() => setIsModalOpen(true)} size="sm" icon={<FaPlus size={14} />}>
          Apply Leave
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4 rounded-2xl flex flex-col justify-between h-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100/80 flex items-center justify-center">
              <FaCalendar className="text-amber-600" size={18} />
            </div>
            <div>
              <p className="text-xl font-bold text-amber-600">12</p>
              <p className="text-xs text-amber-700 font-medium">Leave Balance</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 rounded-2xl flex flex-col justify-between h-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center">
              <FaFileAlt className="text-emerald-600" size={18} />
            </div>
            <div>
              <p className="text-xl font-bold text-emerald-600">{approved}</p>
              <p className="text-xs text-emerald-700 font-medium">Approved</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 rounded-2xl flex flex-col justify-between h-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100/80 flex items-center justify-center">
              <FaClock className="text-purple-600" size={18} />
            </div>
            <div>
              <p className="text-xl font-bold text-purple-600">{pending}</p>
              <p className="text-xs text-purple-700 font-medium">Pending</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 rounded-2xl flex flex-col justify-between h-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100/80 flex items-center justify-center">
              <FaFileAlt className="text-red-600" size={18} />
            </div>
            <div>
              <p className="text-xl font-bold text-red-600">{rejected}</p>
              <p className="text-xs text-red-700 font-medium">Rejected</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4 rounded-2xl flex flex-col gap-4 h-full">
        <h3 className="text-base font-bold text-purple-800">Leave History</h3>
        <div className="flex flex-col gap-3">
          {leaveRequests.length === 0 && (
            <div className="text-center py-10">
              <FaFileAlt size={36} className="text-purple-300 mx-auto mb-3" />
              <p className="text-purple-400 text-sm">No leave requests yet</p>
            </div>
          )}
          {leaveRequests.map((request) => (
            <div key={request.id} className="p-4 bg-purple-50/60 rounded-xl border border-purple-100/50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h4 className="font-semibold text-purple-800">{request.type}</h4>
                    {getStatusBadge(request.status)}
                  </div>
                  <p className="text-xs text-purple-500 mb-1">
                    {request.startDate}{request.startDate !== request.endDate ? ` — ${request.endDate}` : ''}
                  </p>
                  <p className="text-sm text-purple-600">{request.reason}</p>
                  {request.comments && (
                    <p className="text-xs text-purple-400 mt-1 italic">Admin: {request.comments}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Apply for Leave">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-purple-700">Leave Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/60 backdrop-blur-sm border-2 border-purple-200/60 text-purple-900 focus:outline-none focus:border-purple-400 focus:shadow-[0_4px_16px_rgba(147,51,234,0.1)] transition-all duration-300 glass-select"
            >
              <option value="Sick Leave">Sick Leave</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Personal Leave">Personal Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
            </select>
            {errors.type && <span className="text-xs text-red-500">{errors.type}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} error={errors.startDate} />
            <Input label="End Date" type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} error={errors.endDate} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-purple-700">Reason</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="Provide reason for leave"
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-white/60 backdrop-blur-sm border-2 border-purple-200/60 text-purple-900 placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:shadow-[0_4px_16px_rgba(147,51,234,0.1)] transition-all duration-300 resize-none"
            />
            {errors.reason && <span className="text-xs text-red-500">{errors.reason}</span>}
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={handleApplyLeave} className="flex-1">Submit Request</Button>
            <Button onClick={() => setIsModalOpen(false)} variant="outline" className="flex-1">Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Leave;
