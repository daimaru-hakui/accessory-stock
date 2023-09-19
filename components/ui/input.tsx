/* eslint-disable react/display-name */
import React, { ChangeEvent, FC, memo } from "react";
import styles from "./input.module.css";

type Props = {
  type?: "text" | "submit" | "password";
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  value?:string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<Props> = memo(({
  type = "text",
  placeholder,
  size = "md",
  className,
  value,
  onChange,
}) => {
  let inputSize = {};
  switch (size) {
    case "xs":
      inputSize = {
        paddingInlineStart: "0.5rem",
        height: "1.5rem",
        fontSize: "0.75rem",
      };
      break;
    case "sm":
      inputSize = {
        paddingInlineStart: "0.75rem",
        height: "2rem",
        fontSize: "0.9rem",
      };
      break;
    case "md":
      inputSize = {
        paddingInlineStart: "1rem",
        height: "2.5rem",
        fontSize: "1rem",
      };
      break;
    case "lg":
      inputSize = {
        paddingInlineStart: "1rem",
        height: "3rem",
        fontSize: "1.1rem",
      };
      break;
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      style={{ ...inputSize, border: "1px solid #ddd", borderRadius: "5px" }}
      className={`${styles.input} ${className}`}
      value={value}
      onChange={onChange}
    />
  );
});

export default Input;
