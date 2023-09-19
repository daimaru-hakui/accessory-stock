import React, { FC } from "react";

type Props = {
  type?: "text" | "submit" | "password";
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?:string
};

const Input: FC<Props> = ({ type = "text", placeholder, size = "md",className }) => {
  let inputSize = {};
  switch (size) {
    case "xs":
      inputSize = { padding: "2px 4px", fontSize:"0.75rem" };
      break;
    case "sm":
      inputSize = { padding: "4px 8px",fontSize:"0.9rem" };
      break;
    case "md":
      inputSize = { padding: "5px 10px",fontSize:"1rem" };
      break;
    case "lg":
      inputSize = { padding: "10px 12px" ,fontSize:"1.1rem"};
      break;
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      style={{ ...inputSize, border: "1px solid #ddd", borderRadius: "5px" }}
      className={className}
    />
  );
};

export default Input;
