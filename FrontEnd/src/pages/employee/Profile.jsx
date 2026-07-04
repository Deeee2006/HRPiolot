import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEmployee } from '../../context/EmployeeContext';
import { useToast } from '../../context/ToastContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Badge from '../../components/Badge';
import { FaUser, FaBriefcase, FaDollarSign, FaFileAlt, FaMapMarkerAlt, FaEnvelope, FaPhone, FaEdit, FaSave, FaTimes, FaDownload, FaIdBadge } from 'react-icons/fa';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const { updateEmployee } = useEmployee();
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleSave = () => {
    updateUserProfile({ phone: formData.phone, address: formData.address });
    updateEmployee(user?.id, { phone: formData.phone, address: formData.address });
    setIsEditing(false);
    addToast('Profile updated successfully', 'success');
  };

  const handleCancel = () => {
    setFormData({ phone: user?.phone || '', address: user?.address || '' });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">My Profile</h2>
          <p className="text-sm text-gray-500 mt-0.5">Your personal and professional details</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" icon={<FaEdit size={13} />}>
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 text-3xl font-bold mb-4">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{user?.name}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{user?.position}</p>
            <Badge variant="default" className="mt-2 capitalize">{user?.role}</Badge>
            {user?.department && (
              <p className="text-xs text-gray-500 mt-2">{user?.department}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaEnvelope size={13} className="text-gray-400 shrink-0" />
              <span className="text-sm text-gray-700 truncate">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaIdBadge size={13} className="text-gray-400 shrink-0" />
              <span className="text-sm text-gray-700">{user?.id}</span>
            </div>
          </div>
        </Card>

        {/* Details Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Personal Details */}
          <Card>
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <FaUser size={15} className="text-gray-400" />
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 font-medium mb-0.5">Employee ID</p>
                <p className="text-sm font-medium text-gray-900">{user?.id}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 font-medium mb-0.5">Join Date</p>
                <p className="text-sm font-medium text-gray-900">{user?.joinDate}</p>
              </div>
              {isEditing ? (
                <>
                  <Input label="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} icon={<FaPhone size={13} />} />
                  <Input label="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} icon={<FaMapMarkerAlt size={13} />} />
                </>
              ) : (
                <>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium mb-0.5">Phone</p>
                    <p className="text-sm font-medium text-gray-900">{user?.phone || <span className="text-gray-400 italic">Not provided</span>}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium mb-0.5">Address</p>
                    <p className="text-sm font-medium text-gray-900">{user?.address || <span className="text-gray-400 italic">Not provided</span>}</p>
                  </div>
                </>
              )}
            </div>
            {isEditing && (
              <div className="flex gap-2 mt-4">
                <Button onClick={handleSave} size="sm" icon={<FaSave size={13} />}>Save</Button>
                <Button onClick={handleCancel} variant="outline" size="sm" icon={<FaTimes size={13} />}>Cancel</Button>
              </div>
            )}
          </Card>

          {/* Job Details */}
          <Card>
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <FaBriefcase size={15} className="text-gray-400" />
              Job Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 font-medium mb-0.5">Department</p>
                <p className="text-sm font-medium text-gray-900">{user?.department}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 font-medium mb-0.5">Position</p>
                <p className="text-sm font-medium text-gray-900">{user?.position}</p>
              </div>
            </div>
          </Card>

          {/* Salary */}
          <Card>
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <FaDollarSign size={15} className="text-gray-400" />
              Salary Information
            </h3>
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-xs text-emerald-600 font-medium mb-1">Annual Salary</p>
              <p className="text-2xl font-bold text-emerald-700">${user?.salary?.toLocaleString()}</p>
            </div>
          </Card>

          {/* Documents */}
          <Card>
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <FaFileAlt size={15} className="text-gray-400" />
              Documents
            </h3>
            {user?.documents?.length > 0 ? (
              <div className="flex flex-col gap-2">
                {user.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FaFileAlt size={14} className="text-gray-400 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">Uploaded: {doc.uploaded}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" icon={<FaDownload size={12} />}>View</Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <FaFileAlt size={24} className="text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No documents uploaded</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
