# ValidateIt AI - Startup Idea Validator

This is an MVP for validating startup ideas using AI. It was built within a 24-hour assignment scope utilizing the MERN stack (MongoDB, Express, React, Node.js).

## Tech Stack

- **Frontend**: React (Vite), React Router, Lucide Icons, pure Custom CSS (rich aesthetics).
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **AI**: OpenAI API

## Prerequisites

1. MongoDB installed locally and running, or a MongoDB Atlas URI.
2. Node.js installed.
3. An OpenAI API key (or you can use the built-in Mock mode).

## Setup & Run

### 1. Backend

Navigate to the `server` folder:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory.

```properties
PORT=5000
# Optional: defaults to local db if not provided
MONGO_URI=mongodb://127.0.0.1:27017/startupvalidator
# Provide your key:
OPENAI_API_KEY=your_openai_api_key_here
# If you don't have a key, set this to true:
MOCK_AI=true
```

Start the backend:
```bash
npm start
```

### 2. Frontend

Navigate to the `client` folder:

```bash
cd client
npm install
npm run dev
```

The application will be accessible at `http://localhost:5173`.

## Prompts Used for AI Integration

The core logic uses a system prompt structured to enforce JSON outputs:

```text
You are an expert startup advisor and initial stage venture capitalist.
Analyze the following startup idea and return a structured JSON response.

Title: {title}
Description: {description}

Respond ONLY with valid JSON strictly matching the following schema. Do not include markdown formatting like \`\`\`json.
{
  "problemSummary": "String (1-2 sentences summarizing the core problem)",
  "customerPersona": "String (Target audience)",
  "marketOverview": "String (Brief market analysis)",
  "competitors": ["String", "String"],
  "suggestedTechStack": ["String", "String"],
  "riskLevel": "Low | Medium | High",
  "profitabilityScore": number (0-100)
}
```

## Features Complete
- MERN Stack Integration
- Client Validation Landing Page
- AI API Integration via OpenAI
- Beautiful Custom Dashboard View
- Aesthetic Validation Report Detail Page
- Deletion Optionality
