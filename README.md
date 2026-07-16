# HealthBridge - Doctor Appointment Booking Application

HealthBridge is a React Native mobile application built with Expo based on the provided Figma design case study[cite: 1]. The application features user authentication (Login & Sign-Up), a dynamic list of medical specialists with interactive filtering, detailed doctor profiles, and an appointment booking confirmation flow.

## 📱 Features Implemented
* **Authentication Portal (Login & Sign-Up):** Custom designed user onboarding flow with toggle states. Validates inputs against local JSON credentials for existing accounts and simulates user generation for new registrations.
* **Home Screen Feed:** Dynamic specialist directory utilizing a performance-optimized `FlatList` with doctor information parsed from a local data source.
* **Interactive Filtering:** Live runtime filtering capability matching specific conditions for "In-Network" status and "Nearest to Me" proximity boundaries (under 2.0 km).
* **About Doctor Screen:** Full detailed profile views receiving dynamic route data injection, augmented with a custom mandatory "Book Appointment" call-to-action button.
* **Appointment Confirmation Screen:** A summary layout view confirming scheduled details.

---

## 🚀 Project Setup Steps

Follow these steps to set up and run the application locally on your machine:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your computer and the **Expo Go** app installed on your physical Android test device.

### 2. Installation
Clone or extract the repository, navigate into the project root directory, and run the following command to download the node modules:
```bash
npm install

# here is a link for downloading the apk file
https://expo.dev/accounts/javedansari2/projects/Appointment_App/builds/f64e545a-ccdf-43a2-8e48-04f20a6418b0
