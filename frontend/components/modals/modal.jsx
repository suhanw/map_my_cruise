import React from 'react';

const Modal = ({ modal, component: Component, closeModal, dispatchAction }) => {
  let content;
  if (modal) {
    content = (
      <div className="modal-backdrop" onClick={closeModal}>
        <Component modal={modal} closeModal={closeModal} dispatchAction={dispatchAction}/>
      </div>
    );
  } else {
    content = null;
  }
  return content;
};

export default Modal;
