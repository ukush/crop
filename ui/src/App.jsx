import { useState, useRef, useEffect, useCallback } from 'react';
import React from "react";
import './App.css';
import Webcam from 'react-webcam';

function App() {
  const [prediction, setPrediction] = useState('');
  const [predictionColour, setPredictionColour] = useState('');
  const [screenshot, setScreenshot] = useState(null); // Captured screenshot
  const [uploadedImage, setUploadedImage] = useState(null); // Uploaded image
  const [showWebcam, setShowWebcam] = useState(false);
  const [isWebcamReady, setIsWebcamReady] = useState(false); // Track if webcam is ready
  const [isPreview, setIsPreview] = useState(false); // Track if preview is shown
  const [cameraFacingMode, setCameraFacingMode] = useState("environment"); // Default to rear camera
  const webcamRef = useRef(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: cameraFacingMode // Dynamically set facing mode
  };

  useEffect(() => {
    // Detect available video devices (cameras)
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setVideoDevices(videoDevices);
      
      // Set the default camera (usually the rear camera for mobile)
      if (videoDevices.length > 0) {
        setSelectedCamera(videoDevices[0]);
      }
    });
  }, []);

  // When the webcam is ready, update the state
  const onWebcamLoaded = () => {
    setIsWebcamReady(true);
  };

  const resetPrediction = () => {
     setPredictionColour('');
     const predictionDiv = document.getElementById('prediction-result');
     predictionDiv.innerText = '';
  };

  const capture = useCallback(() => {
    if (webcamRef.current && isWebcamReady) {  // Ensure webcam is ready before capturing
      const imageSrc = webcamRef.current.getScreenshot();
      setScreenshot(imageSrc); // Set the captured screenshot
      appendScreenshotToForm(imageSrc);

      resetPrediction();

      setIsPreview(true); // Set preview state to true
      setShowWebcam(false);
    }
  }, [isWebcamReady]);

  const appendScreenshotToForm = (base64Image) => {
    const byteString = atob(base64Image.split(',')[1]);
    const mimeString = base64Image.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });
    const file = new File([blob], 'captured.jpg', { type: mimeString });

    const fileInput = document.getElementById('file');
    const dt = new DataTransfer();
    dt.items.add(file);
    fileInput.files = dt.files;
  };

  const previewImage = () => {
    setShowWebcam(false);
    const file = document.getElementById('file');
    const reader = new FileReader();
    reader.onload = function () {
      setUploadedImage(reader.result); // Save uploaded image

      resetPrediction();
      setIsPreview(true); // Set preview state to true
    };
    if (file) {
      const imgBlob = file.files[0];
      reader.readAsDataURL(imgBlob);
    }
  };

  const retake = () => {
    setIsPreview(false); // Reset preview state
    resetPrediction();
    setUploadedImage(null); // Clear uploaded image
    setScreenshot(null); // Clear screenshot

    const fileInput = document.getElementById('file');
    fileInput.value = '';

    setShowWebcam(true);
  };

  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  async function startAnalysis() {
    const form = document.getElementById('prediction-form');
    const formData = new FormData(form);

    const fileInput = document.getElementById('file');
    if (screenshot) {
      const blob = dataURLtoBlob(screenshot);
      formData.append('file', blob, 'captured.jpg');
    } else if (uploadedImage) {
      const blob = dataURLtoBlob(uploadedImage);
      formData.append('file', blob, 'uploaded.jpg');
    } else if (fileInput.files[0]) {
      formData.append('file', fileInput.files[0]);
    }

    const response = await fetch('https://crop-2s2x.onrender.com/predict', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const result = await response.json();
      const prediction = result.predicted_class;
      const confidence = calConfidence(result.confidence);

      if (prediction) {
        setPredictionColour(prediction === 'Healthy' ? 'green' : 'red');
        const predictionDiv = document.getElementById('prediction-result');
        predictionDiv.innerText = `${prediction}\n Confidence: ${confidence}%`;
      } else {
        console.error("No prediction received.");
      }
    } else {
      console.error("Error with prediction request.");
    }
  }

  function calConfidence(confidence) {
    if (confidence < 0.5) {
      confidence = 1 - confidence;
    }
    return Math.round(confidence * 1000) / 10;
  }

  return (
    <>
      <h1>Strawberry Leaf Disease Detector</h1>

      <form id="prediction-form" className="prediction-form" encType="multipart/form-data">
        {/* Hide upload and capture buttons if image has been uploaded or captured */}
        {!isPreview && (
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <input
              className="upload"
              type="file"
              id="file"
              name="file"
              accept="image/*"
              onChange={previewImage}
            />
            <button className="capImage" type="button" onClick={() => setShowWebcam(true)}>
              Capture Image
            </button>
          </div>
        )}

        {showWebcam && (
          <>
            <div>
              {/* Camera selector for front/back camera */}
              {videoDevices.length > 1 && (
                <select onChange={(e) => setCameraFacingMode(e.target.value)} value={cameraFacingMode}>
                  <option value="environment">Back Camera</option>
                  <option value="user">Front Camera</option>
                </select>
              )}
            </div>

            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"  // Ensure full width
              height="auto" // Maintain aspect ratio
              videoConstraints={videoConstraints}
              onUserMedia={onWebcamLoaded}
            />
            <button type="button" onClick={capture}>Take Screenshot</button>
          </>
        )}

        {(screenshot || uploadedImage) && (
          <>
            <img
              id="uploaded-image"
              className="image-container"
              src={screenshot || uploadedImage}
              alt="Uploaded or Captured"
              style={{
                width: '100%',  // Ensure full width
                height: 'auto', // Maintain aspect ratio
              }}
            />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" onClick={startAnalysis}>Analyse</button>
              <button type="button" onClick={retake}>Retake</button>
            </div>
          </>
        )}

        <p
          id="prediction-result"
          className="prediction-result"
          style={{ color: predictionColour }}
        ></p>
      </form>
    </>
  );
}

export default App;
