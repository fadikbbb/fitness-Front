import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import useUserFetching from "../../../hooks/users/useUserFetching";
import apiClient from "../../../utils/axiosConfig";
function ReCharge({ userId }) {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [isRecharging, setIsRecharging] = useState(false);
    const [rechargeFormOpen, setRechargeFormOpen] = useState(false);
    const [rechargeAmount, setRechargeAmount] = useState(0);
    const [rechargeAmountError, setRechargeAmountError] = useState(null);
    const [rechargeError, setRechargeError] = useState(null);
    const [rechargeMessage, setRechargeMessage] = useState(null);
    const [rechargeIsLoading, setRechargeIsLoading] = useState(false);
    const [rechargeChanges, setRechargeChanges] = useState(false);
    const { user } = useUserFetching({ userId, rechargeChanges, setRechargeIsLoading, setRechargeError, setRechargeMessage });
    const handleRecharge = async () => {
        setRechargeFormOpen(true);
    };
    const handleConfirmRecharge = async () => {
        setIsRecharging(true);
        try {
            const response = await apiClient.patch(`/users/${userId}/recharge`, { amount: rechargeAmount })
            setMessage(response.data.message);
            setError(null);
            setTimeout(() => {
                setRechargeFormOpen(false);
                setRechargeAmount(0);
                setRechargeAmountError(null);
                setRechargeError(null);
                setRechargeMessage(null);
                setIsRecharging(false);
                setRechargeChanges(!rechargeChanges);
            }, 500);
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "An error occurred");
            setMessage(null);
        } finally {
            setIsRecharging(false);
        }
    };
    const handleCancelRecharge = () => {
        setRechargeFormOpen(false);
        setRechargeAmount(0);
        setRechargeAmountError(null);
        setRechargeError(null);
        setRechargeMessage(null);
        setIsRecharging(false);
    };
    return (
        <div>
            <button className="btn btn-primary" onClick={handleRecharge}>
                Recharge
            </button>
            {rechargeFormOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
                        <h2 className="text-lg font-bold mb-4 text-primary">
                            Recharge Account
                        </h2>
                        <p className="text-red-500 mb-4">{rechargeError}</p>
                        <p className="text-green-500 mb-4">{rechargeMessage}</p>
                        <form
                            className="flex flex-col"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleConfirmRecharge();
                            }}
                        >
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="rechargeAmount"
                                >
                                    Recharge Amount
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="rechargeAmount"
                                    type="number"
                                    value={rechargeAmount}
                                    onChange={(e) => {
                                        setRechargeAmountError(null);
                                        setRechargeAmount(e.target.value);
                                    }}
                                />
                                {rechargeAmountError && (
                                    <p className="text-red-500">{rechargeAmountError}</p>
                                )}
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Recharge
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-4"
                                    onClick={handleCancelRecharge}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReCharge;