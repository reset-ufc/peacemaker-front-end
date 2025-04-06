# 🖥️ The Peacemaker Bot Frontend

**The Peacemaker Bot is a moderation tool designed for GitHub repositories, aimed at fostering a respectful and constructive environment for developers. This repository contains the frontend of the project, where users can interact with the bot's features..**

---

## 📋 Sections

- [About the Project](#-about-the-project)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)
  
---

The Peacemaker Bot Frontend provides an intuitive interface for users to engage with the moderation features of the Peacemaker Bot. Key functionalities include:

- **Incivility Notifications**: Users receive alerts for uncivil comments, along with actionable recommendations for improvement.
- **Comment Analysis**: Users can review suggested corrections for each reported incivility.
- **Feedback Mechanism**: Users can contribute by rating suggestions with likes, dislikes, or written feedback.
- **Repository Selection**: Users can choose specific repositories to monitor and analyze.
- **Dashboard Metrics**: A visual dashboard displays metrics and analytics related to selected repositories.
- **User-Friendly Navigation**: The frontend includes filters and a search function to easily navigate through notifications.

Feel free to explore the repository and contribute to making GitHub a more civil place for developers!

---


## ✅ Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [pnpm](https://pnpm.js.org/) (package manager)

---

## 💾 Installation

1. Clone the repository to your local machine:

  ```bash
  git clone https://github.com/your-username/peacemaker-bot-frontend.git
  ```
2. Navigate to the project directory:


 ```bash
 cd peacemaker-bot-frontend
 ```
3. Install the dependencies:
 ```bash
 pnpm install
 ```
## 🚀 Usage

1. To start the development server, run:
  ```bash
  pnpm run dev
  ```
# The application will be available at http://localhost:5173 by default.

## 📂 Project Structure

An overview of the folder and file structure:

 ```
 peacemaker-front-end/

 ├── public/                   # Static files served by the application
 │   └── index.html            # Main HTML file
 ├── src/                      # Source code for the application
 │   ├── app/                  # Application-specific components and pages
 │   │   ├── (app)/            # Main application layout
 │   │   ├── (auth)/           # Authentication-related components
 │   │   └── (public)/         # Public-facing components
 │   ├── components/           # Reusable UI components
 │   ├── config/               # Configuration files
 │   ├── hooks/                # Custom React hooks
 │   ├── lib/                  # Utility functions and libraries
 │   ├── providers/            # Context providers for state management
 │   ├── styles/               # CSS and styling files
 │   └── types/                # TypeScript type definitions
 ├── .gitignore                # Git ignore file
 ├── package.json              # Project metadata and dependencies
 ├── pnpm-lock.yaml            # pnpm lock file
 ├── README.md                 # Project documentation
 └── tsconfig.json             # TypeScript configuration
 ```



