/* config */
const cardTemplate = ".element__template";
const baseUrl = "http://localhost:3000";

/* auth additional config */
const baseAuthUrl = "http://localhost:3000";
const signUpPostfix = "/signup";
const signInPostfix = "/signin";
/*validation const */
const configValidation = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__action-button",
  inactiveButtonClass: "popup__action-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
// const editFormValidaion = new FormValidator(configValidation, ".popup__container_edit");
// const addFormValidation = new FormValidator(configValidation, ".popup__container_add");
// const avatarFormValidation = new FormValidator(configValidation, ".popup__container_avatar");

export {
  cardTemplate,
  configValidation,
  baseUrl,
  baseAuthUrl,
  signUpPostfix,
  signInPostfix,
};
