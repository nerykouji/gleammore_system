'use client'


import { useUserAuthBackend } from "@/db.supa.backend/users.backend";
import { getCurrentUser, useCurrentUser } from "@/db.supa.backend/utils";
import Link from "next/link";
import { useState } from "react";



const Signin = () => {
    const { user: response, loading, error, login } = useUserAuthBackend();
    const [user, setUser] = useState({
        username: "",
        password: '',
    })

    useCurrentUser();


    const handleUser = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dat = await login(user.username, user.password)
        if (dat !== undefined) {
            if(dat.role === 1){
                window.location.href = '/admin'
            }else{
                window.location.href = '/'
            }
        }
    };





    return (
        <div>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                        <img className="w-auto h-16" src="https://i.imgur.com/c7LiI6L.png" alt="" />
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Your username</label>
                                    <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " value={user.username} placeholder="johndoe" onChange={handleUser} required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " value={user.password} onChange={handleUser} required />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 ">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</a>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                                <p className="text-sm font-light text-gray-500 ">
                                    Don’t have an account yet? <Link href="/signup" className="font-medium text-primary-600 hover:underline ">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Signin;