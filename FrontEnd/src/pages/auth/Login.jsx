import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { LuMail, LuLock, LuEye, LuEyeOff, LuBuilding, LuShield, LuUsers, LuCalendarCheck, LuArrowRight } from 'react-icons/lu';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!formData.email.includes('@')) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const result = login(formData.email, formData.password);
    setIsLoading(false);
    if (result.success) {
      navigate(result.user.role === 'admin' ? '/admin/dashboard' : '/employee/dashboard');
    } else {
      setErrors({ ...errors, form: result.error });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '', form: '' });
  };

  const fillDemo = (email) => {
    setFormData({ email, password: 'password123' });
    setErrors({});
  };

  const features = [
    { icon: <LuBuilding size={18} />, text: 'Smart Dashboard' },
    { icon: <LuUsers size={18} />, text: 'Employee Management' },
    { icon: <LuCalendarCheck size={18} />, text: 'Leave Tracking' },
    { icon: <LuShield size={18} />, text: 'Role-Based Access' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-200/25 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-pink-200/25 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-blue-200/15 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-purple-300/15 blur-3xl" />
      </div>

      {/* Left: Branding */}
      <div className="hidden lg:flex w-1/2 min-h-screen relative items-center justify-center p-12">
        <div className="max-w-md animate-fadeIn">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-[0_12px_36px_rgba(147,51,234,0.35)] animate-float">
            <span className="text-3xl font-extrabold text-white">H</span>
          </div>
          <h1 className="text-4xl font-extrabold gradient-text mb-3">HRPilot</h1>
          <p className="text-purple-500/80 text-lg leading-relaxed mb-10">
            Your all-in-one HR management solution. Streamline operations, empower your team.
          </p>
          <div className="space-y-4">
            {features.map((feature, i) => (
              <div
                key={feature.text}
                className="flex items-center gap-3 text-purple-700 animate-slideUpFade"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-white/70 backdrop-blur-sm flex items-center justify-center text-purple-500 shadow-[0_2px_8px_rgba(147,51,234,0.08)]">
                  {feature.icon}
                </div>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-purple-200/30">
            <p className="text-xs text-purple-400 italic">
              "HRPilot transformed how we manage our workforce. Absolutely essential."
            </p>
            <p className="text-xs text-purple-500 font-semibold mt-2">— Sarah Chen, HR Director</p>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md animate-scaleIn">
          {/* Mobile logo */}
          <div className="text-center lg:hidden mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3 shadow-[0_8px_24px_rgba(147,51,234,0.3)]">
              <span className="text-xl font-extrabold text-white">H</span>
            </div>
            <h1 className="text-2xl font-extrabold gradient-text">HRPilot</h1>
          </div>

          <div className="clay-card p-8">
            <div className="mb-7">
              <h2 className="text-2xl font-extrabold text-purple-900">Welcome back</h2>
              <p className="text-purple-500 text-sm mt-1">Sign in to your account to continue</p>
            </div>

            {errors.form && (
              <div className="mb-5 p-3.5 bg-red-100/80 backdrop-blur-sm border border-red-200 text-red-700 rounded-xl text-sm font-medium flex items-center gap-2.5 animate-shake">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 4.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8 11V11.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>{errors.form}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div className="animate-slideUpFade delay-1">
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
              <div className="animate-slideUpFade delay-2">
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  icon={<LuLock size={16} />}
                  floating
                  autoComplete="current-password"
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-purple-400 hover:text-purple-600 transition-colors p-1"
                      tabIndex={-1}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <LuEyeOff size={17} /> : <LuEye size={17} />}
                    </button>
                  }
                />
              </div>

              <div className="flex items-center justify-between text-sm animate-slideUpFade delay-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="clay-checkbox"
                  />
                  <span className="text-purple-500 group-hover:text-purple-700 transition-colors font-medium">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-purple-500 hover:text-purple-700 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <div className="animate-slideUpFade delay-4">
                <Button
                  type="submit"
                  className="w-full h-11 mt-2 rounded-xl"
                  size="custom"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                  {!isLoading && <LuArrowRight size={18} />}
                </Button>
              </div>
            </form>

            <div className="mt-6 animate-slideUpFade delay-5">
              <div className="divider-text justify-center mb-4">
                <span>or continue with</span>
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

            <p className="text-center text-sm mt-2 animate-fadeIn delay-6">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-purple-700 hover:text-purple-900 transition-colors">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 pt-4 border-t border-purple-200/30 clay-card p-4 animate-slideUpFade delay-7">
            <p className="text-xs text-purple-600 font-semibold mb-2.5 flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
              Quick access
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => fillDemo('john.doe@company.com')}
                className="w-full text-left text-xs text-purple-500 hover:text-purple-700 hover:bg-purple-100/50 p-3 rounded-xl transition-all font-medium border border-purple-200/30 hover:border-purple-300/50"
              >
                <span className="text-purple-700 font-semibold">Admin</span>
                <br />john.doe@company.com
              </button>
              <button
                type="button"
                onClick={() => fillDemo('jane.smith@company.com')}
                className="w-full text-left text-xs text-purple-500 hover:text-purple-700 hover:bg-purple-100/50 p-3 rounded-xl transition-all font-medium border border-purple-200/30 hover:border-purple-300/50"
              >
                <span className="text-purple-700 font-semibold">Employee</span>
                <br />jane.smith@company.com
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
