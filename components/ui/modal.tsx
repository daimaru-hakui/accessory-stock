"use client";
import React, { FC, ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

interface Props {
  title?: string;
  children: ReactNode;
}

const Modal: FC<Props> = ({ title = "", children }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>発注</Button>
      {isOpen
        ? createPortal(
            <div
              className="fixed w-full h-screen top-0 left-0"
              style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            >
              <div
                className="w-full h-screen flex justify-center overflow-auto"
                onClick={onClose}
              >
                <div
                  className="p-6 w-full max-w-2xl mt-24 h-72 rounded-md bg-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <div className="font-bold">{title}</div>
                      <div className="mt-6">{children}</div>
                    </div>
                    <div className="text-right">
                      <Button onClick={onClose}>閉じる</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
};

export default Modal;
