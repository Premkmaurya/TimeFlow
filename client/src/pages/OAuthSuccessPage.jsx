import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCurrentUser as getMe } from "../features/auth/authSlice";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Store token with the correct key
      localStorage.setItem("token", token);
      
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);

      // Fetch user and redirect based on role
      dispatch(getMe()).then((action) => {
        if (action.payload && action.payload.role) {
          navigate(action.payload.role === "employee" ? "/dashboard" : "/authority", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      });
    } else {
      navigate("/login", { replace: true });
    }
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Authenticating...</h2>
        <p className="text-slate-500">Please wait while we log you in.</p>
      </div>
    </div>
  );
};

export default OAuthSuccess;