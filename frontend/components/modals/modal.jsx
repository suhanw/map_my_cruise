import React from 'react';

const Modal = ({ modal, errors, component: Component, closeModal, dispatchAction, history }) => {
  let content;
  if (modal) {
    content = (
      <div onClick={closeModal}>
        <Component modal={modal}
          errors={errors}
          closeModal={closeModal}
          dispatchAction={dispatchAction}
          history={history}/>
      </div>
    );
  } else {
    content = null;
  }
  return content;
};

export default Modal;
