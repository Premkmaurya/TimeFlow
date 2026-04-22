import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { Clock, Bell } from "lucide-react";
import { selectUnreadCount } from "../features/notifications/notificationSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const unreadCount = useSelector(selectUnreadCount);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <nav className="glass sticky top-0 z-50 p-4 border-b border-white/60">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-500 hover:opacity-80 transition-smooth"
        >
          <Clock className="w-8 h-8 text-indigo-600" />
          Overtime Tracker
        </Link>

        <div className="flex items-center gap-6 font-medium">
          {/* Notification Bell */}
          {user && (
            <div className="relative">
              <button className="relative p-2 rounded-full hover:bg-slate-100 transition">
                <Bell className="w-6 h-6 text-slate-500" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 animate-pulse shadow">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          )}
          {user ? (
            <>
              <span className="text-slate-600">Hi, {user.firstName}</span>
              <button
                className="px-4 py-2 rounded-lg bg-white shadow-sm border border-slate-100 text-indigo-600 hover:bg-slate-50 font-semibold transition-smooth"
                onClick={onLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-600 hover:text-indigo-600 transition-smooth"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-300 hover:bg-indigo-700 hover:-translate-y-0.5 transition-smooth"
              >
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
