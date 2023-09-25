import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import LoginForm from "@/app/login/components/login-form";

const Login = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="p-6 flex flex-col w-full max-w-xs flex items-center justify-center bg-white shadow-md rounded-md">
        <div className="mt-3 text-2xl">Login</div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
