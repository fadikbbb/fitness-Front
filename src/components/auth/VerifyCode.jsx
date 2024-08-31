import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/authSlice";

// Define the base URL as a constant
const BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://localhost:5000/api/v1/auth";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [shake, setShake] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state || {};
  const [timer, setTimer] = useState(300);
  const dispatch = useDispatch();

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
    try {
      const response = await axios.post(`${BASE_URL}/verify-login-code`, {
        email,
        password,
        code: inputCode,
      });

      if (response.data.message === "success") {
        const token = response.data.token;
        dispatch(setToken(token)); // Dispatch action to set token

        setIsCodeValid(true);
        setShake(true);

        setTimeout(() => {
          setShake(false);
          navigate("/"); // Navigate to home page after successful verification
        }, 500);
      } else {
        setShake(true);
        setErrorMessage("Invalid verification code. Please try again.");
        setTimeout(() => setShake(false), 500);
      }
    } catch (error) {
      console.error("Verification error:", error);
      setErrorMessage(
        "Code expired or verification failed. Please login again."
      );
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    if (timer === 0) {
      setErrorMessage("Code expired. Please login again.");
      navigate("/auth/login");
    }

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer, navigate]);

  const handleResendCode = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/resend-verification-code`,
        {
          email,
          password,
        }
      );

      if (response.data.message === "Verification code sent") {
        setTimer(300); // Reset timer to 5 minutes
        setErrorMessage("Verification code resent. Please check your email.");
      }
    } catch (error) {
      console.error("Resend error:", error);
      setErrorMessage("Error resending verification code. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 rounded-lg shadow-lg bg-white max-w-sm text-center">
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
                className="w-10 h-10 text-center border rounded"
              />
            ))}
        </div>
        <div>
          <button
            onClick={handleResendCode}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Resend Code
          </button>
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default VerifyCode;
