import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children, title }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-pink-50/40 to-blue-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={title} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="animate-fadeInUp">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
