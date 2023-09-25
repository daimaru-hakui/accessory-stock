"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/input";

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
    if (error) {
      alert("ログインに失敗しました");
      return;
    }
    if (user) {
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="mt-3 w-full">
        <Input
          label="email"
          placeholder="emailを入力してください"
          type="text"
          className="w-full"
          register={{ ...register("email", { required: true }) }}
        />
        {errors.email && (
          <div className="text-red-500">emailを入力してください</div>
        )}
      </div>
      <div className="mt-3">
        <Input
          label="password"
          placeholder="passwordを入力してください"
          type="password"
          className="w-full"
          register={{ ...register("password", { required: true }) }}
        />
        {errors.password && (
          <div className="text-red-500">passwordを入力してください</div>
        )}
      </div>
      <Button type="submit" className="mt-6 w-full">
        送信
      </Button>
    </form>
  );
};

export default LoginForm;
