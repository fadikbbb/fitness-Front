import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/authSlice";

// Define the base URL as a constant
const BASE_URL = process.env.REACT_APP_BASE_URL;

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state;
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
      const response = await axios.post(`${BASE_URL}/auth/verify-login-code`, {
        email,
        password,
        code: inputCode,
      });

      if (response.status === 200) {
        const token = response.data.token;
        dispatch(setToken(token));
        setIsCodeValid(true);
        setShake(true);
        setMessage(response.data.message);
        setTimeout(() => {
          setShake(false);
          navigate("/");
        }, 500);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setShake(true);
          setError(error.response.data.error);
          setTimeout(() => setShake(false), 500);
        } else if (error.response.status === 401) {
          setShake(true);
          setError(error.response.data.error);
          setTimeout(() => setShake(false), 500);
        } else if (error.response.status === 500) {
          setShake(true);
          setError(error.response.data.error);
          setTimeout(() => setShake(false), 500);
        } else {
          setShake(true);
          setError(error.response.data.error || "Something went wrong");
          setTimeout(() => setShake(false), 500);
        }
      }
      // navigate("/auth/login");
    }
  };

  useEffect(() => {
    if (timer === 0) {
      setError("Code expired. Please login again.");
      navigate("/auth/login");
    }

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer, navigate]);

  const handleResendCode = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/resend-code`, {
        email,
        password,
      });
      if (response.status === 200) {
        setTimer(300);
        setMessage(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError(error.response.data.error);
        } else if (error.response.status === 401) {
          setError(error.response.data.error);
        } else if (error.response.status === 500) {
          setError(error.response.data.error);
        } else {
          setError(error.response.data.error || "Something went wrong");
        }
      }
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
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {message && isCodeValid && (
          <p className="text-green-500 mt-4">{message}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyCode;
