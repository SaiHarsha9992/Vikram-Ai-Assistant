import React from "react";
import { useNavigate } from "react-router-dom";

const NotMyUser = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <video
        src="/videos/Not User.mp4"
        autoPlay
        muted
        style={styles.video}
      ></video>
      <div style={styles.content}>
        <h2 style={styles.heading}>You are not my user</h2>
        <button style={styles.button} onClick={() => navigate("/registration")}>
          Register
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    position: "relative",
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },
  content: {
    textAlign: "center",
    zIndex: 1,
    position: "relative",
    top: 80,
    color: "#fff",
  },
  heading: {
    fontSize: "2em",
    marginBottom: "20px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1em",
    color: "#fff",
    backgroundColor: "red",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

export default NotMyUser;
