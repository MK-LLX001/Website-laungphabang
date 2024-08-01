import React, { useContext, useRef } from "react";
import AnimationWrapper from "../common/page-animation";
import { InputBox } from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { UserContext } from "../App";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId =
  "1070901272027-95c3e0bvoo4n3mkh1il2cfocebl0o77l.apps.googleusercontent.com";

const UserAuthForm = ({ type }) => {
  const {
    userAuth: { access_token, state },
    setUserAuth,
  } = useContext(UserContext);

  const userAuthThroughServer = (serverRoute, formData) => {
    axios
      .post(`${import.meta.env.VITE_SERVER_DOMAIN}${serverRoute}`, formData)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data));
        setUserAuth(data);
        toast.success("Authentication Successful");
      })
      .catch((error) => {
        if (error.response) {
          console.log("Server Error:", error.response.data);
          // toast.error("ທ່ານໄດ້ລງທະບຽນແລ້ວ: ");
          toast.error("Server Error:ເກີດຂໍ້ຜິດຜາດທ່ານໄດ້ລົງທະບຽນແລ້ວບໍ່ ຫຼື ແລ້ວລອງໃຫ່ມອີກ: " + error.response.data.error);
        } else if (error.request) {
          console.log("No response received from server.");
          toast.error("No response received from server.");
        } else {
          console.log("Error setting up the request:", error.message);
          toast.error("Error setting up the request: " + error.message);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serverRoute = type === "sign-in" ? "/signin" : "/signup";
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    const form = new FormData(formElement);
    const formData = {};

    for (const [key, value] of form.entries()) {
      formData[key] = value;
    }

    const { user_name, user_lastname, user_email, user_password } = formData;

    // Validate the form data
    if (type !== "sign-in" && (!user_name || user_name.length < 3)) {
      return toast.error("ກະຮຸນາປ້ອນຊືກອນແລະຕ້ອງມີອັກສອນຍາວກວ່າ 3 ໂຕ");
    }

    if (type !== "sign-in" && (!user_lastname || user_lastname.length < 3)) {
      return toast.error("ກະຮຸນາປ້ອນນາມສະກຸນກອນແລະຕ້ອງມີອັກສອນຍາວກວ່າ 3 ໂຕ");
    }

    if (!user_email || !user_email.length) {
      return toast.error("Enter Email ໃສ່ອີເມວແນ່");
    }
    if (!emailRegex.test(user_email)) {
      return toast.error("Email is invalid ອີເມວທ່ານບໍ່ຕົງຕາມຮູບແບບ");
    }
    if (!user_password || !user_password.length) {
      return toast.error("Enter your password ໃສລະຫັດກອ່ນ");
    }
    // Uncomment if you want to enforce password strength
    // if (!passwordRegex.test(user_password)) {
    //   return toast.error("Password must be 6 to 20 characters long, contain at least one numeric digit, one uppercase and one lowercase letter");
    // }

    userAuthThroughServer(serverRoute, formData);
  };

  const handleGoogleLoginSuccess = async (response) => {
    const { credential } = response;
    try {
      const serverRoute =
        type === "sign-in" ? "/signinWithGoogle" : "/signupWithGoogle";
      await userAuthThroughServer(serverRoute, { credential });
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Google login ເກີດຂໍ້ຜິດຜາດ: " + error.message);
    }
  };

  const handleGoogleLoginError = () => {
    toast.error("Google login ບໍ່ສຳເລັດມີປັນຫາ");
  };

  if (access_token) {
    return state === "admin" ? (
      <Navigate to="/admin" />
    ) : state === "manager" ? (
      <Navigate to="/dashboard/blogs" />
    ) : (
      <Navigate to="/" />
    );
  }

  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form
          id="formElement"
          action=""
          className="w-[80%] max-w-[400px]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-sans capitalize text-center">
            {type === "sign-in" ? "Welcome back" : "Join us today"}
          </h1>

          {type !== "sign-in" && (
            <>
              <InputBox
                name="user_name"
                type="text"
                icon="fi-rr-user"
                placeholder="Name"
              />
              <InputBox
                name="user_lastname"
                type="text"
                icon="fi-rr-user"
                placeholder="Last Name"
              />
            </>
          )}

          <InputBox
            name="user_email"
            type="email"
            icon="fi-rr-envelope"
            placeholder="Email"
          />

          <InputBox
            name="user_password"
            type="password"
            icon="fi-rr-key"
            placeholder="Password"
          />
          <button className="btn-dark center mt-14" type="submit">
            {type.replace("-", "")}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>OR</p>
            <hr className="w-1/2 border-black" />
          </div>

          <div className="bg-grey rounded-xl p-3 w-full flex justify-center items-center">
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
                render={(renderProps) => (
                  <button
                    className="bg-red-500 w-full text-3xl flex items-center justify-center gap-4 py-2"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <img src={googleIcon} className="w-5" alt="Google Icon" />
                    Continue with Google
                  </button>
                )}
              />
            </GoogleOAuthProvider>
          </div>

          {type === "sign-in" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              ບໍ່ມີບັນຊີບໍ?
              <Link to="/signup" className="underline text-black text-xl ml-1">
                Register
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              ເປັນສະມາຊິກແລ້ວບໍ?
              <Link to="/signin" className="underline text-black text-xl ml-1">
                Sign in here.
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
