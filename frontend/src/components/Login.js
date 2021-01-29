import React from "react";
import { Link } from "react-router-dom";
import api from "../utils/Api.js";

function Login({ onLogin, onAuthFail }) {
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
    api.signIn(email, password).then((res) => {
      console.log(res);
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        api.checkToken(res.token).then((res) => {
          console.log(res);
          onLogin(res.data.email);
        });
      } else onAuthFail();
    });
  }
  return (
    <section className="login">
      <form onSubmit={handleSubmitForm} className="login__form">
        <h2 className="login__title">Вход</h2>
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
        />
        <input
          type="password"
          className="login__input"
          name="password"
          onChange={handlePasswordChange}
          id="password"
          placeholder="Пароль"
          required
        />
        <button type="submit" className="login__submit-button">
          Войти
        </button>
        <Link className="login__auth-link" to="/sign-up">
          Ещё не зарегистрированы? Регистрация
        </Link>
      </form>
    </section>
  );
}
export default Login;
