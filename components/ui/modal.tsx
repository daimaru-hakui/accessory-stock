"use client";
import React, { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import { UseFormReset } from "react-hook-form";

interface Props {
  title?: string;
  children: ReactNode;
  isOpen: boolean;
  closeButton?: boolean;
  setIsOpen: (bool: boolean) => void;
  top?: number;
  reset?: UseFormReset<any>;
}

const Modal: FC<Props> = ({
  title = "",
  children,
  isOpen, setIsOpen,
  top = 48,
  closeButton = true,
  reset
}): JSX.Element => {
  const onClose = () => {
    setIsOpen(false);
    reset && reset();
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

                  {closeButton && (
                    <div className="mt-3 text-right">
                      <Button colorScheme="gray" variant="outline" onClick={() => {
                        onClose;
                        reset && reset();
                      }
                      }>閉じる</Button>
                    </div>
                  )}
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
