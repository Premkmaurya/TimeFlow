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
import { getMe } from "./features/auth/authSlice";
import OAuthSuccess from "./pages/OAuthSuccessPage";

function App() { 
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check for token in URL (from Google OAuth redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
      // After storing token, fetch user info
      dispatch(getMe());
    }

    // Prevent getMe from running on public pages to avoid unnecessary 401s for guests
    const publicPaths = ["/", "/login", "/register", "/about", "/contact"];
    const isPublicPath = publicPaths.includes(window.location.pathname);

    if (!user && !isPublicPath && !token) {
      dispatch(getMe());
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
