import React from "react";

const LoadingButton = ({ isLoading, onClick, children }) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className={`relative inline-flex items-center justify-center px-4 py-2 text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
        >
            {isLoading ? (
                <div className="loader"></div>
            ) : (
                children
            )}
            {isLoading && (
                <span className="absolute inset-0 flex items-center justify-center">
                    <svg
                        className="w-5 h-5 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 1016 0A8 8 0 004 12zm4 0a4 4 0 108 0 4 4 0 00-8 0z"
                        />
                    </svg>
                </span>
            )}
        </button>
    );
};

export default LoadingButton;
