import tensorflow as tf
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse
from io import BytesIO
from PIL import Image
import numpy as np

from fastapi.middleware.cors import CORSMiddleware

# Load the trained model
model_path = "trained_models/best_covnet_model_augmented.keras"
model = tf.keras.models.load_model(model_path)

# Initialize FastAPI
app = FastAPI()

origins = [
    'http://localhost',
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Serve an HTML page
@app.get("/", response_class=HTMLResponse)
async def get():
    return 'message: Welcome to the Plant Disease Detection API!'

# Image prediction route
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    # Read the uploaded image as bytes
    image_bytes = await file.read()
    
    # Open image with PIL and convert to RGB
    img = Image.open(BytesIO(image_bytes)).convert('RGB')
    
    # Resize image to match the input shape of the model (75x75)
    img = img.resize((224,224))
    
    # Convert the image to a numpy array and normalize it (if required)
    img_array = np.array(img) / 255.0
    
    # Expand dimensions to add batch size (model expects (1, 224, 224, 3))
    img_array = np.expand_dims(img_array, axis=0)
    
    # Predict using the model
    prediction = model.predict(img_array)[0][0]


    #Convert probability to class label
    predicted_class = "Healthy" if prediction < 0.5 else "Diseased"

    print('prediction:', prediction)
   # print(predicted_label)

    return {"predicted_class": predicted_class, "confidence": float(prediction)}
