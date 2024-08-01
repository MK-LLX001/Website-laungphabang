import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";

const clientId = "1070901272027-95c3e0bvoo4n3mkh1il2cfocebl0o77l.apps.googleusercontent.com";

const GoogleLoginComponent = () => {
  const onSuccess = async (response) => {
    console.log("Login Success:", response);
    const { credential } = response;
    console.log("Credential: ", credential);

    try {
      await signupWithGoogle({ credential });
      toast.success('User saved successfully!');
      // Navigate to home page or show home page content after login
      document.getElementById('home-content').innerHTML = '<h1>Hello Home Page Login with Google</h1><p><a href="#" onClick="handleLogout()">Logout</a></p>';
    } catch (error) {
      console.log("Error: ", error);
      toast.error('Error saving user: ' + error.message);
    }
  };

  const onError = () => {
    console.log("Login Failed");
    toast.error("Login Failed!");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;

const signupWithGoogle = async (data) => {
  const response = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/signupWithGoogle", data);
  return response.data;
};

// Function to handle logout
window.handleLogout = () => {
  // Implement your logout logic here, such as clearing session, state, etc.
  // Example:
  // 1. Clear local storage or session storage
  // 2. Redirect to logout page or clear user context
  document.getElementById('home-content').innerHTML = '<p>Logged out successfully!</p>';
};
