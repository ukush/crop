import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [predictionColour, setPredictionColour] = useState('')

  const previewImage = () => {
    // get the file input element
    const file = document.getElementById('file')
    // open a file reader
    const reader = new FileReader();
    // set the image to the uploaded image
    reader.onload = function() {
      const img = document.getElementById('uploaded-image');
      img.src = reader.result;
    }
    // read the image
    if (file) {
      const imgBlob = file.files[0];
      reader.readAsDataURL(imgBlob);
    }
  }

  async function startAnalysis() {
    const form = document.getElementById('prediction-form');
    const formData = new FormData(form);
    const response = await fetch('http://127.0.0.1:8000/predict/', {
        method: 'POST',
        body: formData
    });

    // Check if the response is successful
    if (response.ok) {
        const result = await response.json();
        console.log(result);
        const prediction = result.predicted_class
        const confidence = calConfidence(result.confidence);

      //Check if prediction is available
      if (prediction) {
        if (prediction === 'Healthy') {
          setPredictionColour('green')
        } else {
          setPredictionColour('red')
        }
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
      confidence = (1 - confidence)
    }
    const confidencePercentage = Math.round(confidence * 1000) / 10;
    return confidencePercentage
  }

  return (
    <>
    <h1>Strawberry Leaf Disease Detector</h1>

    <form id="prediction-form" class="prediction-form" encType="multipart/form-data">
      <input class="upload" type="file" id="file" name="file" accept="image/*" onChange={previewImage}/>

      {/* <!-- Image box to show uploaded image --> */}
      <img id="uploaded-image" class="image-container" src='https://placehold.co/400?text=Upload+Image'/>

      <button type="button" onClick={startAnalysis}>Analyse</button>

      <p id='prediction-result' class='prediction-result' style={{ color: predictionColour }}></p>
    </form>
  
    </>
  )
}

export default App
