import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import images from "./ImportImages"; // Import images

const FaceRecognition = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [matchedImageName, setMatchedImageName] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("Harsha");
  const webcamRef = React.useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = "/models";
        console.log("Loading models...");
        await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
        await faceapi.loadFaceLandmarkModel(MODEL_URL);
        await faceapi.loadFaceRecognitionModel(MODEL_URL);
        console.log("Models loaded successfully.");
        setModelsLoaded(true);
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };
    loadModels();
  }, []);

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setComparisonResult(null);
    console.log("Captured image:", imageSrc);
  }, [webcamRef]);

  const compareFaces = async () => {
    setLoading(true);
    try {
      if (!capturedImage) {
        console.error("No image captured.");
        setComparisonResult(false);
        setLoading(false);
        return;
      }

      console.log("Converting base64 to blob...");
      const imgBlob1 = base64ToBlob(capturedImage);
      const img1 = await faceapi.bufferToImage(imgBlob1);

      console.log("Detecting face in the captured image...");
      const detections1 = await faceapi
        .detectSingleFace(img1, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detections1) {
        console.error("No face detected in the captured image.");
        setComparisonResult(false);
        setLoading(false);
        return;
      }

      console.log("Face detected in the captured image.");

      const existingImages = Object.keys(images).map((filename) => ({
        path: images[filename],
        name: filename.split(".")[0], // Extract name from filename
      }));
      console.log(existingImages);
      for (const img of existingImages) {
        if (!img.path) {
          console.error(`Image path is undefined for ${img.name}`);
          continue;
        }

        try {
          console.log(`Fetching image: ${img.path}`);
          const response = await fetch(img.path);
          if (!response.ok) {
            console.error(`Failed to fetch image: ${img.path}`);
            continue;
          }

          const imgBlob2 = await response.blob();
          const img2 = await faceapi.bufferToImage(imgBlob2);
          console.log(`Detecting face in the image: ${img.path}`);
          const detections2 = await faceapi
            .detectSingleFace(img2, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (detections2) {
            console.log(`Face detected in the image: ${img.path}`);
            const distance = faceapi.euclideanDistance(
              detections1.descriptor,
              detections2.descriptor
            );
            console.log(`Distance between faces: ${distance}`);
            if (distance < 0.6) {
              console.log(`Match found: ${img.name}`);
              setImage(img.name);
              setMatchedImageName(img.name);
              setComparisonResult(true);
              setLoading(false);
              return;
            }
          } else {
            console.error(`No face detected in the image: ${img.path}`);
            setImage("Harsha");
          }
        } catch (imgError) {
          console.error(`Error processing image ${img.path}:`, imgError);
          setImage("Harsha");
        }
      }
      console.log("No match found.");
      setComparisonResult(false);
    } catch (error) {
      console.error("Error comparing faces:", error);
      setComparisonResult(false);
    } finally {
      setLoading(false);
    }
  };
  const sendUsername = async (name) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }), // Use the provided name parameter
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (modelsLoaded && capturedImage) {
      compareFaces();
    }
  }, [modelsLoaded, capturedImage]);

  useEffect(() => {
    if (comparisonResult === true) {
      console.log("Redirecting to the homepage...");
      sendUsername(matchedImageName);
      window.location.href = "http://localhost:5173";
    } else if (comparisonResult === false) {
      console.log("Redirecting to the registration page...");
      navigate("/not-my-user");
    }
  }, [comparisonResult, navigate, image, matchedImageName]);

  const handleRegisterClick = () => {
    navigate("/registration");
  };

  return (
    <div>
      <video
        src="/videos/Interface.mp4"
        autoPlay
        muted
        loop
        style={{
          width: "100%",

          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      ></video>

      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="20%"
        height="20%"
        style={{
          marginLeft: "auto",
          marginBottom: "auto",
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      />
      <button
        onClick={handleCapture}
        style={{
          position: "absolute",
          top: "81%",
          left: "38%",
          transform: "translate(-50%, -50%)",
          width: "100px",
          height: "50px",
          backgroundColor: "red",
          zIndex: 1,
        }}
      >
        Capture
      </button>
      {capturedImage && (
        <>
          <div
            style={{
              position: "absolute", // Change to absolute positioning for better control
              width: "450px",
              height: "150px", // Adjust height to auto to maintain aspect ratio
              backgroundColor: "black",
              left: "38%", // Center horizontally
              top: "32%", // Center vertically
              transform: "translate(-50%, -50%)", // Adjust for centering
              padding: "10px", // Add some padding around the image
            }}
          >
            <h3 style={{ color: "white", textAlign: "center" }}>
              Captured Image:
            </h3>
            <img
              src={capturedImage}
              alt="Captured"
              style={{
                width: "80%",
                height: "200px",
                display: "block",
                margin: "0 auto",
              }} // Adjust image size
            />
          </div>
          <video
            src="/videos/Loading Screen.mp4"
            autoPlay
            muted
            loop
            style={{
              width: "20%",
              height: "12%",
              position: "absolute",
              top: "55%",
              left: "31%",
              zIndex: -1,
            }}
          ></video>
        </>
      )}
      {loading && <p>Comparing...</p>}
      {comparisonResult !== null &&
        !loading &&
        (comparisonResult ? (
          `Match Found: ${matchedImageName}`
        ) : (
          <div>
            <p>No Match Found</p>
            <button onClick={handleRegisterClick}>Register</button>
          </div>
        ))}
    </div>
  );
};

const base64ToBlob = (base64, contentType = "image/jpeg") => {
  const byteCharacters = atob(base64.split(",")[1]); // Decode base64
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};

export default FaceRecognition;
