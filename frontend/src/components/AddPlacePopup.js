import React from "react";
import PopupWithForm from "./PopupWithForm.js";
function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState("");

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    console.log("submited");
    onAddPlace({ name, url });
  }
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleUrlChange(e) {
    setUrl(e.target.value);
  }
  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      actionCaption="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmbit={handleAddPlaceSubmit}
    >
      <input
        type="text"
        className="popup__input"
        name="name"
        id="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        pattern="[a-zA-ZА-ЯЁа-яё\s\-]+[^\s\-]+"
        required
        noValidate
        value={name}
        onChange={handleNameChange}
      />
      <p className="popup__input-error" id="name-error"></p>
      <input
        type="url"
        className="popup__input"
        name="url"
        id="url"
        placeholder="Ссылка на картинку"
        required
        noValidate
        value={url}
        onChange={handleUrlChange}
      />
      <p className="popup__input-error" id="url-error"></p>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
