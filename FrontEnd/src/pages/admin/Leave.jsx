import React, { useState } from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import { FaCheckSquare, FaCheck, FaTimes, FaCalendar, FaUser } from 'react-icons/fa';

const AdminLeave = () => {
  const { employees, updateLeaveStatus } = useEmployee();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState(null);
  const [comment, setComment] = useState('');

  const allLeaveRequests = employees.flatMap(emp => 
    emp.leaveRequests?.map(req => ({
      ...req,
      employeeName: emp.name,
      employeeId: emp.id,
      employeeDepartment: emp.department
    })) || []
  );

  const pendingRequests = allLeaveRequests.filter(req => req.status === 'pending');

  const handleAction = (request, actionType) => {
    setSelectedRequest(request);
    setAction(actionType);
    setComment('');
    setIsModalOpen(true);
  };

  const handleSubmitAction = () => {
    updateLeaveStatus(
      selectedRequest.employeeId,
      selectedRequest.id,
      action,
      comment
    );
    setIsModalOpen(false);
    setSelectedRequest(null);
    setComment('');
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

  const stats = {
    pending: allLeaveRequests.filter(r => r.status === 'pending').length,
    approved: allLeaveRequests.filter(r => r.status === 'approved').length,
    rejected: allLeaveRequests.filter(r => r.status === 'rejected').length,
    total: allLeaveRequests.length
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-purple-800">Leave Approvals</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
              <CheckSquare className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-sm text-yellow-700">Pending</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <FaCheck className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              <p className="text-sm text-green-700">Approved</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <X className="text-red-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              <p className="text-sm text-red-700">Rejected</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Calendar className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{stats.total}</p>
              <p className="text-sm text-purple-700">Total</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-purple-800 mb-4">
          Pending Requests ({pendingRequests.length})
        </h3>
        {pendingRequests.length > 0 ? (
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div key={request.id} className="p-4 bg-yellow-50 rounded-2xl border-2 border-yellow-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold shadow-[0_4px_8px_rgba(147,51,234,0.2)]">
                        {request.employeeName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-purple-800">{request.employeeName}</p>
                        <p className="text-xs text-purple-500">{request.employeeDepartment}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-purple-500">Type</p>
                        <p className="font-medium text-purple-800">{request.type}</p>
                      </div>
                      <div>
                        <p className="text-purple-500">Duration</p>
                        <p className="font-medium text-purple-800">
                          {request.startDate} {request.startDate !== request.endDate ? `- ${request.endDate}` : ''}
                        </p>
                      </div>
                      <div>
                        <p className="text-purple-500">Reason</p>
                        <p className="font-medium text-purple-800">{request.reason}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAction(request, 'approved')}
                      variant="success"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Check size={16} />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleAction(request, 'rejected')}
                      variant="danger"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <X size={16} />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaCheckSquare size={48} className="text-purple-300 mx-auto mb-4" />
            <p className="text-purple-500">No pending leave requests</p>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-purple-800 mb-4">All Leave History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-100">
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Employee</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Duration</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Reason</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Comments</th>
              </tr>
            </thead>
            <tbody>
              {allLeaveRequests.map((request) => (
                <tr key={request.id} className="border-b border-purple-50 hover:bg-purple-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-bold">
                        {request.employeeName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-purple-800">{request.employeeName}</p>
                        <p className="text-xs text-purple-500">{request.employeeDepartment}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-purple-600">{request.type}</td>
                  <td className="py-4 px-4 text-sm text-purple-600">
                    {request.startDate} {request.startDate !== request.endDate ? `- ${request.endDate}` : ''}
                  </td>
                  <td className="py-4 px-4 text-sm text-purple-600">{request.reason}</td>
                  <td className="py-4 px-4">{getStatusBadge(request.status)}</td>
                  <td className="py-4 px-4 text-sm text-purple-500">{request.comments || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${action === 'approved' ? 'Approve' : 'Reject'} Leave Request`}
      >
        <div className="space-y-4">
          <div className="p-4 bg-purple-50 rounded-2xl">
            <p className="text-sm text-purple-600 mb-1">Employee</p>
            <p className="font-semibold text-purple-800">{selectedRequest?.employeeName}</p>
            <p className="text-sm text-purple-600 mt-2 mb-1">Leave Type</p>
            <p className="font-semibold text-purple-800">{selectedRequest?.type}</p>
            <p className="text-sm text-purple-600 mt-2 mb-1">Duration</p>
            <p className="font-semibold text-purple-800">
              {selectedRequest?.startDate} {selectedRequest?.startDate !== selectedRequest?.endDate ? `- ${selectedRequest?.endDate}` : ''}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-700">Comments (Optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add any comments..."
              rows={3}
              className="w-full px-4 py-3 rounded-2xl bg-white/60 backdrop-blur-sm border-2 border-purple-200 text-purple-900 placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:shadow-[0_4px_12px_rgba(147,51,234,0.15)] transition-all duration-300 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSubmitAction}
              variant={action === 'approved' ? 'success' : 'danger'}
              className="flex-1"
            >
              {action === 'approved' ? 'Approve' : 'Reject'}
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

export default AdminLeave;
