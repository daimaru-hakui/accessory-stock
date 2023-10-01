import React from "react";
import LoginForm from "@/app/login/components/login-form";

const Login = async () => {
  return (
      <div className="p-6 flex flex-col w-full max-w-xs flex items-center justify-center bg-white shadow-md rounded-md">
        <div className="mt-3 text-2xl">Login</div>
        <LoginForm />
      </div>
  );
};

export default Login;
