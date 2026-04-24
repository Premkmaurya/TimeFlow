import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AuthorityPanel from './pages/AuthorityPanel';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './features/auth/authSlice';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Prevent getMe from running on public pages to avoid unnecessary 401s for guests
    const publicPaths = ['/', '/login', '/register', '/about', '/contact'];
    const isPublicPath = publicPaths.includes(window.location.pathname);

    if (!user && !isPublicPath) {
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
        </Route>

        {/* Auth Routes (no navbar) */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

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
