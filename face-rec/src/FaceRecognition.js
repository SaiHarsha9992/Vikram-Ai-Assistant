import React, { useRef, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { s3, rekognition } from "./aws-config"; // Ensure aws-config.js has your AWS setup
import * as faceapi from "face-api.js";

const FaceRecognition = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [matchedImageName, setMatchedImageName] = useState("");
  const [loading, setLoading] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setComparisonResult(null);
    console.log("Captured image:", imageSrc);
  }, [webcamRef]);

  const handleRekognitionSearch = async (fileName) => {
    const params = {
      CollectionId: "vikramaiass",
      Image: {
        S3Object: {
          Bucket: "vikramai",
          Name: fileName,
        },
      },
    };

    try {
      const result = await rekognition.searchFacesByImage(params).promise();
      if (result.FaceMatches.length > 0) {
        const userName = result.FaceMatches[0].Face.ExternalImageId;
        setMatchedImageName(userName);
        setComparisonResult(true);
        await sendUserNameToBackend(userName); // Send the identified user name to the backend
        console.log(userName);
      } else {
        setComparisonResult(false);
      }
    } catch (error) {
      console.error("Error searching face:", error);
      setComparisonResult(false);
    } finally {
      setLoading(false);
    }
  };

  const sendUserNameToBackend = async (name) => {
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
    const uploadAndSearch = async () => {
      if (capturedImage) {
        setLoading(true);
        const blob = await fetch(capturedImage).then((res) => res.blob());
        const fileName = `${Date.now()}.jpg`;

        const params = {
          Bucket: "vikramai",
          Key: fileName,
          Body: blob,
          ContentType: "image/jpeg",
        };

        try {
          await s3.upload(params).promise();
          await handleRekognitionSearch(fileName);
        } catch (error) {
          console.error("Error uploading image:", error);
          setComparisonResult(false);
        }
      }
    };

    uploadAndSearch();
  }, [capturedImage]);

  useEffect(() => {
    if (comparisonResult === true) {
      console.log("Redirecting to the homepage...");
      window.location.href = "http://localhost:5173";
    } else if (comparisonResult === false) {
      console.log("Redirecting to the registration page...");
      navigate("/not-my-user");
    }
  }, [comparisonResult, navigate]);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    };

    loadModels();

    const interval = setInterval(async () => {
      if (webcamRef.current) {
        const video = webcamRef.current.video;
        const detections = await faceapi.detectAllFaces(
          video,
          new faceapi.TinyFaceDetectorOptions()
        );

        if (detections.length > 0 && !faceDetected) {
          setFaceDetected(true);
          capture();
        } else if (detections.length === 0 && faceDetected) {
          setFaceDetected(false);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [capture, faceDetected]);
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
        onClick={capture}
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
              position: "absolute",
              width: "450px",
              height: "150px",
              backgroundColor: "black",
              left: "38%",
              top: "32%",
              transform: "translate(-50%, -50%)",
              padding: "10px",
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
              }}
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
            <button onClick={() => navigate("/not-my-user")}>Register</button>
          </div>
        ))}
    </div>
  );
};

export default FaceRecognition;
