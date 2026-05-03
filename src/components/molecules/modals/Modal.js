const Modal = ({children, closeModal, customClass}) => {
  return (
    <div
      className={`fixed inset-0 ${customClass} z-65 items-center justify-center flex pointer-events-auto`}
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='flex sm:w-auto w-full justify-center'
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
