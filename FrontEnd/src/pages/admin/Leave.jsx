import { useState } from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import { useToast } from '../../context/ToastContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Modal from '../../components/Modal';
import { FaCheckSquare, FaCheck, FaTimes, FaCalendar, FaUser, FaFileAlt, FaClock } from 'react-icons/fa';

const AdminLeave = () => {
  const { employees, updateLeaveStatus } = useEmployee();
  const { addToast } = useToast();
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
    updateLeaveStatus(selectedRequest.employeeId, selectedRequest.id, action, comment);
    setIsModalOpen(false);
    setSelectedRequest(null);
    setComment('');
    addToast(`Leave request ${action} successfully`, action === 'approved' ? 'success' : 'warning');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved': return <Badge variant="success">Approved</Badge>;
      case 'rejected': return <Badge variant="danger">Rejected</Badge>;
      case 'pending': return <Badge variant="warning">Pending</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
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
      <h2 className="text-2xl font-bold text-purple-800">Leave Approvals</h2>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100/80 flex items-center justify-center">
              <FaClock className="text-amber-600" size={18} />
            </div>
            <div>
              <p className="text-xl font-bold text-amber-600">{stats.pending}</p>
              <p className="text-xs text-amber-700 font-medium">Pending</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center">
              <FaCheck className="text-emerald-600" size={18} />
            </div>
            <div>
              <p className="text-xl font-bold text-emerald-600">{stats.approved}</p>
              <p className="text-xs text-emerald-700 font-medium">Approved</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100/80 flex items-center justify-center">
              <FaTimes className="text-red-600" size={18} />
            </div>
            <div>
              <p className="text-xl font-bold text-red-600">{stats.rejected}</p>
              <p className="text-xs text-red-700 font-medium">Rejected</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100/80 flex items-center justify-center">
              <FaCalendar className="text-purple-600" size={18} />
            </div>
            <div>
              <p className="text-xl font-bold text-purple-600">{stats.total}</p>
              <p className="text-xs text-purple-700 font-medium">Total</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-base font-bold text-purple-800 mb-4">
          Pending Requests
          {pendingRequests.length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700 font-semibold">{pendingRequests.length}</span>
          )}
        </h3>
        {pendingRequests.length > 0 ? (
          <div className="space-y-3">
            {pendingRequests.map((request) => (
              <div key={request.id} className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/60 hover:border-amber-300/60 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm shadow-[0_4px_8px_rgba(147,51,234,0.2)]">
                        {request.employeeName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-purple-800">{request.employeeName}</p>
                        <p className="text-xs text-purple-400">{request.employeeDepartment}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm pl-12">
                      <div>
                        <span className="text-purple-400 text-xs">Type</span>
                        <p className="font-medium text-purple-800">{request.type}</p>
                      </div>
                      <div>
                        <span className="text-purple-400 text-xs">Duration</span>
                        <p className="font-medium text-purple-800">
                          {request.startDate}{request.startDate !== request.endDate ? ` — ${request.endDate}` : ''}
                        </p>
                      </div>
                      <div>
                        <span className="text-purple-400 text-xs">Reason</span>
                        <p className="font-medium text-purple-800">{request.reason}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pl-12 md:pl-0">
                    <Button onClick={() => handleAction(request, 'approved')} variant="success" size="sm" icon={<FaCheck size={13} />}>
                      Approve
                    </Button>
                    <Button onClick={() => handleAction(request, 'rejected')} variant="danger" size="sm" icon={<FaTimes size={13} />}>
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaCheckSquare size={40} className="text-purple-300 mx-auto mb-3" />
            <p className="text-purple-400 text-sm">No pending leave requests</p>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="text-base font-bold text-purple-800 mb-4">All Leave History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-100/60">
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Employee</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Type</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Duration</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Reason</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Comments</th>
              </tr>
            </thead>
            <tbody>
              {allLeaveRequests.map((request) => (
                <tr key={request.id} className="border-b border-purple-50/60 hover:bg-purple-50/40 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-bold">
                        {request.employeeName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-purple-800">{request.employeeName}</p>
                        <p className="text-xs text-purple-400">{request.employeeDepartment}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-purple-500">{request.type}</td>
                  <td className="py-4 px-4 text-sm text-purple-500">
                    {request.startDate}{request.startDate !== request.endDate ? ` — ${request.endDate}` : ''}
                  </td>
                  <td className="py-4 px-4 text-sm text-purple-500 max-w-[200px] truncate" title={request.reason}>{request.reason}</td>
                  <td className="py-4 px-4">{getStatusBadge(request.status)}</td>
                  <td className="py-4 px-4 text-sm text-purple-400">{request.comments || '—'}</td>
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
          <div className="p-4 bg-purple-50/60 rounded-xl space-y-2">
            <div className="flex items-center gap-2">
              <FaUser size={13} className="text-purple-400" />
              <span className="text-sm text-purple-500">Employee</span>
              <span className="text-sm font-semibold text-purple-800 ml-auto">{selectedRequest?.employeeName}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaFileAlt size={13} className="text-purple-400" />
              <span className="text-sm text-purple-500">Type</span>
              <span className="text-sm font-semibold text-purple-800 ml-auto">{selectedRequest?.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendar size={13} className="text-purple-400" />
              <span className="text-sm text-purple-500">Duration</span>
              <span className="text-sm font-semibold text-purple-800 ml-auto">
                {selectedRequest?.startDate}{selectedRequest?.startDate !== selectedRequest?.endDate ? ` — ${selectedRequest?.endDate}` : ''}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-purple-700">Comments <span className="text-purple-400 font-normal">(Optional)</span></label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add any comments..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-white/60 backdrop-blur-sm border-2 border-purple-200/60 text-purple-900 placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:shadow-[0_4px_16px_rgba(147,51,234,0.1)] transition-all duration-300 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={handleSubmitAction} variant={action === 'approved' ? 'success' : 'danger'} className="flex-1">
              {action === 'approved' ? 'Approve' : 'Reject'}
            </Button>
            <Button onClick={() => setIsModalOpen(false)} variant="outline" className="flex-1">Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminLeave;
