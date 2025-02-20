import "./App.css";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Dashboard from "./pages/user/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";

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
        <Dashboard />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
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
