import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';


const Modal = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    // User Signup Using Email and Password
    const {login, signInWithGoogle} = useContext(AuthContext);

    const onSubmit = (data) => {
        setLoading(true);
        const email = data.email
        const password = data.password
        login(email, password).then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigate("/events");
        }).catch((error) => {
            console.error("Error:", error);
            alert("Login failed. Please try again.");
        });
    };

    // Google Sign-in
    const googleSignIn = () => {
        signInWithGoogle().then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigate("/events");
        }).catch((error) => {
            console.error("Error:", error);
            alert("Signup failed. Please try again.");
        });
    }

    return (
        <dialog id='LoginModel'>
            <div className="flex md:w-[1100px] min-h-screen items-center justify-center bg-[#ffffff1c] p-10">
                <div className=" shadow-2xl rounded-2xl p-10 w-full max-w-lg">
                    {/* Close Button */}
                    <button
                        className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                        onClick={() => document.getElementById('LoginModel').close()}
                    >
                        <AiOutlineClose size={24} />
                    </button>
                    <h2 className="text-center text-3xl font-sans font-bold text-gray-800">Please Login</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
                        {/* Email */}
                        <div>
                            <label className="block text-gray-600 text-sm font-medium">Email</label>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                                })}
                                type="email"
                                placeholder="john@example.com"
                                className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        {/* Password with Eye Icon */}
                        <div className="relative">
                            <label className="block text-gray-600 text-sm font-medium">Password</label>
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                                })}
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black pr-10"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-10 text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
                            disabled={loading}
                        >
                            {loading ? "Log in..." : "Log in"}
                        </button>

                        {/* OR Separator */}
                        <div className="flex items-center my-4">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <p className="px-4 text-gray-500 text-sm">OR</p>
                            <div className="flex-1 border-t border-gray-300"></div>
                        </div>

                        {/* Google Sign-in Button */}
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                            onClick = {googleSignIn}
                        >
                            <FcGoogle size={22} />
                            <span className="text-gray-700 font-medium">Sign in with Google</span>
                        </button>

                        {/* Redirect to Signup */}
                        <p className="text-center text-sm text-gray-600 mt-4">
                            Don&apos;t have an account?{" "}
                            <Link to="/signup" className="text-blue-600 hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </dialog>


    )
}

export default Modal
