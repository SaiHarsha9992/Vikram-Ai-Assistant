import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { s3, rekognition } from "./aws-config";
import "./Registration.css";

// Configure AWS SDK

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
        // Convert data URL to Blob
        const response = await fetch(capturedImage);
        const blob = await response.blob();
        const fileName = `${name}.jpg`;

        // Upload to S3
        const params = {
          Bucket: "vikramai",
          Key: fileName,
          Body: blob,
          ContentType: "image/jpeg",
        };

        await s3.upload(params).promise();

        // Index Face in Rekognition
        const indexParams = {
          CollectionId: "vikramaiass",
          Image: {
            S3Object: {
              Bucket: "vikramai",
              Name: fileName,
            },
          },
          ExternalImageId: name,
        };

        await rekognition.indexFaces(indexParams).promise();

        console.log("New face registered successfully.");
        alert("Registration successful!");

        setRegistrationSuccess(true);
        setName("");
        setCapturedImage(null);
        setIsCapturing(false);

        setTimeout(() => {
          navigate("/"); // Redirect to the home page
        }, 2000); // 2-second delay to allow the user to see the success message
      } catch (error) {
        console.error("Error registering new face:", error);
        alert("Failed to register. Please try again.");
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
