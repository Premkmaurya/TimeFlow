import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { Clock, Bell } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    };

    return (
        <nav className="glass sticky top-0 z-50 p-4 border-b border-white/60">
            <div className="container mx-auto flex justify-between items-center max-w-7xl">
                <Link to="/" className="flex items-center gap-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-500 hover:opacity-80 transition-smooth">
                    <Clock className="w-8 h-8 text-indigo-600" />
                    Overtime Tracker
                </Link>
                
                <div className="flex items-center gap-6 font-medium">
                    {user ? (
                        <>
                            <div className="relative cursor-pointer text-slate-500 hover:text-indigo-600 transition-colors">
                                <Bell className="w-6 h-6" />
                                <span className="absolute -top-1 -right-1 bg-pink-500 shadow-sm shadow-pink-200 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    3
                                </span>
                            </div>
                            <span className="text-slate-600">Hi, {user.first_name}</span>
                            <button className="px-4 py-2 rounded-lg bg-white shadow-sm border border-slate-100 text-indigo-600 hover:bg-slate-50 font-semibold transition-smooth" onClick={onLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-slate-600 hover:text-indigo-600 transition-smooth">Login</Link>
                            <Link to="/register" className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-300 hover:bg-indigo-700 hover:-translate-y-0.5 transition-smooth">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
