import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEmployee } from '../../context/EmployeeContext';
import { useToast } from '../../context/ToastContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Badge from '../../components/Badge';
import {
  FaUser, FaBriefcase, FaDollarSign, FaFileAlt, FaMapMarkerAlt,
  FaEnvelope, FaPhone, FaEdit, FaSave, FaTimes, FaDownload,
  FaIdBadge, FaCalendarAlt, FaBuilding
} from 'react-icons/fa';

/* Reusable Components for clean layout */
const InfoTile = ({ icon, label, value, placeholder = 'Not provided' }) => (
  <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] transition-all hover:bg-gray-50/80 hover:shadow-sm">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-400 border border-gray-100">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">{label}</p>
      <p className="truncate text-sm font-semibold text-gray-800">
        {value || <span className="font-normal italic text-gray-400">{placeholder}</span>}
      </p>
    </div>
  </div>
);

const SectionHeader = ({ icon, title, action }) => (
  <div className="mb-6 flex items-center justify-between border-b border-gray-100/80 pb-5">
    <h3 className="flex items-center gap-3 text-base font-bold text-gray-900">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-sm shadow-blue-500/10">
        {icon}
      </span>
      {title}
    </h3>
    {action}
  </div>
);

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
    <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 lg:gap-10 p-4 sm:p-6 lg:p-8 bg-gray-50/30 min-h-screen">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">My Profile</h2>
          <p className="mt-2 text-sm text-gray-500">View and update your personal and professional profile details.</p>
        </div>
        {!isEditing && (
          <Button 
            onClick={() => setIsEditing(true)} 
            variant="outline" 
            size="sm" 
            icon={<FaEdit size={13} />}
            className="rounded-xl shadow-sm self-start sm:self-end whitespace-nowrap"
          >
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-8 items-start">
        
        {/* Profile Card Left-Side */}
        <Card className="overflow-hidden p-0 lg:col-span-1 rounded-2xl border border-gray-100 shadow-sm bg-white h-fit">
          <div className="h-28 bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600" />

          <div className="flex flex-col items-center px-6 pb-8 text-center">
            <div className="-mt-14 flex h-28 w-28 items-center justify-center rounded-2xl bg-white p-2 shadow-lg shadow-gray-200/50">
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-4xl font-extrabold text-white shadow-inner">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900 tracking-tight">{user?.name}</h3>
            <p className="mt-1.5 text-sm font-medium text-gray-500">{user?.position}</p>

            <div className="mt-5 flex items-center gap-2 flex-wrap justify-center">
              <Badge variant="default" className="capitalize px-3 py-1.5 font-semibold rounded-lg text-xs">{user?.role}</Badge>
              {user?.department && (
                <Badge variant="outline" className="text-gray-500 border-gray-200 bg-gray-50 px-3 py-1.5 font-medium rounded-lg text-xs">{user?.department}</Badge>
              )}
            </div>

            <div className="mt-8 w-full flex flex-col gap-2 border-t border-gray-100 pt-6 text-left">
              <div className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-50/50 transition-colors">
                <FaEnvelope size={14} className="shrink-0 text-gray-400" />
                <span className="truncate text-sm font-medium text-gray-600">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-50/50 transition-colors">
                <FaIdBadge size={14} className="shrink-0 text-gray-400" />
                <span className="text-sm font-semibold text-gray-600">{user?.id}</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-50/50 transition-colors">
                <FaCalendarAlt size={14} className="shrink-0 text-gray-400" />
                <span className="text-sm font-medium text-gray-500">Joined {user?.joinDate}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Details Column Right-Side */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:col-span-2">
          
          {/* Personal Details */}
          <Card className="p-6 sm:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <SectionHeader
              icon={<FaUser size={14} />}
              title="Personal Details"
              action={isEditing && (
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm" icon={<FaSave size={12} />} className="rounded-xl">Save</Button>
                  <Button onClick={handleCancel} variant="outline" size="sm" icon={<FaTimes size={12} />} className="rounded-xl">Cancel</Button>
                </div>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoTile icon={<FaIdBadge size={15} />} label="Employee ID" value={user?.id} />
              <InfoTile icon={<FaCalendarAlt size={15} />} label="Join Date" value={user?.joinDate} />

              {isEditing ? (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-1">Phone</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      icon={<FaPhone size={13} className="text-gray-400" />}
                      placeholder="Enter phone number"
                      className="rounded-xl h-11 bg-gray-50 border border-gray-200 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-1">Address</label>
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      icon={<FaMapMarkerAlt size={13} className="text-gray-400" />}
                      placeholder="Enter address"
                      className="rounded-xl h-11 bg-gray-50 border border-gray-200 focus:bg-white transition-all"
                    />
                  </div>
                </>
              ) : (
                <>
                  <InfoTile icon={<FaPhone size={15} />} label="Phone" value={user?.phone} />
                  <InfoTile icon={<FaMapMarkerAlt size={15} />} label="Address" value={user?.address} />
                </>
              )}
            </div>
          </Card>

          {/* Job Details */}
          <Card className="p-6 sm:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <SectionHeader icon={<FaBriefcase size={14} />} title="Job Details" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoTile icon={<FaBuilding size={15} />} label="Department" value={user?.department} />
              <InfoTile icon={<FaBriefcase size={15} />} label="Position" value={user?.position} />
            </div>
          </Card>

          {/* Salary Information */}
          <Card className="p-6 sm:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <SectionHeader icon={<FaDollarSign size={14} />} title="Salary Information" />
            <div className="flex items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-emerald-50/30 to-teal-50/20 p-6 sm:p-8 border border-emerald-100/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)]">
              <div className="flex-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600/90">Annual Base Salary</p>
                <p className="mt-2.5 text-3xl sm:text-4xl font-extrabold text-emerald-700 tracking-tight">
                  ${user?.salary?.toLocaleString() || '0'}
                </p>
              </div>
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-md shadow-emerald-600/5 border border-emerald-100">
                <FaDollarSign size={24} />
              </div>
            </div>
          </Card>

          {/* Documents Section */}
          <Card className="p-6 sm:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <SectionHeader icon={<FaFileAlt size={14} />} title="Documents" />
            {user?.documents?.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {user.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] transition-all hover:bg-gray-50/80"
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500 border border-blue-100/50">
                        <FaFileAlt size={14} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-800 leading-tight">{doc.name}</p>
                        <p className="text-[11px] font-medium text-gray-400 mt-1">Uploaded {doc.uploaded}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" icon={<FaDownload size={12} />} className="text-gray-400 hover:text-blue-600 rounded-lg shrink-0">View</Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/30 py-16 px-4 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100">
                  <FaFileAlt size={18} className="text-gray-300" />
                </div>
                <p className="text-sm font-semibold text-gray-700">No documents uploaded</p>
                <p className="mt-1.5 text-xs text-gray-500">Important files and contract PDFs will show up here.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;