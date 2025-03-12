import React from "react";
import "./modal.css";

export default function Modal({ isOpen, setModalOpen, children, selectProdutor }) {
  if (isOpen) {
    return (
      <div className="backgroundModal" >
        <div className="modalStryle">
            <div className="headerModal">
            <button className="closeBtn" onClick={setModalOpen}>X</button>
            </div>
            <div className="ModalContent">
            {children}

            </div>
            </div>
      </div>
    );
  }

  return null;
}
