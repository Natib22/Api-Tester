"use client";
import React from "react";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
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
//   const router = useRouter();

//   const gotologin = () => {
//     router.push("/auth/login");
//   };

  const signup = async (data: FormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fullname: data.fullname,
            email: data.email,
            password: data.password,
        }),
        credentials: "include", // Include credentials (cookies)
    });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
          
          if (errorData.err.password){
            setBackerror({password: errorData.err.password, email: ""})
          }
          if (errorData.err.email){
            setBackerror({password: "", email: errorData.err.email})
          }
        
        throw new Error(errorData.message || "Something went wrong");
      }

      const result = await response.json();
        console.log("Signup result:", result);
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
          <button
            // onClick={() =>
            //   signIn("google", { callbackUrl: "http://localhost:3000/" })
            // }
            className="btn w-full px-4 py-3 rounded-md border border-semigray bg-white text-bluepurple"
          >
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.6712 8.36788H18V8.33329H10.5V11.6666H15.2096C14.5225 13.607 12.6762 15 10.5 15C7.73874 15 5.49999 12.7612 5.49999 9.99996C5.49999 7.23871 7.73874 4.99996 10.5 4.99996C11.7746 4.99996 12.9342 5.48079 13.8171 6.26621L16.1742 3.90913C14.6858 2.52204 12.695 1.66663 10.5 1.66663C5.89791 1.66663 2.16666 5.39788 2.16666 9.99996C2.16666 14.602 5.89791 18.3333 10.5 18.3333C15.1021 18.3333 18.8333 14.602 18.8333 9.99996C18.8333 9.44121 18.7758 8.89579 18.6712 8.36788Z"
                fill="#FFC107"
              />
              <path
                d="M3.12749 6.12121L5.8654 8.12913C6.60624 6.29496 8.4004 4.99996 10.5 4.99996C11.7746 4.99996 12.9342 5.48079 13.8171 6.26621L16.1742 3.90913C14.6858 2.52204 12.695 1.66663 10.5 1.66663C7.29915 1.66663 4.52332 3.47371 3.12749 6.12121Z"
                fill="#FF3D00"
              />
              <path
                d="M10.5 18.3333C12.6525 18.3333 14.6083 17.5095 16.0871 16.17L13.5079 13.9875C12.6432 14.6451 11.5865 15.0008 10.5 15C8.33251 15 6.49209 13.6179 5.79876 11.6891L3.08126 13.7829C4.46043 16.4816 7.26126 18.3333 10.5 18.3333Z"
                fill="#4CAF50"
              />
              <path
                d="M18.6713 8.36796H18V8.33337H10.5V11.6667H15.2096C14.8809 12.5902 14.2889 13.3972 13.5067 13.988L13.5079 13.9871L16.0871 16.1696C15.9046 16.3355 18.8333 14.1667 18.8333 10C18.8333 9.44129 18.7758 8.89587 18.6713 8.36796Z"
                fill="#1976D2"
              />
            </svg>
            Sign Up with Google
          </button>
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
          <p>Or Sign Up with Email</p>
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
          <span  className="text-bluepurple">
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