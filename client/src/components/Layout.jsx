import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 text-slate-800">
            <Navbar />
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
