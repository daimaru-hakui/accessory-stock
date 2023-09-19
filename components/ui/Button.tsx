import React, { FC, ReactNode } from "react";

type Props = {
  type?: "button" | "submit";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button: FC<Props> = ({
  children,
  type = "button",
  className,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
