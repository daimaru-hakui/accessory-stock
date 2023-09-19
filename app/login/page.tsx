import Input from "@/components/ui/input";
import React from "react";

const Login = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-lg h-full max-h-96 flex items-center justify-center bg-white shadow-md rounded-md">
        <div>
          <div>Email</div>
          <Input type="text" size="md" />
        </div>
      </div>
    </div>
  );
};

export default Login;
