import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Badge from '../../components/Badge';
import { FaUser, FaBriefcase, FaDollarSign, FaFileAlt, FaMapMarkerAlt, FaEnvelope, FaCalendar } from 'react-icons/fa';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-purple-800">My Profile</h2>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-3xl font-bold shadow-[0_8px_16px_rgba(147,51,234,0.3)] mb-4">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <h3 className="text-xl font-bold text-purple-800">{user?.name}</h3>
            <p className="text-purple-600 capitalize">{user?.position}</p>
            <Badge variant="default" className="mt-2 capitalize">
              {user?.role}
            </Badge>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm text-purple-700">
              <FaEnvelope size={16} />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-purple-700">
              <FaMapMarkerAlt size={16} />
              <span>{user?.department}</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
              <FaUser size={20} />
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-purple-500 font-medium">Employee ID</label>
                <p className="text-sm font-semibold text-purple-800">{user?.id}</p>
              </div>
              <div>
                <label className="text-xs text-purple-500 font-medium">Join Date</label>
                <p className="text-sm font-semibold text-purple-800">{user?.joinDate}</p>
              </div>
              {isEditing ? (
                <>
                  <Input
                    label="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Input
                    label="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </>
              ) : (
                <>
                  <div>
                    <label className="text-xs text-purple-500 font-medium">Phone</label>
                    <p className="text-sm font-semibold text-purple-800">{user?.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-purple-500 font-medium">Address</label>
                    <p className="text-sm font-semibold text-purple-800">{user?.address || 'Not provided'}</p>
                  </div>
                </>
              )}
            </div>
            {isEditing && (
              <div className="flex gap-2 mt-4">
                <Button onClick={handleSave} size="sm">Save</Button>
                <Button onClick={handleCancel} variant="outline" size="sm">Cancel</Button>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
              <FaBriefcase size={20} />
              Job Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-purple-500 font-medium">Department</label>
                <p className="text-sm font-semibold text-purple-800">{user?.department}</p>
              </div>
              <div>
                <label className="text-xs text-purple-500 font-medium">Position</label>
                <p className="text-sm font-semibold text-purple-800">{user?.position}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
              <FaDollarSign size={20} />
              Salary Information
            </h3>
            <div className="p-4 bg-green-50 rounded-2xl">
              <label className="text-xs text-green-600 font-medium">Annual Salary</label>
              <p className="text-2xl font-bold text-green-700">${user?.salary?.toLocaleString()}</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
              <FaFileAlt size={20} />
              Documents
            </h3>
            {user?.documents?.length > 0 ? (
              <div className="space-y-2">
                {user.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <FaFileAlt size={18} className="text-purple-600" />
                      <div>
                        <p className="text-sm font-medium text-purple-800">{doc.name}</p>
                        <p className="text-xs text-purple-500">Uploaded: {doc.uploaded}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-purple-500">No documents uploaded</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
