import React from "react";
import { motion } from "framer-motion";
import { Eye, Edit } from "lucide-react";
export function ButtonSwitch({ activeMode, toggleMode }) {
  return (
    <div className="mb-4">
      <motion.div
        className="bg-white rounded-full p-1 flex shadow-lg"
        initial={false}
        animate={{
          backgroundColor: activeMode === "edit" ? "#E5E7EB" : "#F3F4F6",
        }}
        transition={{
          duration: 0.3,
        }}
      >
        <motion.button
          className={`relative px-4 py-2 rounded-full text-sm font-medium focus:outline-none`}
          onClick={toggleMode}
          animate={{
            color: activeMode === "edit" ? "#4B5563" : "#9CA3AF",
          }}
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <span className="relative z-10 flex items-center space-x-2">
            <Edit size={16} />
            <span>Edit</span>
          </span>
          {activeMode === "edit" && (
            <motion.div
              className="absolute inset-0 bg-white rounded-full shadow-sm"
              layoutId="activeButton"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
        </motion.button>
        <motion.button
          className={`relative px-4 py-2 rounded-full text-sm font-medium focus:outline-none`}
          onClick={toggleMode}
          animate={{
            color: activeMode === "preview" ? "#4B5563" : "#9CA3AF",
          }}
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <span className="relative z-10 flex items-center space-x-2">
            <Eye size={16} />
            <span>Preview</span>
          </span>
          {activeMode === "preview" && (
            <motion.div
              className="absolute inset-0 bg-white rounded-full shadow-sm"
              layoutId="activeButton"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}
