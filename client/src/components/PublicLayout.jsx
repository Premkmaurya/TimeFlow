import { Outlet } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';

const PublicLayout = () => {
  return (
    <div className="min-h-screen overflow-y-hidden bg-white text-gray-900">
      <PublicNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;