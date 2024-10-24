
import { IoFilterOutline } from "react-icons/io5";
import React from "react";
export function Filter({
    isOpen,
    setIsOpen,
    register,
    categories,
    isUser, isExercise
}) {
    return <div className={`items-start  flex flex-col md:flex-row bg-white rounded-md 
                            transition-all duration-500 ease-in-out
                            ${isOpen ? "md:min-w-full md:max-w-full md:h-fit max-h-full" : "max-h-[60px] w-full md:min-w-[90px] md:max-w-[92px]"}`}>
        <button onClick={() => setIsOpen(!isOpen)} className="p-4 min-h-[55px] text-left overflow-hidden
                            rounded-b-md w-full  md:min-w-[100px] md:w-fit transition-all duration-300
                            ease-in-out focus:outline-none">
            <div className="flex justify-between items-center">
                <div className=" min-h-full w-full  flex items-center justify-between space-x-2">
                    <span>Filters</span>
                    <IoFilterOutline className="w-4 h-4" />
                </div>
            </div>
        </button>
        <div className={`w-full  overflow-hidden rounded-md transition-all duration-500 ease-in-out ${isOpen ? "max-h-[300px]" : "max-h-0"}`}>
            <form className={`space-y-4 p-4 flex flex-col md:flex-row
                 md:p-2 md:space-y-0 md:space-x-2 justify-between
                  transition-opacity duration-300 ease-in-out`}>
                {
                    isExercise ?
                        <>
                            <select {...register("intensity")} className="p-2 border border-gray-300 rounded-md">
                                <option value="">Intensity</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </>
                        : null
                }
                {categories &&
                    <select {...register("category")} defaultValue="" className="w-full md:w-[calc(100%/2 - 5px)] p-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="" disabled>Select a category</option>
                        {categories.map(category => <option key={category} value={category}>
                            {category}
                        </option>)}
                        <option value="">All</option>
                    </select>
                }
                {
                    isUser ?
                        <>
                            <select
                                id="subscription"
                                {...register("subscription")}
                                className="p-2 md:w-1/2 border border-gray-300 rounded-md"
                            >
                                <option disabled value="">
                                    select a subscription
                                </option>
                                <option value="free">Free</option>
                                <option value="premium">Premium</option>
                                <option value="">All</option>
                            </select>
                            <select
                                id="isActive"
                                {...register("isActive")}
                                className="p-2 md:w-1/2 border border-gray-300 rounded-md"
                            >
                                <option disabled value="">
                                    isBlocked
                                </option>
                                <option value="false">Blocked</option>
                                <option value="true">UnBlocked</option>
                                <option value="">All</option>
                            </select>
                        </>
                        : null}
                <select {...register("limit")} defaultValue="5" className="w-full md:w-[calc(100%/2 - 5px)] p-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </form>
        </div>
    </div>;
}
