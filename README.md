# 🐄 QurbaniHat — Online Qurbani Animal Marketplace

QurbaniHat is a modern, high-performance livestock marketplace application designed for booking Qurbani cows 🐄 and goats 🐐. Users can browse livestock directory details, filter and sort by price, view veterinarian certificates, and place bookings.

---

## 🌐 Live URL
👉 [QurbaniHat Live Deployment](https://project-qurbanir-hat.vercel.app)

---

## 🎯 Project Purpose

During the Qurbani season, finding a healthy animal from a reliable source can be challenging. QurbaniHat solves this by:
- Connecting buyers directly with pasture cattle farms.
- Ensuring transparent weighing and veterinarian checks.
- Eliminating middlemen commissions to provide competitive rates.
- Providing a secure, hassle-free booking and transit delivery service.

---

## 🚀 Key Features

### 🐄 1. Livestock Directory & Sorting
- Dynamic listing page with live search matching name, breed, or location.
- Category filters to easily toggle between Cows (🐄) and Goats (🐐).
- Instant sorting systems for price (Low → High / High → Low).
- Fully responsive card display grid displaying animal photo, weight, age, and location.

### 🔐 2. Better Auth & Google Authentication
- Secure email & password signup and login database integration.
- Custom field attributes (like profile Photo URL) saved directly to MongoDB.
- Single-click social login using Google OAuth.
- Complete client-side security guards redirecting unauthenticated users to login before booking.

### 👤 3. Profile Management & Live Updates
- Interactive profile view showing user's name, email, and photo avatar.
- Profile update form allowing users to update their Name and Photo URL.
- Live database updates implemented using Better Auth's standard `authClient.updateUser` API.

### 🩺 4. Secure Booking System
- Interactive booking form on the details page.
- Simulates real-time API submissions to `/api/booking` with simulated network delays.
- Full form resets and custom toast messages (success/loading/error) powered by `react-hot-toast`.

### 🐏 5. Premium Theme & UX
- Custom 404 error page.
- Smooth loading spinners and alert components built using Tailwind CSS & DaisyUI.

---

## 📦 Installed npm Packages

The following npm packages were utilized:
- **`next`**: React framework for App routing.
- **`react` & `react-dom`**: Frontend library.
- **`better-auth`**: Authentication library for modern web apps.
- **`@better-auth/mongo-adapter`**: Better Auth adapter to connect to MongoDB collections.
- **`mongodb`**: Official MongoDB driver.
- **`mongoose`**: MongoDB object modeling tool.
- **`daisyui`**: Tailwind CSS component library for layouts, buttons, and form inputs.
- **`tailwindcss` & `autoprefixer`**: Styling engines.
- **`react-hot-toast`**: Floating notification system.
- **`lottie-react`**: Interactive animation rendering engine.
- **`lucide-react`**: Flat icon pack.
- **`bcryptjs`**: Password hashing helper.

---

## 🛠️ Environment Variables Config

Create a `.env.local` file inside the root directory and configure the following:
```env
MONGODB_URI=your-mongodb-uri-string
BETTER_AUTH_SECRET=your-better-auth-generated-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
```

---

## 👨‍💻 Author
**Salma Khandoker**  
*Full Stack Web Developer*
