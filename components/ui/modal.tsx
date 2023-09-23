"use client";
import React, { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

interface Props {
  title?: string;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  top?: number;
}

const Modal: FC<Props> = ({ title = "", children, isOpen, setIsOpen, top = 48 }): JSX.Element => {
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      {isOpen
        ? createPortal(
          <div
            className="fixed w-full h-screen top-0 left-0"
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          >
            <div
              className="w-full h-full flex justify-center items-start overflow-auto"
              onClick={onClose}
            >
              <div
                style={{ marginTop: `${top}px` }}
                className="p-6 rounded-md bg-white"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="font-bold">{title}</div>
                    <div className="mt-6">{children}</div>
                  </div>
                  <div className="mt-6 text-right">
                    <Button variant="outline" onClick={onClose}>閉じる</Button>
                  </div>
                </div>
              </div>
            </div>
          </div >,
          document.body
        )
        : null}
    </>
  );
};

export default Modal;
