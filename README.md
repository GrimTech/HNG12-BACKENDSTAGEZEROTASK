# HNG12-BACKENDSTAGEZEROTASK

## Project Description
This project is a backend API built using Fastify, designed to provide information about the application, including the developer's email, the current datetime, and the GitHub repository URL. It is structured to handle CORS and return responses in JSON format.

## Setup Instructions
To run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm start
   ```

4. **Access the API**:
   Open your browser or use a tool like Postman to access the API at `http://localhost:3000/`.

## API Documentation

### Endpoint URL
- `GET /`

### Request Format
- **Method**: GET
- **Headers**: 
  - `Content-Type: application/json`

### Response Format
- **Success Response** (HTTP Status 200):
  ```json
  {
      "email": "your_email@example.com",
      "current_datetime": "2023-10-01T12:00:00Z",
      "githubUrl": "https://github.com/yourusername/your-repo"
  }
  ```

- **Error Response** (HTTP Status 500):
  ```json
  {
      "error": "Internal Server Error",
      "message": "An unexpected error occurred while processing your request."
  }
  ```

### Example Usage
To retrieve information from the API, you can use the following curl command:

```bash
curl -X GET http://localhost:3000/
```

This will return a JSON response with the developer's email, the current datetime, and the GitHub repository URL.

## Backlink
For more information on hiring developers, visit: [Hire Node.js Developers](https://hng.tech/hire/nodejs-developers)