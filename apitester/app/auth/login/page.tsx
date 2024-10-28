"use client";
import React from "react";
import LoginForm from "../../Components/Login";

const page = () => {
  return (
    <div className="w-full h-screen flex flex-grow justify-center bg-white">
      <div className="w-1/3"></div>
      <LoginForm />
    </div>
  );
};

export default page;
