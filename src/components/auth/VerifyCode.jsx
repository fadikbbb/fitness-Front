import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId, setUserRole, setToken } from "../../store/authSlice";
import { jwtDecode } from "jwt-decode";

const BASE_URL = process.env.REACT_APP_BASE_URL;
axios.defaults.withCredentials = true;
const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { state } = location;
  const purpose = state?.purpose; // Default purpose to "login"
  const [data, setData] = useState(state || {}); // Set data to state || {}; // Default to an empty object
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
    setData(state || {});
    setLoading(true); // Set loading to true
    try {
      const response = await axios.post(`${BASE_URL}/auth/verify-code`, {
        ...data,
        code: inputCode,
      });
      setMessage(response.data.message);
      if (purpose === "login") {
        const token = response.data.token;
        try {
          const decodedToken = jwtDecode(token); 
          dispatch(setUserRole(decodedToken.role));
          dispatch(setToken(token));
          dispatch(setUserId(decodedToken.userId));
          // localStorage.setItem("authToken", token);
          setShake(true);
          setTimeout(() => {
            navigate("/");
          }, 1000);
         
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      } else if (purpose === "register") {
        setShake(true);
        setTimeout(() => {
          navigate("/auth/login", { state: { ...data } });
        }, 1000);
      }
      setError("");
    } catch (error) {
      setMessage("");
      if (error.response) {
        setShake(true);
        setError(error.response.data.error || "Something went wrong");
      }
    } finally {
      setTimeout(() => setShake(false), 1000);
      setLoading(false);
    }
  };
  const handleResendCode = async () => {
    // Validate required fields before proceeding
    if (!data.email || !data.purpose) {
      setError("Please fill in all required fields."); // Show error message
      return; // Stop the function from proceeding
    }

    setLoading(true); // Set loading to true

    try {
      const response = await axios.post(`${BASE_URL}/auth/verify-code`, data);

      setError(""); // Clear any previous errors
      setShake(true); // Trigger shaking animation
      setMessage(response.data.message); // Set the success message

      // Clear the code state and input fields
      setCode("");
      inputRefs.current.forEach((input) => {
        if (input) input.value = ""; // Clear each input field
      });
    } catch (error) {
      setMessage(""); // Clear the message on error
      if (error.response) {
        setError(error.response.data.error || "Something went wrong"); // Set the error message
      } else {
        setError("Something went wrong"); // Handle other types of errors
      }
    } finally {
      setLoading(false); // Set loading to false
      setTimeout(() => {
        setShake(false); // Stop the shaking animation after a delay
      }, 1000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <div className={`p-6 rounded-lg shadow-lg bg-white max-w-sm text-center`}>
        <h2 className="text-2xl mb-4 font-bold text-primary">
          Enter Verification Code
        </h2>
        <div
          className={`flex justify-center space-x-2 mb-4 ${
            shake ? "animate-shake" : ""
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
                className={`${error ? "border-red-500 bg-red-200" : ""} ${
                  message ? "border-green-500 bg-green-200" : ""
                } w-10 h-10 text-center border rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
                disabled={loading} // Disable input fields during loading
              />
            ))}
        </div>
        <div>
          {message && <p className="text-green-500 mt-4">{message}</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <button
            onClick={handleResendCode}
            className="mt-4 px-4 py-2 bg-button text-white rounded hover:bg-buttonHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            disabled={loading} // Disable button during loading
          >
            {loading ? "Resending..." : "Resend Code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
