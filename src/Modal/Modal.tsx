import React, {
  FunctionComponent,
  MutableRefObject,
  useRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";

const Modal: FunctionComponent = ({ children }) => {
  // using Ref to get the exact same thing in every single render
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot || !elRef.current) {
      return;
    }
    modalRoot.appendChild(elRef.current);

    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  //pass the children (whatever put inside <Modal></Modal>) to the portal div.
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
