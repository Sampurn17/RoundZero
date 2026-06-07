# 🎯 RoundZero (MERN Stack + GenAI)

![RoundZero Banner](https://via.placeholder.com/1200x400/1e1e2f/ffffff?text=RoundZero+-+MERN+%2B+GenAI+Platform)

**RoundZero** is a robust, full-stack **MERN** (MongoDB, Express.js, React, Node.js) application designed to serve as an intelligent interview platform. While its core architecture is built heavily on MERN stack best practices for scalability and performance, it integrates advanced Generative AI capabilities to conduct first-round ("Round Zero") interviews automatically.

## ✨ Core MERN Features

- ⚛️ **React Frontend**: A highly responsive, component-driven user interface built with React and Vite. It utilizes React Router for seamless single-page application (SPA) navigation and modular Sass for styling.
- 🟢 **Node.js & Express Backend**: A fast, scalable RESTful API built on Express.js, handling routing, robust middleware, and secure data processing.
- 🍃 **MongoDB Database**: Flexible and schema-driven data modeling using Mongoose to store user profiles, interview transcripts, and platform metadata.
- 🔒 **Secure Authentication**: End-to-end MERN authentication flow using JSON Web Tokens (JWT) and Bcrypt for password hashing.
- 📡 **RESTful Architecture**: Clean, decoupled client-server communication using Axios to interface with backend Express controllers.

## 🤖 GenAI Enhancements

- **AI-Driven Interviews**: Integrates with OpenAI and Google Gemini APIs to dynamically generate contextual interview questions and evaluate candidate responses.
- **Automated Resume Parsing**: Employs `pdf-parse` alongside GenAI to extract structured skills and work history from candidate resumes.
- **Background Workflows**: Uses Puppeteer for automated browser tasks and background processing alongside the Node.js event loop.

## 🛠️ Tech Stack

### Frontend (Client)
- **Library**: React 19 (Vite)
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Styling**: SCSS / Sass

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose 9)
- **Auth**: JWT, bcryptjs
- **AI Integration**: OpenAI SDK, Google GenAI SDK
- **Utilities**: Multer (file uploads), Zod (schema validation), Puppeteer

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB instance (Local or MongoDB Atlas)
- API Keys for OpenAI / Google Gemini

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/RoundZero.git
   cd RoundZero
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key
   GEMINI_API_KEY=your_gemini_api_key
   ```
   Start the Express development server:
   ```bash
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory (if needed):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   Start the React development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```
RoundZero/
├── backend/                  # Express/Node server
│   ├── src/
│   │   ├── controllers/      # Route logic & GenAI handlers
│   │   ├── middlewares/      # JWT auth, error handling
│   │   ├── models/           # Mongoose schemas
│   │   └── routes/           # Express API endpoints
│   ├── .env
│   ├── server.js             # Entry point
│   └── package.json
└── frontend/                 # React client
    ├── src/
    │   ├── components/       # Reusable UI components
    │   ├── features/         # Feature-based MERN slices (auth, interview)
    │   ├── App.jsx           # Main routing
    │   └── main.jsx          # React DOM render
    └── package.json
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/your-username/RoundZero/issues).

## 📝 License

This project is licensed under the ISC License.
