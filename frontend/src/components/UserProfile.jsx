import { useState, useEffect } from "react";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60",
  });

  useEffect(() => {
    // Fetch stored data from localStorage
    const storedData = JSON.parse(localStorage.getItem("userFormData"));

    if (storedData) {
      setUserData({
        name: storedData.fullName || "No Name Provided",
        email: storedData.email || "No Email Provided",
        phone: storedData.mobileNumber || "No Phone Number",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60",
      });
    }
  }, []); // Run only once when component mounts

  return (
    <div className="profile-container">
      <img src={userData.avatar} alt="User Avatar" />
      <h2>{userData.name}</h2>
      <p>Email: {userData.email}</p>
      <p>Phone: {userData.phone}</p>
    </div>
  );
};

export default UserProfile;
