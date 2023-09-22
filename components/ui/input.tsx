/* eslint-disable react/display-name */
import React, { ChangeEvent, FC, memo, useId } from "react";
import classes from "./input.module.css";

type Props = {
  type?: "text" | "submit" | "password" | "number";
  label?: string;
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  register?: any;
};

const Input: FC<Props> = memo(
  ({
    type = "text",
    label,
    placeholder,
    size = "md",
    className,
    value,
    onChange,
    register,
  }) => {
    const uid = useId();
    let inputSize = {};
    switch (size) {
      case "xs":
        inputSize = {
          paddingInlineStart: "0.5rem",
          paddingInlineEnd: "0.75rem",
          height: "1.5rem",
          fontSize: "0.75rem",
        };
        break;
      case "sm":
        inputSize = {
          paddingInlineStart: "0.75rem",
          paddingInlineEnd: "0.75rem",
          height: "2rem",
          fontSize: "0.9rem",
        };
        break;
      case "md":
        inputSize = {
          paddingInlineStart: "0.9rem",
          paddingInlineEnd: "0.75rem",
          height: "2.5rem",
          fontSize: "1rem",
        };
        break;
      case "lg":
        inputSize = {
          paddingInlineStart: "1rem",
          paddingInlineEnd: "0.75rem",
          height: "3rem",
          fontSize: "1.1rem",
        };
        break;
    }

    const Style = {
      ...inputSize,
      border: "1px solid #ddd",
      borderRadius: "5px",
    };

    return (
      <>
        {label && (
          <label htmlFor={uid} className={`${classes.label} text-xs font-bold mb-1`}>
            {label}
          </label>
        )}
        <input
          id={uid}
          type={type}
          placeholder={placeholder}
          style={Style}
          className={`${classes.input} ${className}`}
          value={value}
          onChange={onChange}
          step="any"
          {...register}
        />
      </>
    );
  }
);

export default Input;
