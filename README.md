Smart Note App - REST API with AI Summarization

A secure note management system with user authentication and AI-powered summarization capabilities.

Features 🔐 User Authentication

JWT-based registration/login

Password reset via OTP email

Profile picture upload

Secure token revocation

📝 Note Management

Create, view, and delete notes

GraphQL API with filtering

Paginated responses

🤖 AI Integration

Automatic note summarization

GEMINI API integration

Support for any LLM model

🛡️ Security

Asymmetric JWT signing

Rate limiting

CORS protection

Helmet.js security headers

Environment variable management

Technology Stack Backend: Node.js, Express.js

Database: MongoDB with Mongoose

Authentication: JWT

AI: GEMINI API (or any LLM)

Additional:

GraphQL for flexible queries

Multer for file uploads

Nodemailer for email notifications

Bcrypt for password hashing

API Endpoints Authentication Method Endpoint Description POST /register User registration POST /login User login PATCH /upload-profile-pic Upload profile picture POST /logout POST /forget-password Initiate password reset POST /reset-password Complete password reset Notes Method Endpoint Description GET /notes Get all notes (GraphQL) POST /notes Create new note DELETE /notes/:id Delete a note AI Features Method Endpoint Description POST /notes/:id/summarize Generate AI summary of note Installation Clone the repository:

bash git clone https://github.com/Ebtisamsaid/notes-app cd smart-note-app Install dependencies:

bash npm install Create a .env file:

Start the server:

npm npm run start

Project Structure

smart-note-app/

├── controllers/ # Route controllers
├── middlewares/ # Custom middlewares
├── models/ # Mongoose models 
├── modules/ # API routes
├── services/ # Business logic 
├── controller/ #routes
├── utils/ # Utility functions 
├── uploads/ # Profile picture storage
├── .env # Environment variables
├── app.js # Express application
├── server.js # Server entry point 
└── package.json


Security Features 🔒 Asymmetric JWT signing/verification

🔑 Environment variable protection

🛡️ Rate limiting (10 requests/15min)

🚦 CORS with whitelisted origins

⚔️ Helmet.js for secure headers

🔄 One-time use OTP for password reset

Contributing Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
