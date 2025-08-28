
# 🩸 Muainishi wa Damu: A Modern Blood Donation Platform for Kenya

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B1?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)

**Muainishi wa Damu** (Swahili for "Blood Classifier/Organizer") is an e-commerce inspired web application designed to modernize and streamline the blood donation process in Kenya. It connects donors, hospitals, and logistics agents through a user-friendly platform, addressing critical challenges in blood supply management.

---

### Application Preview

*(A screenshot or GIF of the application's home page and key features would be placed here to immediately capture interest.)*

![Muainishi wa Damu Screenshot](https://picsum.photos/seed/kenyahero/1200/675)

---

## 🎯 About The Project

In many regions, blood donation systems face challenges with inventory management, donor engagement, and logistical coordination. This can lead to critical shortages and delays in getting blood to patients in need.

**Muainishi wa Damu** tackles these issues by providing a centralized, intuitive platform that:
*   **Simplifies Donations:** Offers a clear, step-by-step process for individuals to schedule donations, either at a center or via an agent pickup service.
*   **Streamlines Requests:** Allows registered medical facilities to urgently request specific blood types and quantities.
*   **Optimizes Logistics:** Features a dedicated dashboard for agents to manage pickups and deliveries efficiently.
*   **Engages Donors:** Utilizes the power of the **Google Gemini API** to create personalized, heartfelt thank you messages, fostering a strong community of repeat donors.

The project is built with a frontend-centric approach, using mocked services to simulate a complete backend system, making it a perfect showcase of modern frontend development, UI/UX design, and AI integration.

## ✨ Key Features

*   **👤 Dual User Journeys:** Separate, intuitive flows for **Donating Blood** and **Requesting Blood**.
*   **📊 Live Inventory Dashboard:** A visually engaging bar chart and table, powered by `Recharts`, displays the current stock levels of all blood types.
*   **🚚 Agent Logistics View:** A dedicated dashboard for agents to view and manage active tasks (pickups/deliveries) and review their completed task history.
*   **🧠 AI-Powered Thank You Notes:** Integration with the **Google Gemini API** to generate unique, inspiring thank you messages for donors upon successful submission, enhancing the user experience.
*   **🔬 Haematology Insights:** An educational section that informs users about blood type prevalence, rarity (including "Golden Blood"), and the critical demand for various blood components.
*   **📱 Fully Responsive Design:** A clean, accessible interface built with Tailwind CSS that works seamlessly across desktops, tablets, and mobile devices.
*   **🔧 Mocked Backend:** Utilizes local mock services to simulate API calls for inventory, tasks, and submissions, allowing the frontend to be fully interactive and demonstrable without a live database.

## 🛠️ Technology Stack

This project is built with a modern, performant, and scalable tech stack:

*   **Core Framework:** [React](https://reactjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Generative AI:** [Google Gemini API (`@google/genai`)](https://ai.google.dev/)
*   **Data Visualization:** [Recharts](https://recharts.org/)
*   **Icons:** Custom, lightweight SVG components.

## 🏗️ Architecture & Code Structure

The application follows a component-based architecture with a clear separation of concerns.

```
/
├── components/         # Reusable React components (Header, Hero, Flows, etc.)
│   ├── icons/          # SVG icon components
│   └── ...
├── services/           # Logic for interacting with APIs and data
│   ├── bloodBankService.ts # Mocked API calls for inventory and tasks
│   └── geminiService.ts    # Service to interact with the Google Gemini API
├── types.ts            # Core TypeScript types and enums for the application
├── App.tsx             # Main application component with routing logic
└── index.tsx           # Entry point of the application
```

### Core Concepts:
*   **State Management:** Local component state (`useState`) is used to manage UI state, form data, and view navigation.
*   **Service Layer:** The `services` directory abstracts away data fetching and external API calls. The `bloodBankService.ts` currently contains mock data and simulates asynchronous API calls, making it easy to swap out for a real backend in the future.
*   **AI Integration:** The `geminiService.ts` contains the logic for prompting the Gemini API. The API key is managed via environment variables for security.

## 🚀 Future Enhancements

While the current version is a fully functional proof-of-concept, here are some potential next steps:

*   **Real Backend & Database:** Replace the mock services with a real backend (e.g., Node.js/Express) and a database (e.g., Neon, Firebase, Supabase) for data persistence.
*   **User Authentication:** Implement robust authentication for donors, hospital staff, and agents.
*   **Real-Time Agent Tracking:** Add a map-based view with real-time GPS tracking for active deliveries and pickups.
*   **Notifications:** Integrate push notifications or SMS alerts to update users on the status of their donations or requests.
*   **Admin Panel:** A comprehensive dashboard for administrators to manage inventory, users, and agents.

## 📄 License

This project is distributed under the MIT License. See `LICENSE` for more information.
