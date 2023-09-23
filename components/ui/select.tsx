import React, { ReactNode, FC } from "react";

type Props = {
  children: ReactNode;
  label?: string;
  register: any;
  className?: string;
  required?: boolean;
};

const Select: FC<Props> = ({ children, label, register, className, required }) => {
  return (
    <>
      {label && (
        <label style={{ display: "block" }} className="text-xs font-bold">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select style={Style} {...register} className={className}>
        {children}
      </select>
    </>
  );
};

export default Select;

const Style = {
  marginTop: "0.2rem",
  border: "1px solid #ddd",
  height: "2.5rem",
  fontSize: "0.9rem",
  paddingInlineStart: "0.5rem",
  paddingInlineEnd: "0.5rem",
  borderRadius: "5px",
};
