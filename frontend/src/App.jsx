import "./App.css";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <LandingPage />
      </div>
    </>
  );
}

export default App;
