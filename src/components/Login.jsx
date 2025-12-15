import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        // LOGIN API
        const res = await axios.post(
          BASE_URL + "/login",
          { email: emailId, password },
          { withCredentials: true }
        );
        dispatch(addUser(res.data));
        navigate("/"); // after login → go home
      } else {
        // SIGNUP API
        const res = await axios.post(
          BASE_URL + "/signup",
          { firstName, lastName, email: emailId, password },
          { withCredentials: true } 
        );
        dispatch(addUser(res.data))
        navigate("/profile");
      }
    } catch (error) {
      setError(error.response?.data || "Something Went Wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-xl">
          {isLogin ? "Login" : "Signup"}
        </legend>

        {!isLogin && (
          <>
            <label className="label">First Name</label>
            <input
              type="text"
              className="input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              type="text"
              className="input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="py-1 text-red-400">{error}</p>

        <button className="btn btn-neutral mt-2" onClick={handleSubmit}>
          {isLogin ? "Login" : "Signup"}
        </button>

        <p className="mt-3 text-center text-sm">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Signup here
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Login here
              </span>
            </>
          )}
        </p>
      </fieldset>
    </div>
  );
};

export default Auth;