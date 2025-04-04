import "./App.css";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import UserDashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Scheme from "./pages/user/Scheme";
import ScholarshipForm from "./pages/user/ScholarshipForm";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <LandingPage />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/reset-password/:id/:token",
    element: (
      <>
        <Navbar />
        <ResetPassword />
      </>
    ),
  },

  // ✅ Protected User Routes
  {
    path: "/user/dashboard",
    element: (
      <>
        <Navbar />
        <ProtectedRoute element={<UserDashboard />} allowedRole="user" />
      </>
    ),
  },
  {
    path: "/user/scheme",
    element: (
      <>
        <Navbar />
        <ProtectedRoute element={<Scheme />} allowedRole="user" />
      </>
    ),
  },
  {
    path: "/user/scholarships/check-eligibility",
    element: (
      <>
        <Navbar />
        <ProtectedRoute element={<ScholarshipForm />} allowedRole="user" />
      </>
    ),
  },

  // ✅ Protected Admin Route
  {
    path: "/admin/dashboard",
    element: (
      <>
        <Navbar />
        <ProtectedRoute element={<AdminDashboard />} allowedRole="admin" />
      </>
    ),
  },
]);

function App() {
  return (
    <main className="min-h-screen bg-gray-50">
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
