"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

// import { signIn } from "next-auth/react";
// import Google from "next-auth/providers/google";

interface FormData {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { errors } = formState;
  const[backerror , setBackerror] = React.useState({password: "" , email:"" })
  const router = useRouter()

  const gotologin = () => {
    router.push("/auth/login");
  };

  const signup = async (data: FormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data?.email,
          password: data?.password,
          fullname: data?.fullname
        }),
        credentials: "include",
      });

     

          if (!response.ok) {
            const errorObj = await response.json();
            setBackerror({ password: errorObj.err.password, email: errorObj.err.email });
            console.log(errorObj);
          } else {
            alert("Signup successful!");
            const signInResponse = await signIn("credentials", {
              redirect: false,
              email: data.email,
              password: data.password,
              callbackUrl: "/",
            });
      
            // Check if sign-in was successful and redirect to the provided callbackUrl
            if (signInResponse?.url) {
              router.push(signInResponse.url); // Redirect to home page or custom URL
            } else {
              // Optionally handle error if sign-in fails
              console.error("Sign-in failed");
            }
  
          }

      
      // Handle successful signup here (e.g., redirect to login or home page)
    } catch (error) {
      console.error("Signup error:", error);
      // Handle errors (e.g., show error message to user)
    }
  };

  return (
    <div className="flex justify-center w-[720px] h-[850px]">
      <div className="flex flex-col gap-6 w-[408px] h-auto mt-8">
        {/* title */}
        <div className="flex flex-col gap-6">
          <h1 className="font-black text-[32px] text-[#25324B] text-center">
            Sign Up Today
          </h1>
          
        </div>

        <div className="flex items-center justify-between text-semigray">
          <svg
            width="108"
            height="1"
            viewBox="0 0 108 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="-4.37114e-08"
              y1="0.5"
              x2="108"
              y2="0.499991"
              stroke="#D6DDEB"
            />
          </svg>
          <p>Sign Up with Email</p>
          <svg
            width="108"
            height="1"
            viewBox="0 0 108 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="-4.37114e-08"
              y1="0.5"
              x2="108"
              y2="0.499991"
              stroke="#D6DDEB"
            />
          </svg>
        </div>

        <form
          className="flex flex-col gap-[22px]"
          onSubmit={handleSubmit(signup)}
        >
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-base text-semigray font-poppins">
              Full Name
            </p>
            <input
              placeholder="Enter your full name"
              className="w-full h-12 border px-4 py-3 rounded-lg bg-transparent outline-none border-verylightpurple"
              type="text"
              {...register("fullname", {
                required: "name is required",
                
              })}
            />
            <p className="mx-4 text-xs text-red-500">
              {errors.fullname ? "*" + errors.fullname.message : ""}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-semibold text-base text-semigray font-epilogue">
              Email Address
            </p>
            <input
              id="email"
              type="email"
              placeholder="Enter email address"
              className="w-full h-12 border px-4 py-3 rounded-lg bg-transparent outline-none border-verylightpurple"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "invalid email address",
                },
              })}
            />
            <p className="mx-4 text-xs text-red-500">
              {errors.email ? "*" + errors.email.message : ""}
              {backerror.email ? backerror.email : ""}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-semibold text-base text-semigray font-poppins">
              Password
            </p>
            <input
              placeholder="Enter password"
              className="w-full h-12 border px-4 py-3 rounded-lg bg-transparent outline-none border-verylightpurple"
              type="password"
              {...register("password", {
                required: "password is required",
              })}
            />
            <p className="mx-4 text-xs text-red-500">
              {errors.password ? "*" + errors.password.message : ""}
              {backerror.password ?  "*"  + backerror.password : ""}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-semibold text-base text-semigray font-poppins">
              Confirm Password
            </p>
            <input
              placeholder="Enter password"
              className="w-full h-12 border px-4 py-3 rounded-lg bg-transparent outline-none border-verylightpurple"
              type="password"
              {...register("confirmPassword", {
                required: "password is required",
              })}
            />
            <p className="mx-4 text-xs text-red-500">
              {errors.confirmPassword ? "*" + errors.confirmPassword.message : ""}
            </p>
          </div>

          <button
            type="submit"
            className="btn  w-full bg-custom-gradient text-white rounded-[80px]"
          >
            Continue
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <span  onClick = {gotologin} className="text-bluepurple">
            Login
          </span>
        </p>

        <p className="text-[#7C8493]">
          By clicking &rsquo;Continue&rsquo;, you acknowledge that you have read
          and accepted our{" "}
          <span className="text-bluepurple"> Terms of Service</span> and
          <span className="text-bluepurple">Privacy Policy</span> .
        </p>
      </div>
    </div>
  );
};

export default SignupForm;