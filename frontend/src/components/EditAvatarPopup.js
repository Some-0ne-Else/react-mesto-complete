import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef("");

  function handleChange(e) {
    avatarRef.current = e.target.value;
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current,
    });
  }
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      actionCaption="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmbit={handleSubmit}
    >
      <input
        type="url"
        className="popup__input"
        name="url"
        id="link"
        placeholder="Ссылка на картинку"
        required
        noValidate
        onChange={handleChange}
      />
      <p className="popup__input-error" id="link-error"></p>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
