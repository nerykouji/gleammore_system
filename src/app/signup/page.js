'use client'

import { useAddUserBackend } from "@/db.supa.backend/users.backend";
import { useCurrentUser } from "@/db.supa.backend/utils";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const Signup = () => {
    const { response: responseAdd, loading: loadingAdd, error: errorAdd, addUserClient } = useAddUserBackend();
    useCurrentUser();
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        address: '',
        contact_no: '',
        sex: '',
        password: '',
        confirm_password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirm_password) {
            toast.error("Passwords do not match!");
        } else {
            const response = await addUserClient(formData);
            if (response) {
                window.location.href = '/signin';
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <section className="bg-white shadow-lg rounded-lg p-8 md:p-12 w-full max-w-3xl">
                <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img className="w-auto h-16" src="https://i.imgur.com/c7LiI6L.png" alt="Logo" />
                </Link>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-6">
                    Sign up to our platform
                </h1>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">Your username</label>
                        <input type="text" name="username" id="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={formData.username} onChange={handleChange} placeholder="johndoe" required />
                    </div>

                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Your name</label>
                        <input type="text" name="name" id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={formData.name} onChange={handleChange} placeholder="John Lemon Juice" required />
                    </div>

                    <div>
                        <label htmlFor="contact_no" className="block mb-2 text-sm font-medium text-gray-700">Your contact number</label>
                        <input type="text" name="contact_no" id="contact_no"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={formData.contact_no} onChange={handleChange} placeholder="+63945456222" required />
                    </div>

                    <div>
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700">Your address</label>
                        <input type="text" name="address" id="address"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={formData.address} onChange={handleChange} placeholder="123 Main St, City, Country" required />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Your email</label>
                        <input type="email" name="email" id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={formData.email} onChange={handleChange} placeholder="name@example.com" required />
                    </div>

                    <div>
                        <label htmlFor="sex" className="block mb-2 text-sm font-medium text-gray-700">Sex</label>
                        <select
                            id="sex"
                            name="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            className="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select your sex</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                        <input type="password" name="password" id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={formData.password} onChange={handleChange} placeholder="••••••••" required />
                    </div>

                    <div>
                        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
                        <input type="password" name="confirm_password" id="confirm_password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={formData.confirm_password} onChange={handleChange} placeholder="••••••••" required />
                    </div>

                    {/* Full-width button */}
                    <button type="submit"
                        className={`col-span-full bg-blue-600 hover:bg-blue-700 focus:ring-blue ring-opacity-[0.15] transition-all duration-[0.3s] ease-in-out 
                                    rounded-lg py-[10px] font-medium text-white`} disabled={loadingAdd}>
                        {loadingAdd ? "Loading..." :'Sign up'}
                    </button>

                    {/* Full-width link to sign in */}
                    <p className={`col-span-full text-sm font-light text-center text-gray-500`}>
                        Have an account?
                        <Link href="/signin" className={`font-medium text-blue hover:underline ml-[4px]`}>Sign in</Link>
                    </p>
                </form>
            </section>
        </div>
    );
}

export default Signup;