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
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Leave Approvals</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4 rounded-lg flex flex-col justify-between h-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-amber-100 flex items-center justify-center">
              <FaClock className="text-amber-600" size={18} />
            </div>
            <div>
              <p className="text-xl font-semibold text-amber-600">{stats.pending}</p>
              <p className="text-xs text-amber-700 font-medium">Pending</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 rounded-lg flex flex-col justify-between h-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-emerald-100 flex items-center justify-center">
              <FaCheck className="text-emerald-600" size={18} />
            </div>
            <div>
              <p className="text-xl font-semibold text-emerald-600">{stats.approved}</p>
              <p className="text-xs text-emerald-700 font-medium">Approved</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 rounded-lg flex flex-col justify-between h-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-red-100 flex items-center justify-center">
              <FaTimes className="text-red-600" size={18} />
            </div>
            <div>
              <p className="text-xl font-semibold text-red-600">{stats.rejected}</p>
              <p className="text-xs text-red-700 font-medium">Rejected</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 rounded-lg flex flex-col justify-between h-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
              <FaCalendar className="text-gray-600" size={18} />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-600">{stats.total}</p>
              <p className="text-xs text-gray-700 font-medium">Total</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4 rounded-lg flex flex-col gap-4 h-full">
        <h3 className="text-base font-semibold text-gray-900">
          Pending Requests
          {pendingRequests.length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700 font-medium">{pendingRequests.length}</span>
          )}
        </h3>
        {pendingRequests.length > 0 ? (
          <div className="flex flex-col gap-3">
            {pendingRequests.map((request) => (
              <div key={request.id} className="p-4 bg-amber-50 rounded-md border border-amber-200 hover:border-amber-300 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-md bg-blue-600 flex items-center justify-center text-white font-medium text-sm">
                        {request.employeeName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{request.employeeName}</p>
                        <p className="text-xs text-gray-500">{request.employeeDepartment}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm pl-12">
                      <div>
                        <span className="text-gray-500 text-xs">Type</span>
                        <p className="font-medium text-gray-900">{request.type}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">Duration</span>
                        <p className="font-medium text-gray-900">
                          {request.startDate}{request.startDate !== request.endDate ? ` — ${request.endDate}` : ''}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">Reason</span>
                        <p className="font-medium text-gray-900">{request.reason}</p>
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
            <FaCheckSquare size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No pending leave requests</p>
          </div>
        )}
      </Card>

      <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col gap-4">
        <h3 className="text-base font-semibold text-gray-900">All Leave History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
              </tr>
            </thead>
            <tbody>
              {allLeaveRequests.map((request) => (
                <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                        {request.employeeName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{request.employeeName}</p>
                        <p className="text-xs text-gray-500">{request.employeeDepartment}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{request.type}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {request.startDate}{request.startDate !== request.endDate ? ` — ${request.endDate}` : ''}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 max-w-[200px] truncate" title={request.reason}>{request.reason}</td>
                  <td className="py-3 px-4">{getStatusBadge(request.status)}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{request.comments || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${action === 'approved' ? 'Approve' : 'Reject'} Leave Request`}
      >
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-gray-50 rounded-md flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FaUser size={13} className="text-gray-400" />
              <span className="text-sm text-gray-500">Employee</span>
              <span className="text-sm font-medium text-gray-900 ml-auto">{selectedRequest?.employeeName}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaFileAlt size={13} className="text-gray-400" />
              <span className="text-sm text-gray-500">Type</span>
              <span className="text-sm font-medium text-gray-900 ml-auto">{selectedRequest?.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendar size={13} className="text-gray-400" />
              <span className="text-sm text-gray-500">Duration</span>
              <span className="text-sm font-medium text-gray-900 ml-auto">
                {selectedRequest?.startDate}{selectedRequest?.startDate !== selectedRequest?.endDate ? ` — ${selectedRequest?.endDate}` : ''}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Comments <span className="text-gray-500 font-normal">(Optional)</span></label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add any comments..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-md bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
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
