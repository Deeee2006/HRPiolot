import { BrowserRouter } from 'react-router-dom';
import RootRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <EmployeeProvider>
            <RootRoutes />
          </EmployeeProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
