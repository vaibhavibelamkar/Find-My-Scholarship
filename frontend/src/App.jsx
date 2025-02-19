import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome to Find My Scholarship
          </h1>
        </div>
      </div>
    </>
  );
}

export default App;
