import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import "./Registration.css";

const Registration = () => {
  const [name, setName] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setIsCapturing(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name && capturedImage) {
      try {
        const formData = new FormData();
        formData.append("name", name); // Include user's name in the FormData

        // Convert image data URL to a Blob
        const response = await fetch(capturedImage);
        const blob = await response.blob();
        formData.append("image", blob, "captured-image.jpg");

        const res = await fetch("http://localhost:5500/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || "Failed to register. Please try again."
          );
        }

        const result = await res.json();
        setRegistrationSuccess(true);
        alert(result.message);

        setTimeout(() => {
          navigate("/"); // Redirect to the home page
        }, 2000); // 2-second delay to allow the user to see the success message
      } catch (error) {
        console.error("Error during registration:", error);
        alert(error.message || "Failed to register. Please try again.");
      }
    } else {
      alert("Please enter your name and capture your image.");
    }
  };

  return (
    <div className="container">
      <img
        src="/videos/untitled.jpg"
        alt="Background"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <h2>Registration</h2>
      {!registrationSuccess ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Upload Image:</label>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
          </div>
          <div>
            <label style={{ padding: "5px" }}>Or Capture Image:</label>
            <button type="button" onClick={() => setIsCapturing(true)}>
              Capture
            </button>
          </div>
          {isCapturing && (
            <div>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="60%"
                height="60%"
                style={{
                  position: "relative",
                  left: "20%",
                }}
              />
              <button
                type="button"
                style={{ position: "relative", left: "170px" }}
                onClick={handleCapture}
              >
                Take Photo
              </button>
            </div>
          )}
          <button type="submit">Register</button>
          <button type="button" onClick={() => navigate("/")}>
            Go to Home
          </button>
          {capturedImage && (
            <div className="preview">
              <h3>Preview:</h3>
              <img src={capturedImage} alt="Captured" />
            </div>
          )}
        </form>
      ) : (
        <div className="registration-success">
          <h3>Registration Successful!</h3>
          <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
      )}
    </div>
  );
};

export default Registration;
