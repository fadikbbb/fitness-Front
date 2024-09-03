import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/authSlice";
import { setUserId } from "../../store/userSlice";
import { jwtDecode } from "jwt-decode";
// Define the base URL as a constant
const BASE_URL = process.env.REACT_APP_BASE_URL;

const VerifyCode = () => {

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // Check if location.state is available
  const { state } = location;
  const purpose = state?.purpose;
  const data = state || {};

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/"); // Redirect to home if token exists
    }
  }, [navigate]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]*$/.test(value)) {
      const newCode = code.split("");
      if (value.length === 0 && index > 0) {
        newCode[index - 1] = "";
        setCode(newCode.join(""));
        inputRefs.current[index - 1].focus();
      } else {
        newCode[index] = value;
        setCode(newCode.join(""));
        if (value && index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
        if (newCode.join("").length === 6) {
          verifyCode(newCode.join(""));
        }
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split("");
      setCode(newCode.join(""));
      newCode.forEach((char, index) => {
        inputRefs.current[index].value = char;
      });
      verifyCode(pastedData);
    }
  };
  const verifyCode = async (inputCode) => {
    console.log({ ...data, code: inputCode });
    try {
      const response = await axios.post(`${BASE_URL}/auth/verify-code`, {
        ...data,
        code: inputCode,
      });
  
      setShake(true);
      setError("");
      setMessage(response.data.message);
  
      if (purpose === "login") {
        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        dispatch(setUserId(decodedToken.userId));
        dispatch(setToken(token));  // Store token in Redux state
        localStorage.setItem("authToken", token);  // Store token in localStorage
  
        setTimeout(() => {
          setShake(false);
          navigate("/");  // Redirect to home page
        }, 1000);
      } else if (purpose === "register") {
        setTimeout(() => {
          setShake(false);
          navigate("/auth/login", { state: { ...data } });  // Redirect to login page
        }, 1000);
      }
    } catch (error) {
      setMessage("");
      if (error.response) {
        console.log(error);
        setShake(true);
        setError(error.response.data.error || "Something went wrong");
        setTimeout(() => setShake(false), 1000);
      }
    }
  };
  

  const handleResendCode = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/verify-code`, {
        email: data.email,
        password: data.password,
      });
      if (response.status === 200) {
        setCode("");
        setError("");
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("");
      if (error.response) {
        setError(error.response.data.error || "Something went wrong");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div
        className={`${
          shake ? "animate-shake" : ""
        } p-6 rounded-lg shadow-lg bg-white max-w-sm text-center`}
      >
        <h2 className="text-2xl mb-4 font-bold">Enter Verification Code</h2>
        <div
          className={`flex justify-center space-x-2 mb-4 ${
            shake ? "shake" : ""
          }`}
          onPaste={handlePaste}
        >
          {Array(6)
            .fill()
            .map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={code[index] || ""}
                onChange={(e) => handleChange(e, index)}
                className={`${error ? "bg-red-100 border-red-500 " : ""} ${
                  message ? "bg-green-100 border-green-500 " : ""
                } w-10 h-10 text-center border rounded`}
              />
            ))}
        </div>
        <div>
          {message && <p className="text-green-500 mt-4">{message}</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <button
            onClick={handleResendCode}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
