import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AuthorityPanel from "./pages/AuthorityPanel";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser as getMe } from "./features/auth/authSlice";
import OAuthSuccess from "./pages/OAuthSuccessPage";

function App() { 
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const publicPaths = ["/", "/login", "/register", "/about", "/contact", "/oauth-success"];
    const isPublicPath = publicPaths.includes(window.location.pathname);
    const token = localStorage.getItem("token");

    if (!user) {
      if (token) {
        // Auto-login: If token exists, fetch user
        dispatch(getMe());
      } else if (!isPublicPath) {
        // If no token and on a private path, attempt to fetch (which will fail and can be handled)
        dispatch(getMe());
      }
    }
  }, [dispatch, user]);

  return (
    <Router>
      <Routes>
        {/* Public Routes (with navbar) */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
        </Route>

        {/* Auth Routes (no navbar) */}
        <Route
          path="login"
          element={
            user ? (
              <Navigate
                to={user.role === "employee" ? "/dashboard" : "/authority"}
                replace
              />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="register"
          element={
            user ? (
              <Navigate
                to={user.role === "employee" ? "/dashboard" : "/authority"}
                replace
              />
            ) : (
              <Register />
            )
          }
        />

        {/* Authenticated Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="authority" element={<AuthorityPanel />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
