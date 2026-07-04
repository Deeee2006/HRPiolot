import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { LuMail, LuLock, LuEye, LuEyeOff, LuIdCard, LuBuilding, LuUsers, LuCalendarCheck, LuShield, LuUserPlus, LuChevronDown } from 'react-icons/lu';

const Signup = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'employee'
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { addToast } = useToast();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.employeeId) newErrors.employeeId = 'Employee ID is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!formData.email.includes('@')) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const result = signup(formData.employeeId, formData.email, formData.password, formData.role);
    setIsLoading(false);
    if (result.success) {
      addToast('Account created successfully! Welcome aboard.', 'success');
      navigate('/employee/dashboard');
    } else {
      setErrors({ ...errors, form: result.error });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '', form: '' });
  };

  const features = [
    { icon: <LuBuilding size={18} />, text: 'Smart Dashboard' },
    { icon: <LuUsers size={18} />, text: 'Employee Management' },
    { icon: <LuCalendarCheck size={18} />, text: 'Leave Tracking' },
    { icon: <LuShield size={18} />, text: 'Role-Based Access' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex relative overflow-hidden">

      {/* Left: Branding */}
      <div className="hidden lg:flex w-1/2 min-h-screen relative items-center justify-center p-12">
        <div className="max-w-md">
          <div className="w-16 h-16 rounded-lg bg-blue-600 flex items-center justify-center mb-6">
            <span className="text-2xl font-bold text-white">H</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">HRPilot</h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            Join the platform that makes HR management effortless and efficient.
          </p>
          <div className="space-y-4">
            {features.map((feature, i) => (
              <div
                key={feature.text}
                className="flex items-center gap-3 text-gray-700"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500">
                  {feature.icon}
                </div>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 p-4 bg-white border border-gray-200 rounded-lg">
            <p className="text-xs text-gray-600 font-semibold">Start your free trial today</p>
            <p className="text-xs text-gray-500 mt-0.5">No credit card required. Full access.</p>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md animate-scaleIn">
          {/* Mobile logo */}
          <div className="text-center lg:hidden mb-6">
            <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-white">H</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">HRPilot</h1>
          </div>

          <div className="auth-card p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Create account</h2>
              <p className="text-gray-600 text-sm mt-1">Fill in your details to get started</p>
            </div>

            {errors.form && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm font-medium flex items-center gap-2.5 animate-shake">
                <span>{errors.form}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <Input
                  label="Employee ID"
                  name="employeeId"
                  type="text"
                  value={formData.employeeId}
                  onChange={handleChange}
                  error={errors.employeeId}
                  icon={<LuIdCard size={16} />}
                  floating
                />
              </div>
              <div>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  icon={<LuMail size={16} />}
                  floating
                  autoComplete="email"
                />
              </div>
              <div>
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  icon={<LuLock size={16} />}
                  floating
                  autoComplete="new-password"
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                      tabIndex={-1}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <LuEyeOff size={17} /> : <LuEye size={17} />}
                    </button>
                  }
                />
              </div>
              <div>
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  icon={<LuLock size={16} />}
                  floating
                  autoComplete="new-password"
                />
              </div>

              <div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Role</label>
                  <div className="relative">
                    <LuShield size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-2.5 rounded-md bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 appearance-none cursor-pointer minimal-select"
                    >
                      <option value="employee">Employee</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                  {!isLoading && <LuUserPlus size={18} />}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="divider-text justify-center mb-4">
                <span>or sign up with</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Google
                </button>
                <button type="button" className="social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  GitHub
                </button>
              </div>
            </div>

            <p className="text-center mt-6 text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-gray-700 hover:text-gray-900 transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
