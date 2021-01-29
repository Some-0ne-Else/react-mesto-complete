import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, setAbout, setName]);
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleAboutChange(e) {
    setAbout(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  }
  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      actionCaption="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmbit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input"
        name="name"
        id="full-name"
        placeholder="Имя полностью"
        minLength="2"
        maxLength="40"
        pattern="[a-zA-ZА-ЯЁа-яё\s\-]+[^\s\-]+"
        required
        noValidate
        value={name}
        onChange={handleNameChange}
      />
      <p className="popup__input-error" id="full-name-error"></p>
      <input
        type="text"
        className="popup__input"
        name="about"
        id="vocation"
        placeholder="Призвание"
        minLength="2"
        maxLength="200"
        required
        noValidate
        value={about}
        onChange={handleAboutChange}
      />
      <p className="popup__input-error" id="vocation-error"></p>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
