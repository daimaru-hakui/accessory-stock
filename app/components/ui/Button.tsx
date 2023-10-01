import React, { FC, ReactNode } from "react";

type Props = {
  type?: "button" | "submit";
  children: ReactNode;
  className?: string;
  colorScheme?: "gray" | "blue" | "green" | "orange" | "red";
  variant?: "solid" | "outline";
  onClick?: () => void;
};

const Button: FC<Props> = ({
  children,
  type = "button",
  className,
  colorScheme = "blue",
  variant = "solid",
  onClick,
}) => {


  let backgroundColor;
  let outline;
  let fontColor;

  switch (colorScheme) {
    case "gray":
      backgroundColor = "gray";
      outline = "1px solid gray";
      break;
    case "blue":
      backgroundColor = "#2563eb";
      outline = "1px solid #2563eb";
      break;
    case "green":
      backgroundColor = "#3ba08d";
      outline = "1px solid #3ba08d";
      break;
    case "orange":
      backgroundColor = "#dd7805";
      outline = "1px solid #dd7805";
      break;
    case "red":
      backgroundColor = "#d52536";
      outline = "1px solid #d52536";
      break;
  }

  switch (variant) {
    case "outline":
      fontColor = backgroundColor;
      backgroundColor = "transparent";
      break;
    case "solid":
      fontColor = "white";
      break;
  }

  const Style = {
    backgroundColor,
    outline,
    color: fontColor,
    outlineOffset: "-1px"
  };

  return (
    <button
      type={type}
      style={Style}
      className={`bg-blue-500 hover:opacity-90 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
