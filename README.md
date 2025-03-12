# Strawberry Leaf Disease Detection App

## Overview

This application is a Minimum Viable Product (MVP) designed to help strawberry farmers quickly identify potential diseases in their crops by analyzing images of strawberry leaves. Using a machine learning model, the app determines if a leaf is healthy or diseased and provides a confidence score for the prediction.

## What It Is

The Strawberry Leaf Disease Detection App is a web-based tool that allows users to upload images of strawberry leaves and receive an automated analysis of their health. It provides a simple, user-friendly interface for quick disease detection, aiding in early intervention and crop protection.

## Who It's For

This MVP is primarily intended for:

* **Strawberry Farmers:** To assist in the early detection of diseases and improve crop yield.
* **Agricultural Researchers:** For preliminary analysis and data gathering on plant health.
* **Hobbyist Gardeners:** Who wish to monitor the health of their strawberry plants.

## Type of App (MVP)

This project is an **MVP (Minimum Viable Product)**. It focuses on providing the essential functionality of image upload and disease prediction. The core features include:

* Image upload capability.
* Machine learning-based disease detection.
* Display of prediction results (healthy/diseased) and confidence scores.
* Simple and intuitive user interface.

As an MVP, it serves to validate the core concept and gather user feedback for future development.

## Features

* **Image Upload:** Users can upload images of strawberry leaves via a file input.
* **Disease Prediction:** A machine learning model analyzes the uploaded image to determine if the leaf is healthy or diseased.
* **Confidence Score:** The app displays a confidence score, indicating the certainty of the prediction.
* **Visual Feedback:** Prediction results are displayed in green (healthy) or red (diseased) for easy interpretation.
* **Image preview:** Users can see the image they uploaded.

## How to Use

1.  **Upload an Image:** Click the "Choose File" button and select an image of a strawberry leaf from your device.
2.  **Analyze:** Click the "Analyse" button to initiate the disease detection process.
3.  **View Results:** The prediction result (healthy/diseased) and confidence score will be displayed below the image.

## Technology Stack

* **Frontend:** React.js, HTML, CSS, JavaScript
* **Backend:** FastAPI (Python)
* **Machine Learning:** TensorFlow/Keras

## Future Development

This MVP can be expanded with the following features:

* Real-time image capture via mobile app integration.
* Database integration for storing and tracking plant health data.
* Alerting system for notifying users of diseased plants.
* Enhanced UI/UX with location tagging and disease severity indicators.
* Model improvements through retraining with new data.

## Getting Started (for developers)

1.  **Clone the repository:** `git clone [repository_url]`
2.  **Install dependencies:**
    * Frontend: `npm install`
    * Backend: `pip install -r requirements.txt`
3.  **Run the application:**
    * Frontend: `npm start`
    * Backend: `uvicorn main:app --reload`

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bug fixes and feature requests.