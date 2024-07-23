import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page after a delay to show success message
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000); // 2-second delay

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [navigate]);

  return (
    <div>
      <h3>Registration Successful!</h3>
      <p>Redirecting to home page...</p>
    </div>
  );
};

export default RegistrationSuccess;
