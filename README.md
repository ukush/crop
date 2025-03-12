# Strawberry Leaf Disease Detection App

## Overview

This application is designed to help strawberry farmers quickly identify potential diseases in their crops by analysing images of strawberry leaves. Using a machine learning model, the app determines if a leaf is healthy or diseased and provides a confidence score for the prediction.

## What It Is

The Strawberry Leaf Disease Detection App is a web-based tool that allows users to upload images of strawberry leaves and receive an automated analysis of their health. It provides a simple, user-friendly interface for quick disease detection, aiding in early intervention and crop protection.

This project focuses on providing the essential functionality of image upload and disease prediction. The core features include:

* Image upload capability.
* Machine learning-based disease detection.
* Display of prediction results (healthy/diseased) and confidence scores.
* Simple and intuitive user interface.

As an MVP, it serves to validate the core concept and gather user feedback for future development.

## Technology Stack

* **Frontend:** React.js, HTML, CSS, JavaScript
* **Backend:** FastAPI (Python)
* **Machine Learning:** TensorFlow/Keras

## Getting Started (for developers)

1.  **Clone the repository:** `git clone https://github.com/ukush/crop`
2.  **Install dependencies:**
    * Frontend: `npm install`
    * Backend: `pip install -r requirements.txt`
3.  **Run the application:**
    * Frontend: `npm start`
    * Backend: `uvicorn main:app --reload`

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bug fixes and feature requests.