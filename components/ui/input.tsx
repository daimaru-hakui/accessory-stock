/* eslint-disable react/display-name */
import React, { ChangeEvent, FC, memo, useId } from "react";

type Props = {
  type?: "text" | "submit" | "password" | "number" | "date";
  label?: string;
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  value?: string | number;
  defaultValue?: string | number;
  required?: boolean;
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
    defaultValue,
    required,
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
          <label htmlFor={uid} className={`text-xs font-bold mb-1 block`}>
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          id={uid}
          type={type}
          placeholder={placeholder}
          style={Style}
          className={`${className}`}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          step="any"
          {...register}
        />
      </>
    );
  }
);

export default Input;
