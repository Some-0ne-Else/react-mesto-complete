import React from "react";

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <section className={`popup popup-enlarge ${isOpen && "popup_opened"}`}>
      <div className="popup__container-enl">
        <img className="popup__image" src={card.src} alt={card.alt} />
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <p className="popup__caption">{card.alt}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
