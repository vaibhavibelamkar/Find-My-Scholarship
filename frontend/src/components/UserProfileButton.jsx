import { useState, useEffect } from "react";
import { User } from "lucide-react"; // Assuming Lucide icons are used

const UserProfileButton = () => {
  const [userData, setUserData] = useState({
    name: "User",
    email: "john.doe@example.com",
    phone: "",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60"
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userFormData"));
    if (storedData) {
      setUserData({
        name: storedData.fullName || "User",
        email: storedData.email || "john.doe@example.com",
        phone: storedData.mobileNumber || "",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60",
      });
    }
  }, []);

  const handleProfileClick = () => {
    alert(`User: ${userData.name}\nEmail: ${userData.email}\nPhone: ${userData.phone}`);
  };

  return (
    <button onClick={handleProfileClick} className="flex items-center space-x-3 cursor-pointer focus:outline-none">
      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
        <User className="h-5 w-5 text-[#001a33]" />
      </div>
      <span className="text-white">{userData.name}</span>
    </button>
  );
};

export default UserProfileButton;
