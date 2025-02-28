# Project Title

E-commerce Application

## Description

This is a full-stack e-commerce application that allows users to browse products, add them to their cart, and proceed to checkout. The application features user authentication and a responsive design.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Ecom
   ```
3. Install the dependencies for the client:
   ```bash
   cd client
   npm install
   ```
4. Install the dependencies for the server:
   ```bash
   cd server
   npm install
   ```

## Usage

To run the application, follow these steps:

1. Start the server:
   ```bash
   cd server
   npm start
   ```
2. Start the client:
   ```bash
   cd client
   npm start
   ```

Visit `http://localhost:3000` in your browser to view the application.

## Production Deployment

To deploy the application in a production environment, follow these steps:

1. Build the client application:
   ```bash
   cd client
   npm run build
   ```
2. Serve the static files from the `build` directory using a server of your choice (e.g., Nginx, Express).

## Setup .env File

Create a `.env` file in the root of the server directory and include the following variables:

```
PORT=...
MONGO_DB_URI=...
JWT_SECRET=...
NODE_ENV=...
```

## Build the App

To build the application, run:

```bash
npm run build
```

## Start the App

To start the application, run:

```bash
npm start
```

## Features

- User authentication
- Product browsing
- Shopping cart functionality
- Responsive design

## Technologies Used

- React
- Redux
- Node.js
- Express
- MongoDB
- Axios

## Testing

To run tests, use the following command:

```bash
npm test
```
