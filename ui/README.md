## Getting Started

### Prerequisites

* Node.js and npm (or yarn) installed.
* A running backend API (FastAPI) for disease detection.

### Installation

1.  Clone the repository:

    ```bash
    git clone [repository_url]
    cd [repository_directory]
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

1.  **Start the Development Server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    This command will start the Vite development server.

2.  **Open in Browser:**

    Open your web browser and navigate to the URL displayed in the terminal (usually `http://localhost:5173`). The application should now be running.

3.  **Using the Application:**

    * Click the "Choose File" button to upload an image.
    * The image preview will appear.
    * Click the "Analyse" button to send the image to the backend.
    * The prediction results will be displayed below the button.

### Building for Production

1.  **Build the Application:**

    ```bash
    npm run build
    # or
    yarn build
    ```

    This command will create a production-ready build of your application in the `dist` directory.

2.  **Serving the Production Build:**

    To run the production build, you can use a static file server:

    ```bash
    npx serve dist
    ```

    Then, open your browser and navigate to the URL displayed by `serve`.

### Configuration

* **API Endpoint:** The backend API endpoint is defined in the `startAnalysis` function within the `App.jsx` file. Ensure it points to the correct URL of your running FastAPI backend.

## Contributing

Contributions are welcome! Please submit pull requests or open issues to report bugs or suggest enhancements.