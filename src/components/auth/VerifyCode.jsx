import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyCode = () => {
  const [code, setCode] = useState(""); // State for the verification code input
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [shake, setShake] = useState(false); // State for shaking animation
  const [isCodeValid, setIsCodeValid] = useState(false); // State for code validation status
  const inputRefs = useRef([]); // Refs for each input field
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state; // Get email from location state
  const { password } = location.state; // Get password from location state
  const [timer, setTimer] = useState(300); // 5-minute countdown timer

  // Handle input change and automatically move focus
  const handleChange = (e, index) => {
    const { value } = e.target;

    if (/^[0-9]*$/.test(value)) {
      const newCode = code.split(""); // Convert code to an array

      if (value.length === 0 && index > 0) {
        // Handle deletion
        newCode[index - 1] = ""; // Clear the previous input field
        setCode(newCode.join("")); // Update code state
        inputRefs.current[index - 1].focus(); // Move focus to previous input
      } else {
        newCode[index] = value; // Update the value at the current index
        setCode(newCode.join("")); // Convert array back to a string

        // Move focus to the next input if the current one is filled
        if (value && index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }

        // Automatically submit the code when all 6 digits are filled
        if (newCode.join("").length === 6) {
          verifyCode(newCode.join(""));
        }
      }
    }
  };

  // Handle paste event to fill multiple inputs
  const handlePaste = (e) => {
    e.preventDefault(); // Prevent the default paste action
    const pastedData = e.clipboardData.getData("text");

    // Validate and process the pasted data
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split(""); // Split pasted code into individual characters
      setCode(newCode.join("")); // Update code state
      newCode.forEach((char, index) => {
        inputRefs.current[index].value = char; // Update each input field
      });
      verifyCode(pastedData); // Verify the pasted code
    }
  };

  // Verify the code with the backend
  const verifyCode = async (inputCode) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/verify-login-code",
        {
          email,
          password,
          code: inputCode,
        }
      );

      if (response.data.message === "success") {
        const token = response.data.token; // Extract the token from the response

        // Store the token securely
        localStorage.setItem("authToken", token); // Store token in localStorage

        setIsCodeValid(true); // Set code validation status to true
        setShake(true); // Trigger shake animation

        setTimeout(() => {
          setShake(false); // Reset shake animation after 500ms
          navigate("/", { token: { token } }); // Navigate to home page after successful verification
        }, 500);
      } else {
        setShake(true); // Trigger shake animation if code is incorrect
        setErrorMessage("Invalid verification code. Please try again.");
        setTimeout(() => setShake(false), 500); // Reset shake animation after 500ms
      }
    } catch (error) {
      console.error("Verification error:", error);
      setErrorMessage(
        "Code expired or verification failed. Please login again."
      );
      navigate("/auth/login"); // Redirect to login page if error occurs
    }
  };

  // Handle code expiration
  useEffect(() => {
    if (timer === 0) {
      setErrorMessage("Code expired. Please login again.");
      navigate("/auth/login"); // Redirect to login page on expiration
    }

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown); // Cleanup timer on component unmount
  }, [timer, navigate]);

  // Resend the verification code
  const handleResendCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/resend-verification-code",
        {
          email,
          password,
        }
      );

      if (response.data.message) {
        setErrorMessage("Verification code resent. Please check your email.");
        setTimer(300); // Reset timer to 5 minutes
      } else {
        setErrorMessage("Failed to resend code. Please try again.");
      }
    } catch (error) {
      console.error("Resend code error:", error);
      setErrorMessage("Error resending code. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className={`w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md ${
          shake ? "animate-shake" : ""
        }`}
      >
        <h2 className="text-2xl font-bold text-center">
          Enter Verification Code
        </h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="flex justify-center space-x-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              ref={(el) => (inputRefs.current[index] = el)} // Set ref for each input
              onChange={(e) => handleChange(e, index)} // Handle input change
              onPaste={handlePaste} // Handle paste event
              value={code[index] || ""} // Set input value
              className={`w-10 h-12 text-center border rounded-md text-xl ${
                shake
                  ? isCodeValid
                    ? "bg-green-100 border-green-500" // Green border and background when code is valid
                    : "bg-red-100 border-red-500" // Red border and background when code is invalid
                  : "border-gray-300"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleResendCode}
          className="w-full mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Resend Code
        </button>
      </div>
    </div>
  );
};

export default VerifyCode;
