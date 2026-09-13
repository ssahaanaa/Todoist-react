export const ModalDialog = ({triggerClose, children, isModalOpen, classNamesForContent}) => {
    return (
      <dialog className="modal" open={isModalOpen}>
        <div className={`content ${classNamesForContent}`}>
          {children}
        </div>
      </dialog>
    )
}