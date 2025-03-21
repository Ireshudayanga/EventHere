import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const { createUser, signInWithGoogle, updateUserProfile, user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  // User Signup Using Email and Password
  const onSubmit = (data) => {
    setLoading(true);
    const email = data.email;
    const password = data.password;
    const name = data.name;
    console.log(data);

    createUser(email, password).then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      updateUserProfile(
        data.name,
        data.email,
      ).then(() => {
        const userInfo = {
          name: data.name,
          email: data.email,
        }
        axiosPublic.post("/users", userInfo)
          .then(() => {
            alert("SignUp successful!");
          })
          .catch((error) => {
            console.error("Error signing up:", error);
          });

        navigate("/");
      }).catch((error) => {
        console.error("Error:", error);
        alert("Signup failed. Please try again.");
        setLoading(false);
      });
    }).catch((error) => {
      console.error("Error:", error);
      alert("Signup failed. Please try again.");
      setLoading(false);
    });
  };

  // Google Sign-in
  const googleSignIn = () => {
    signInWithGoogle().then((userCredential) => {
      const user = userCredential.user;
      //console.log(user);
      const userInfo = {
        name: user.displayName,
        email: user.email,
      }
      axiosPublic.post("/users", userInfo)
        .then((res) => {
          alert("SignUp successful!");
          navigate("/events");
          //console.log(user);
        })
        .catch((error) => {
          console.error("Error signing up:", error);
          alert("SignUp failed!");
          console.log(user);
        });
    }).catch((error) => {
      console.error("Error:", error);
      alert("Signup failed. Please try again.");
      setLoading(false);
    });
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-100 to-blue-200 p-6 relative">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          onClick={() => navigate("/")}
        >
          <AiOutlineClose size={24} />
        </button>

        <h2 className="text-center text-2xl font-sans font-bold text-gray-800">Create an Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">Full Name</label>
            <input
              {...register("name", { required: "Full name is required" })}
              type="text"
              placeholder="John Doe"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

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
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black"
              autoComplete="username" // Added autocomplete attribute
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
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black pr-10"
              autoComplete="new-password" // Added autocomplete attribute
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

          {/* Confirm Password with Eye Icon */}
          <div className="relative">
            <label className="block text-gray-600 text-sm font-medium">Confirm Password</label>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black pr-10"
              autoComplete="new-password" // Added autocomplete attribute
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {/* OR Separator */}
          <div className="flex items-center my-3">
            <div className="flex-1 border-t border-gray-300"></div>
            <p className="px-3 text-gray-500 text-sm">OR</p>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Sign-in Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            onClick={googleSignIn}
          >
            <FcGoogle size={22} />
            <span className="text-gray-700 font-medium">Sign in with Google</span>
          </button>

          {/* Redirect to Login */}
          <p className="text-center text-sm text-gray-600 mt-3">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
