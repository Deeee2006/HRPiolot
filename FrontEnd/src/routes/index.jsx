import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { EmployeeProvider } from '../context/EmployeeContext';
import { ToastProvider } from '../context/ToastContext';
import ProtectedRoute from './ProtectedRoute';

// Auth Pages
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';

// Layout
import DashboardLayout from '../layouts/DashboardLayout';

// Employee Pages
import EmployeeDashboard from '../pages/employee/Dashboard';
import EmployeeProfile from '../pages/employee/Profile';
import EmployeeAttendance from '../pages/employee/Attendance';
import EmployeeLeave from '../pages/employee/Leave';
import EmployeePayroll from '../pages/employee/Payroll';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import AdminEmployees from '../pages/admin/Employees';
import AdminAttendance from '../pages/admin/Attendance';
import AdminLeave from '../pages/admin/Leave';
import AdminPayroll from '../pages/admin/Payroll';

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Default redirect */}
      <Route 
        path="/" 
        element={
          user ? (
            user.role === 'admin' ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Navigate to="/employee/dashboard" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />

      {/* Employee Routes */}
      <Route
        path="/employee/dashboard"
        element={
          <ProtectedRoute requiredRole="employee">
            <DashboardLayout title="Dashboard">
              <EmployeeDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee/profile"
        element={
          <ProtectedRoute requiredRole="employee">
            <DashboardLayout title="Profile">
              <EmployeeProfile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee/attendance"
        element={
          <ProtectedRoute requiredRole="employee">
            <DashboardLayout title="Attendance">
              <EmployeeAttendance />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee/leave"
        element={
          <ProtectedRoute requiredRole="employee">
            <DashboardLayout title="Leave Requests">
              <EmployeeLeave />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee/payroll"
        element={
          <ProtectedRoute requiredRole="employee">
            <DashboardLayout title="Payroll">
              <EmployeePayroll />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout title="Admin Dashboard">
              <AdminDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/employees"
        element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout title="Employees">
              <AdminEmployees />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/attendance"
        element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout title="Attendance Overview">
              <AdminAttendance />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/leave"
        element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout title="Leave Approvals">
              <AdminLeave />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/payroll"
        element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout title="Payroll Management">
              <AdminPayroll />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const RootRoutes = () => {
  return (
    <AuthProvider>
      <EmployeeProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </EmployeeProvider>
    </AuthProvider>
  );
};

export default RootRoutes;
