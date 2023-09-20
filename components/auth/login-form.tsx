"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/Button";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
    const router = useRouter();
  const supabase = createClientComponentClient();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    handleSignIn(data);
  };

  const handleSignIn = async (data: Inputs) => {
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if(user) {
        router.push("/")
    }

    console.log(user);
    console.log(error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-3">
        <div>email</div>
        <input className="" type="text" {...register("email")} />
      </div>
      <div className="mt-3">
        <div>password</div>
        <input className="" type="password" {...register("password")} />
      </div>
      <Button type="submit" className="mt-6">
        送信
      </Button>
    </form>
  );
};

export default LoginForm;
