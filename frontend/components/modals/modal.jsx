import React from 'react';

const Modal = ({ modal, errors, component: Component, closeModal, dispatchAction }) => {
  let content;
  if (modal) {
    content = (
      <div className="modal-backdrop" onClick={closeModal}>
        <Component modal={modal}
          errors={errors}
          closeModal={closeModal}
          dispatchAction={dispatchAction}/>
      </div>
    );
  } else {
    content = null;
  }
  return content;
};

export default Modal;
