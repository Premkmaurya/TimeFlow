import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";

const Layout = () => {
  const { user, loading, error } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // If the token is invalid/expired and fetching the user failed, log them out
    if (!user && !loading && token && error) {
      dispatch(logoutUser());
    }
  }, [user, loading, token, error, dispatch]);

  // If there is no user and no token (or token was just cleared), redirect immediately
  if (!user && !localStorage.getItem("token")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If there is a token but no user yet, we are either loading or about to start loading
  if (!user || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium">Verifying session...</p>
        </div>
      </div>
    );
  }

  // User is fully authenticated, render the protected content
  return (
    <div style={{ minHeight: "100vh", background: "#f2f3fd" }}>
      <Outlet />
    </div>
  );
};

export default Layout;
