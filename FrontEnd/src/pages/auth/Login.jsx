import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-pink-200/30 blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-40 h-40 rounded-full bg-blue-200/20 blur-3xl" />
      </div>
      <Card className="w-full max-w-md p-8 relative animate-scaleIn">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-[0_8px_24px_rgba(147,51,234,0.3)] animate-float">
            <span className="text-2xl font-extrabold text-white">H</span>
          </div>
          <h1 className="text-3xl font-extrabold gradient-text mb-1">HRPilot</h1>
          <p className="text-purple-500 text-sm font-medium">Sign in to your account</p>
        </div>

        {errors.form && (
          <div className="mb-4 p-3.5 bg-red-100/80 backdrop-blur-sm border border-red-200 text-red-700 rounded-xl text-sm font-medium flex items-center gap-2 animate-fadeIn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 4.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 11V11.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            icon={<FaEnvelope size={15} />}
          />
          <div className="space-y-1.5">
            <Input
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={<FaLock size={15} />}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs text-purple-500 hover:text-purple-700 font-medium transition-colors flex items-center gap-1 ml-1"
            >
              {showPassword ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <Button type="submit" className="w-full" size="lg" loading={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center mt-6 text-purple-500 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-purple-700 hover:text-purple-900 hover:underline transition-colors">
            Sign Up
          </Link>
        </p>

        <div className="mt-6 p-4 bg-purple-50/80 backdrop-blur-sm rounded-xl border border-purple-200/50">
          <p className="text-xs text-purple-600 font-semibold mb-2">Demo Credentials</p>
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => fillDemo('john.doe@company.com')}
              className="w-full text-left text-xs text-purple-500 hover:text-purple-700 hover:bg-purple-100/50 rounded-lg px-2 py-1.5 transition-colors font-medium"
            >
              Admin: john.doe@company.com / password123
            </button>
            <button
              type="button"
              onClick={() => fillDemo('jane.smith@company.com')}
              className="w-full text-left text-xs text-purple-500 hover:text-purple-700 hover:bg-purple-100/50 rounded-lg px-2 py-1.5 transition-colors font-medium"
            >
              Employee: jane.smith@company.com / password123
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
