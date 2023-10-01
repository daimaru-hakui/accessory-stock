import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const LoginLayout = async({children}:{children:ReactNode}) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
     {children}
    </div>
  );
};

export default LoginLayout