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
    // If there's no user in Redux but there's a token in the cookie,
    // fetch the user data from the backend
    if (!user) {
      dispatch(getMe());
    }
  }, []);

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
