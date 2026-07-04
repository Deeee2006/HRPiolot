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
    <div className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-purple-800">My Profile</h2>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" icon={<FaEdit size={14} />}>
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-4 rounded-2xl flex flex-col gap-4 h-full lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-3xl font-bold shadow-[0_8px_24px_rgba(147,51,234,0.3)] mb-4">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <h3 className="text-xl font-bold text-purple-800">{user?.name}</h3>
            <p className="text-sm text-purple-500">{user?.position}</p>
            <Badge variant="default" className="mt-2 capitalize">{user?.role}</Badge>
            {user?.department && (
              <p className="text-xs text-purple-400 mt-2">{user?.department}</p>
            )}
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3 p-2.5 bg-purple-50/60 rounded-xl">
              <FaEnvelope size={14} className="text-purple-400" />
              <span className="text-sm text-purple-700 truncate">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 p-2.5 bg-purple-50/60 rounded-xl">
              <FaIdBadge size={14} className="text-purple-400" />
              <span className="text-sm text-purple-700">{user?.id}</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="p-4 rounded-2xl flex flex-col gap-4 h-full">
            <h3 className="text-base font-bold text-purple-800 flex items-center gap-2">
              <FaUser size={16} />
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-purple-50/60 rounded-xl">
                <label className="text-xs text-purple-400 font-medium">Employee ID</label>
                <p className="text-sm font-semibold text-purple-800">{user?.id}</p>
              </div>
              <div className="p-3 bg-purple-50/60 rounded-xl">
                <label className="text-xs text-purple-400 font-medium">Join Date</label>
                <p className="text-sm font-semibold text-purple-800">{user?.joinDate}</p>
              </div>
              {isEditing ? (
                <>
                  <Input label="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} icon={<FaPhone size={14} />} />
                  <Input label="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} icon={<FaMapMarkerAlt size={14} />} />
                </>
              ) : (
                <>
                  <div className="p-3 bg-purple-50/60 rounded-xl">
                    <label className="text-xs text-purple-400 font-medium">Phone</label>
                    <p className="text-sm font-semibold text-purple-800">{user?.phone || <span className="text-purple-300 italic">Not provided</span>}</p>
                  </div>
                  <div className="p-3 bg-purple-50/60 rounded-xl">
                    <label className="text-xs text-purple-400 font-medium">Address</label>
                    <p className="text-sm font-semibold text-purple-800">{user?.address || <span className="text-purple-300 italic">Not provided</span>}</p>
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

          <Card className="p-4 rounded-2xl flex flex-col gap-4 h-full">
            <h3 className="text-base font-bold text-purple-800 flex items-center gap-2">
              <FaBriefcase size={16} />
              Job Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-purple-50/60 rounded-xl">
                <label className="text-xs text-purple-400 font-medium">Department</label>
                <p className="text-sm font-semibold text-purple-800">{user?.department}</p>
              </div>
              <div className="p-3 bg-purple-50/60 rounded-xl">
                <label className="text-xs text-purple-400 font-medium">Position</label>
                <p className="text-sm font-semibold text-purple-800">{user?.position}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl flex flex-col gap-4 h-full">
            <h3 className="text-base font-bold text-purple-800 flex items-center gap-2">
              <FaDollarSign size={16} />
              Salary Information
            </h3>
            <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-100/50">
              <label className="text-xs text-emerald-600 font-medium">Annual Salary</label>
              <p className="text-2xl font-bold text-emerald-700">${user?.salary?.toLocaleString()}</p>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl flex flex-col gap-4 h-full">
            <h3 className="text-base font-bold text-purple-800 flex items-center gap-2">
              <FaFileAlt size={16} />
              Documents
            </h3>
            {user?.documents?.length > 0 ? (
              <div className="flex flex-col gap-2">
                {user.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-purple-50/60 rounded-xl">
                    <div className="flex items-center gap-3">
                      <FaFileAlt size={16} className="text-purple-400" />
                      <div>
                        <p className="text-sm font-medium text-purple-800">{doc.name}</p>
                        <p className="text-xs text-purple-400">Uploaded: {doc.uploaded}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" icon={<FaDownload size={12} />}>View</Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-purple-50/40 rounded-xl">
                <FaFileAlt size={28} className="text-purple-300 mx-auto mb-2" />
                <p className="text-sm text-purple-400">No documents uploaded</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
