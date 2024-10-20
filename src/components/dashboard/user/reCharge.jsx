import React from "react";
import {FaCreditCard} from "react-icons/fa";
function ReCharge({ userId }) {
  return (
    <button
      type="submit"
      className="bg-primary text-xs hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      <FaCreditCard className="w-6 h-6 md:hidden" />
      <div className="hidden md:block">

      Recharge
      </div>
    </button>
  );
}

export default ReCharge;
