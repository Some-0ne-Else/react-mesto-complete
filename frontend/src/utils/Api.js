import {
  baseUrl,
  baseAuthUrl,
  signUpPostfix,
  signInPostfix,
  userInfoPostfix,
} from "./constants.js";

class Api {
  constructor(
    baseUrl,
    baseAuthUrl,
    signUpPostfix,
    signInPostfix,
    userInfoPostfix
  ) {
    this._baseUrl = baseUrl;
    this._baseAuthUrl = baseAuthUrl;
    this._signUpPostfix = signUpPostfix;
    this._signInPostfix = signInPostfix;
    this._userInfoPostfix = userInfoPostfix;
  }

  signIn(email, password) {
    return fetch(`${this._baseAuthUrl}/signin`, {
      method: "POST",
      headers: {
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

  getUserInfo(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
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

  getCards(jwt) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
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

  editProfile(jwt, name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwt}`,
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

  postCard(jwt, name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
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

  deleteCard(jwt, cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      console.log(err);
    });
  }

  likeCard(jwt, cardId, isLiked) {
    let methodValue;
    isLiked ? (methodValue = "DELETE") : (methodValue = "PUT");
    return fetch(`${this._baseUrl}/cards/${cardId}/likes/`, {
      method: methodValue,
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .catch((err) => console.log(err));
  }

  updateAvatar(jwt, link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwt}`,
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

// const handler = (res) => {if (result.ok) {
//    return result.json();}
//     else { return Promise.reject(`Ошибка: ${result.status}`);}}

const api = new Api(
  baseUrl,
  baseAuthUrl,
  signUpPostfix,
  signInPostfix,
  userInfoPostfix
);

export default api;
