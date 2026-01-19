# 🚀 Techfest 2025 - FBVA

Welcome to the official repository for the **Techfest 2025** web platform. This application serves as the central hub for users to register, view events, manage their profiles, and participate in the fest's activities.

![Techfest Banner](public/techfest-banner.png)

## ✨ Features

*   **User Authentication**: Secure sign-up and login powered by **Firebase Auth** (Google Sign-In).
*   **Interactive Dashboard**: A personalized user dashboard (`UserDashboard`) to track registered events and profile status.
*   **Event Modules**: dynamic module pages (`Modules`) allowing users to explore and register for specific tech events.
*   **Gallery & Teams**: Dedicated sections to showcase past highlights and the organizing team.
*   **GenAI Integration**: Powered by `@google/genai` for intelligent features.
*   **Responsive Design**: Built for a seamless experience across desktop and mobile devices.

## 🛠️ Tech Stack

*   **Frontend**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Backend / Services**: [Firebase](https://firebase.google.com/) (Auth, Firestore, Hosting)
*   **AI**: Google GenAI SDK

## 💻 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v16 or higher)
*   npm (comes with Node.js)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/lotus-outlook-6/Techfest-2025-FBVA.git
    cd Techfest-2025-FBVA
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory and add your API keys:
    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run Locally**
    Start the development server:
    ```bash
    npm run dev
    ```
    Open your browser and visit `http://localhost:3000` (or the URL shown in your terminal).

## 🚀 Deployment

This project is hosted on **Firebase Hosting**.

To deploy a new version manually:

1.  **Build the project**
    ```bash
    npm run build
    ```

2.  **Deploy to Firebase**
    ```bash
    npx firebase deploy
    ```

## 📂 Project Structure

```bash
Techfest-2025-FBVA/
├── src/                # Source code (Components, logic)
├── public/             # Static assets
├── dist/               # Production build output
├── firebase.ts         # Firebase configuration
├── vite.config.ts      # Vite configuration
└── package.json        # Project dependencies
```

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

Built with ❤️ for Techfest 2025.
