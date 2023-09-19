"use client";

import Button from "@/components/ui/Button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  email: string
  password: string
}

const Login = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    console.log(data)
    // handleSignIn(data)
  }

  const handleSignIn = async (data:Inputs) => {
    await supabase.auth.signInWithPassword({
      email:data.email,
      password:data.password,
    });
    router.refresh();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };


  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-lg h-full max-h-96 flex items-center justify-center bg-white shadow-md rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-3">
            <div>email</div>
            <input className="" type="text" {...register("email")}/>
          </div>
          <div className="mt-3">
            <div>password</div>
            <input className="" type="text" {...register("password")}/>
          </div>
          <Button type="submit">送信</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
