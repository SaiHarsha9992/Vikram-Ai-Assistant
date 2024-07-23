import { useRef, useState, useEffect } from "react";
import { useChat } from "../hooks/useChat";
import "../ui.css";
import image1 from "../assets/vikram logo.png";
import image2 from "../assets/crbharsha.png";
import React from "react";
import {
  AudioConfig,
  SpeechConfig,
  SpeechRecognizer,
} from "microsoft-cognitiveservices-speech-sdk";

// Azure Speech-to-Text configuration
const API_KEY = "68f862bb681e44f4a41d2bae4783863a";
const API_LOCATION = "eastus";
const sdk = SpeechConfig.fromSubscription(API_KEY, API_LOCATION);

export const UI = ({ hidden, ...props }) => {
  const input = useRef();
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  const {
    chat,
    loading,
    cameraZoomed,
    setCameraZoomed,
    message,
    slideChat,
    setSlideChat,
    questiontext,
    setQuestionText,
    answertext,
  } = useChat();

  const sendMessage = () => {
    const text = input.current.value;
    setQuestionText(text);
    if (!loading && !message) {
      chat(text);
      input.current.value = "";
    }
  };

  if (hidden) {
    return null;
  }

  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen((prev) => !prev);
  };

  const [imagebt, setImagebt] = useState("800px");
  const [inputbt, setInputbt] = useState(650);
  const [buttonsbt, setButtonsbt] = useState(720);
  const [crbyhbt, setCrbyhbt] = useState("650px");

  useEffect(() => {
    if (slideChat) {
      setImagebt("1220px");
      setInputbt(950);
      setButtonsbt(1120);
      setCrbyhbt("950px");
    } else {
      setImagebt("810px");
      setInputbt(550);
      setButtonsbt(720);
      setCrbyhbt("550px");
    }
  }, [slideChat]);

  // Setup for Azure Speech-to-Text
  const [recognizer, setRecognizer] = useState(null);

  useEffect(() => {
    const initRecognizer = () => {
      const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
      const speechRecognizer = new SpeechRecognizer(sdk, audioConfig);

      speechRecognizer.recognizing = (s, e) => {
        setTranscript(e.result.text);
      };

      speechRecognizer.recognized = (s, e) => {
        if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
          setTranscript(e.result.text);
        }
      };

      speechRecognizer.canceled = (s, e) => {
        console.log(`CANCELED: Reason=${e.reason}`);
        if (e.reason === sdk.CancellationReason.Error) {
          console.log(`CANCELED: ErrorCode=${e.errorCode}`);
          console.log(`CANCELED: ErrorDetails=${e.errorDetails}`);
        }
      };

      setRecognizer(speechRecognizer);
    };

    initRecognizer();

    return () => {
      if (recognizer) {
        recognizer.stopContinuousRecognitionAsync();
      }
    };
  }, []);

  const startListening = () => {
    if (recognizer) {
      recognizer.startContinuousRecognitionAsync();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognizer) {
      recognizer.stopContinuousRecognitionAsync();
      setIsListening(false);
    }
    if (!loading && !message && transcript.trim() !== "") {
      console.log("Final transcript:", transcript);
      chat(transcript);
      setQuestionText(transcript);
      setTranscript(""); // Clear transcript after sending
    }
  };

  useEffect(() => {
    if (isListening) {
      startListening();
    } else {
      stopListening();
    }
  }, [isListening]);

  return (
    <>
      {slideChat && (
        <div className="fixed px-25 top-[20%] right-[15%]  w-[400px] h-[400px] bg-red-600 rounded-lg border-3 border-red-500 z-50">
          <div className="p-4">
            <div className="text-base mb-6 p-2.5 bg-black rounded-lg border-3 border-yellow-500">
              <svg
                className="relative"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="red"
                viewBox="0 0 16 16"
              >
                <path d="M8 4.951c-1.008 0-1.629 1.09-1.629 2.895v.31c0 1.81.627 2.895 1.629 2.895s1.623-1.09 1.623-2.895v-.31c0-1.8-.621-2.895-1.623-2.895" />
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8.012 4.158c1.858 0 2.96-1.582 2.96-3.99V7.84c0-2.426-1.079-3.996-2.936-3.996-1.864 0-2.965 1.588-2.965 3.996v.328c0 2.42 1.09 3.99 2.941 3.99" />
              </svg>
              <div className="relative left-[10%] bottom-[25%]">
                <p className="text-xs text-red-400 w-80 relative top-0">
                  {questiontext}
                </p>
              </div>
            </div>
            <svg
              className="relative my-4"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="black"
              viewBox="0 0 16 16"
            >
              <path d="M8.021 11.9 3.453 8.62a.72.72 0 0 1 0-1.238L8.021 4.1a.716.716 0 0 1 1.079.619V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
              <path d="M5.232 4.293a.5.5 0 0 1-.106.7L1.114 7.945l-.042.028a.147.147 0 0 0 0 .252l.042.028 4.012 2.954a.5.5 0 1 1-.593.805L.539 9.073a1.147 1.147 0 0 1 0-1.946l3.994-2.94a.5.5 0 0 1 .699.106" />
            </svg>
            <div className="relative left-[10%] bottom-10">
              <p className="text-xs text-black-400 w-80 relative top-0">
                {answertext}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="relative select-none">
          <a href="http://localhost:5173/">
            <img src={image1} alt="" width={250} height={250} />
          </a>
        </div>

        <div className="w-full flex flex-col items-end justify-center gap-4 position-relative right-10">
          <button
            onClick={() => setCameraZoomed(!cameraZoomed)}
            className="pointer-events-auto bg-red-500 hover:bg-black hover:text-red-500 text-white p-4 rounded-md"
          >
            {cameraZoomed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-zoom-out"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-zoom-in"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            )}
          </button>
          <button
            onClick={() => setSlideChat(!slideChat)}
            className="pointer-events-auto bg-red-500 hover:bg-black hover:text-red-500 text-white p-4 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-message-circle"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </button>

          <button
            onClick={toggleFullScreen}
            className="pointer-events-auto bg-red-500 hover:bg-black hover:text-red-500 text-white p-4 rounded-md"
          >
            {isFullScreen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-minimize"
              >
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-maximize"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
            )}
          </button>
        </div>
        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <button
            onClick={() => setIsListening(!isListening)}
            className="bg-red-500 hover:bg-black hover:text-red-500 p-3 px-5 font-semibold uppercase rounded-md"
          >
            {isListening ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-mic-off"
              >
                <line x1="1" y1="1" x2="23" y2="23"></line>
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-mic"
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            )}
          </button>

          <input
            className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md border border-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 hover:border-black hover:ring-2 hover:ring-black transition-all duration-300"
            placeholder="Type a message..."
            ref={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            disabled={loading || message}
            onClick={sendMessage}
            className={`bg-red-500 hover:bg-black text-black hover:text-red p-4 px-10 font-semibold uppercase rounded-md ${
              loading || message
                ? "cursor-not-allowed opacity-30"
                : "hover:bg-black hover:text-red-500"
            }`}
          >
            Send
          </button>
          <button
            type="button"
            onClick={() => (window.location.href = "http://localhost:3000")}
            className={`bg-red-500 text-black p-1 absolute bottom-0 right-0 px-10 font-semibold uppercase rounded-md ml-auto ${
              loading || message
                ? "cursor-not-allowed opacity-30"
                : "hover:bg-black hover:text-red-500"
            }`}
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
};
