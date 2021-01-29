import {
  token,
  baseUrl,
  cohort,
  baseAuthUrl,
  signUpPostfix,
  signInPostfix,
  userInfoPostfix,
} from "./constants.js";

class Api {
  constructor(
    token,
    baseUrl,
    cohort,
    baseAuthUrl,
    signUpPostfix,
    signInPostfix,
    userInfoPostfix
  ) {
    this._token = token;
    this._baseUrl = `${baseUrl}${cohort}`;
    this._baseAuthUrl = baseAuthUrl;
    this._signUpPostfix = signUpPostfix;
    this._signInPostfix = signInPostfix;
    this._userInfoPostfix = userInfoPostfix;
  }

  signIn(email, password) {
    return fetch(`${this._baseAuthUrl}${this._signInPostfix}`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: `${password}`,
        email: `${email}`,
      }),
    })
      .then((result) => result.json())
      .catch((err) => {
        console.log(err);
      });
  }

  signUp(email, password) {
    return fetch(`${this._baseAuthUrl}${this._signUpPostfix}`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: `${password}`,
        email: `${email}`,
      }),
    })
      .then((result) => result.json())
      .catch((err) => {
        console.log(err);
      });
  }

  checkToken(jwt) {
    return fetch(`${this._baseAuthUrl}${this._userInfoPostfix}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((result) => result.json())
      .catch((err) => {
        console.log(err);
      });
  }
  fetchData(urlPostfix) {
    return fetch(`${this._baseUrl}${urlPostfix}`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          return Promise.reject(`Ошибка: ${result.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  editProfile(urlPostfix, name, about) {
    return fetch(`${this._baseUrl}${urlPostfix}`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
      }),
    }).catch((err) => {
      console.log(err);
    });
  }

  postCard(urlPostfix, name, link) {
    return fetch(`${this._baseUrl}${urlPostfix}`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`,
      }),
    })
      .then((result) => result.json())
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(urlPostfix) {
    return fetch(`${this._baseUrl}${urlPostfix}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      console.log(err);
    });
  }
  likeCard(urlPostfix, cardId, isLiked) {
    let methodValue;
    isLiked ? (methodValue = "DELETE") : (methodValue = "PUT");
    return fetch(`${this._baseUrl}${urlPostfix}/likes/${cardId}`, {
      method: methodValue,
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .catch((err) => console.log(err));
  }

  updateAvatar(urlPostfix, link) {
    return fetch(`${this._baseUrl}${urlPostfix}/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: `${link}`,
      }),
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          return Promise.reject(`Ошибка: ${result.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const api = new Api(
  token,
  baseUrl,
  cohort,
  baseAuthUrl,
  signUpPostfix,
  signInPostfix,
  userInfoPostfix
);

export default api;
