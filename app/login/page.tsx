import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import LoginForm from "@/components/auth/login-form";

const Login = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-lg h-full max-h-96 flex items-center justify-center bg-white shadow-md rounded-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
