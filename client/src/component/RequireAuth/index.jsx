import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    console.log("Pretending authentication is always successful...");
    setIsAuthenticated(true);
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

export default RequireAuth;
