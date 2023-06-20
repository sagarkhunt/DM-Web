import React, { useState } from "react";

const Modal = ({ open, handleModal, children }) => {
  return (
    <div
      className={`${open ? "show-modal" : ""} message`}
      onClose={handleModal}
    >
      {children}
    </div>
  );
};

export default Modal;
