"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
    const[backerror , setBackerror] = React.useState({password: "" , email:"" })
  const router = useRouter();
  const gotosignup = () => {
    router.push("/auth/signup");
  };
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { errors } = formState;

  const login = async (data: FormData) => {

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.ok) {
      router.push("/");
    } else {
       if (result?.error === "incorrect email"){
        setBackerror({password: "", email: "incorrect email"})
       }
         if (result?.error === "incorrect password"){
          setBackerror({password: "incorrect password", email: ""})
         }
    
    }
  };

  return (
    <div className="pc:w-1/3 max-pc:w-1/2 max-tablet:w-5/6 relative mt-[141px] h-auto flex gap-6 flex-col">
      <h1 className="font-black text-[32px] text-center">Welcome Back,</h1>
      <svg
        width="408"
        height="1"
        viewBox="0 0 408 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="-4.37114e-08"
          y1="0.5"
          x2="109"
          y2="0.49999"
          stroke="#D6DDEB"
        />
        <line x1="300" y1="0.5" x2="408" y2="0.499991" stroke="#D6DDEB" />
      </svg>

      <form onSubmit={handleSubmit(login)} className="flex flex-col gap-4">
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
            {backerror.password ? backerror.password : ""}
          </p>
        </div>
        <button
          type="submit"
          className="btn  w-full bg-custom-gradient text-white rounded-[80px]"
        >
          Login
        </button>
      </form>
      <p>
        Dont&apos;t have an account?{" "}
        <span onClick={gotosignup} className="text-bluepurple">
          Sign Up
        </span>{" "}
      </p>
    </div>
  );
};

export default LoginForm;