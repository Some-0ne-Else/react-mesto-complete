import React from "react";
import success from "../images/info-tooltip__success.svg";
import failure from "../images/info-tooltip__fail.svg";
function InfoTooltip({ isOpen, status, message, onClose }) {
  return (
    <section className={`info-tooltip ${isOpen && "info-tooltip_opened"}`}>
      <div className="info-tooltip__container">
        {status && <img className="info-tooltip__image" src={success} />}
        {!status && <img className="info-tooltip__image" src={failure} />}
        <h2 className="info-tooltip__message">{message}</h2>
        <button
          type="button"
          className="info-tooltip__close-button"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}
export default InfoTooltip;
