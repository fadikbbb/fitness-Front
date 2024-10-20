// src/components/Loading.js
import React from "react";

const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="loader"></div>
            <p className="mt-2 text-lg">Loading...</p>
        </div>
    );
};

export default Loading;
