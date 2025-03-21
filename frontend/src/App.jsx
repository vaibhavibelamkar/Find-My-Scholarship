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
    path: "/user/dashboard",
    element: (
      <>
        <Navbar />
        <ProtectedRoute element={<UserDashboard />} />
        {/* <UserDashboard /> */}
      </>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <>
        <Navbar />
        {/*<ProtectedRoute element={<AdminDashboard />} />*/}
        <AdminDashboard />
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
    path: "user/scheme",
    element: (
      <>
       <ProtectedRoute element={<Scheme />} />
      </>
     
    )
  },
  {
    path: "user/scholarships/check-eligibility",
    element: (
      <>
        <Navbar />
        <ProtectedRoute element={<ScholarshipForm />} />,
        {/* <ScholarshipForm /> */}
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
]);

function App() {
  return (
    <main className="min-h-screen bg-gray-50">
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
