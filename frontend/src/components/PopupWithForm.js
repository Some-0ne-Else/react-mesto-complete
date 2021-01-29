import React from "react";

function PopupWithForm({
  name,
  title,
  onClose,
  onSubmbit,
  isOpen,
  actionCaption,
  children,
}) {
  return (
    <section className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <form
        className={`popup__container popup__container_${name}`}
        onSubmit={onSubmbit}
      >
        <h2 className="popup__heading">{title}</h2>
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        {children}
        <button
          type="submit"
          className={`popup__action-button popup__action-button_${name}`}
        >
          {actionCaption}
        </button>
      </form>
    </section>
  );
}
export default PopupWithForm;
