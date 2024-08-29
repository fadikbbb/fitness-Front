import { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState([]);
    const [errorPath, setErrorPath] = useState([]);
    const [success, setSuccess] = useState('');

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/v1/auth/register', formData);
            setSuccess('Registration successful!');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            });
            setErrors([]);
            setErrorPath([]);
        } catch (error) {
            setErrors(error.response.data.errors.map((err) => err.msg));
            setErrorPath(error.response.data.errors.map((err) => err.path));
            setSuccess('');
            console.log(errors[0]);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Register</h2>

            {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    {errors.map((errors, i) => errorPath[i] === 'firstName' ? <p key={i} className="text-red-500 text-sm mt-1">{errors}</p> : "")}
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errorPath === 'firstName' ? 'border-red-500' : ''}`}
                    />
                </div>
                <div className="mb-4">
                    {errors.map((errors, i) => errorPath[i] === 'lastName' ? <p key={i} className="text-red-500 text-sm mt-1">{errors}</p> : "")}
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errorPath === 'lastName' ? 'border-red-500' : ''}`}
                    />
                </div>
                <div className="mb-4">
                    {errors.map((errors, i) => errorPath[i] === 'email' ? <p key={i} className="text-red-500 text-sm mt-1">{errors}</p> : "")}
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errorPath === 'email' ? 'border-red-500' : ''}`}
                    />
                </div>
                <div className="mb-4">
                    {errors.map((errors, i) => errorPath[i] === 'password' ? <p key={i} className="text-red-500 text-sm mt-1">{errors}</p> : "")}
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errorPath === 'password' ? 'border-red-500' : ''}`}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
