"use client";
import { type registerState, RegisterUser } from "@/actions/action";
import { useActionState, useEffect } from "react";

export default function Home() {
  const initialState: registerState = { status: undefined, message: "" };
  const [state, formAction, isPending] = useActionState(
    RegisterUser,
    initialState
  );

  useEffect(()=>{
    if(state?.status === "success"){
      alert(state.message)
    }
    else if(state?.status === "error"){
      alert(state.message)
    }
  }, [state])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Registration Form
        </h1>
        <form className="space-y-4" action={formAction}>
          {/* Name */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              name="name"
              placeholder="Enter your name"
            />
            {state?.errors?.["name"]?.[0] && (
              <p className="text-red-500 text-sm">
                {state?.errors?.["name"]?.[0]}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              placeholder="Enter your email"
              name="email"
            />
            {state?.errors?.["email"]?.[0] && (
              <p className="text-red-500 text-sm">
                {state?.errors?.["email"]?.[0]}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700">Date of Birth</label>
            <input
              type="date"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              name="dob"
            />
             {state?.errors?.["dob"]?.[0] && (
              <p className="text-red-500 text-sm">
                {state?.errors?.["dob"]?.[0]}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700">Gender</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center">
                <input type="radio" name="gender" className="mr-2" value="Male"/> Male
              </label>
              <label className="flex items-center">
                <input type="radio" name="gender" className="mr-2" value="Female"/> Female
              </label>
            </div>
            {state?.errors?.["gender"]?.[0] && (
              <p className="text-red-500 text-sm">
                {state?.errors?.["gender"]?.[0]}
              </p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-gray-700">Mobile Number</label>
            <input
              type="tel"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              placeholder="Enter your mobile number"
              name="mobile"
            />
            {state?.errors?.["mobile"]?.[0] && (
              <p className="text-red-500 text-sm">
                {state?.errors?.["mobile"]?.[0]}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              placeholder="Enter your password"
              name="password"
            />
            {state?.errors?.["password"]?.[0] && (
              <p className="text-red-500 text-sm">
                {state?.errors?.["password"]?.[0]}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              placeholder="Confirm your password"
              name="confirmPassword"
            />
             {state?.errors?.["confirmPassword"]?.[0] && (
              <p className="text-red-500 text-sm">
                {state?.errors?.["confirmPassword"]?.[0]}
              </p>
            )}
          </div>

          {/* Submit Button */}
          {isPending ? (
            <button
              disabled
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Please wait...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
