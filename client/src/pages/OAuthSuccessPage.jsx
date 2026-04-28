// src/pages/OAuthSuccessPage.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // 🔥 Store token
      localStorage.setItem("accessToken", token);

      // redirect to dashboard
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return <div>Logging you in...</div>;
};

export default OAuthSuccess;