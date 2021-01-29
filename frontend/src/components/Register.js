import React from "react";
import { Link } from "react-router-dom";
import api from "../utils/Api.js";

function Login({ onRegistrationSuccess, onRegistrationFail }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleSubmitForm(e) {
    e.preventDefault();
    api.signUp(email, password).then((res) => {
      res.data ? onRegistrationSuccess(res.data.email) : onRegistrationFail();
    });
  }
  return (
    <section className="login">
      <form onSubmit={handleSubmitForm} className="login__form">
        <h2 className="login__title">Регистрация</h2>
        <input
          type="email"
          className="login__input"
          name="email"
          onChange={handleEmailChange}
          id="email"
          placeholder="Email"
          minLength="2"
          maxLength="30"
          pattern="[a-zA-ZА-ЯЁа-яё\s\-]+[^\s\-]+"
          required
          noValidate
        />
        <input
          type="password"
          className="login__input"
          name="password"
          onChange={handlePasswordChange}
          id="password"
          placeholder="Пароль"
          required
          noValidate
        />
        <button type="submit" className="login__submit-button">
          Зарегистрироваться
        </button>
        <Link className="login__auth-link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </section>
  );
}
export default Login;
