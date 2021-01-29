import React from "react";
import { Link } from "react-router-dom";
import headerLogoImage from "../images/header__logo.svg";

function Header({ linkTo, authText, currentUserEmail, onLogOut }) {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={headerLogoImage} alt="Логотип" />
      </Link>
      <div className="header__wrapper">
        <p className="header__user-email">{currentUserEmail}</p>
        <Link className="header__auth" onClick={onLogOut} to={linkTo}>
          {authText}
        </Link>
      </div>
    </header>
  );
}

export default Header;
