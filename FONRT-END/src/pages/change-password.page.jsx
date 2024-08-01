import { useRef, useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { InputBox } from "../components/input.component";
import { Toaster, toast } from "react-hot-toast";
import { UserContext } from "../App";
import { UpdatePassword } from "../function/Users.api";

const ChangePassword = () => {
  const { userAuth: { user_id } } = useContext(UserContext);
  const changePasswordForm = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(changePasswordForm.current);
    const formData = {};
    for (const [key, value] of form.entries()) {
      formData[key] = value;
    }

    const { currentpassword, newpassword, confirmpassword } = formData;

    if (!currentpassword || !newpassword || !confirmpassword) {
      return toast.error("Please fill out all fields.");
    }

    if (newpassword !== confirmpassword) {
      return toast.error("New password and confirm password do not match.");
    }

    try {
      const response = await UpdatePassword(user_id, formData);
      toast.success(response.message + " update success");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AnimationWrapper>
      <Toaster />
      <form ref={changePasswordForm} onSubmit={handleSubmit} className="">
        <h1 className="hidden md:block">Change Password</h1>
        <div className="py-10 w-full md:max-w-[600px]">
          <InputBox
            name="currentpassword"
            type="password"
            placeholder="Current Password"
            className="profile-edit-input "
            icon="fi-rr-unlock"
          />
          <InputBox
            name="newpassword"
            type="password"
            placeholder="New Password"
            className="profile-edit-input"
            icon="fi-rr-unlock"
          />
          <InputBox
            name="confirmpassword"
            type="password"
            placeholder="Confirm Password"
            className="profile-edit-input"
            icon="fi-rr-unlock"
          />
          <button className="btn-dark px-10" type="submit">
            Change Password
          </button>
        </div>
      </form>
    </AnimationWrapper>
  );
};

export default ChangePassword;
