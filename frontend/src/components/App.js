import React from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import api from "../utils/Api.js";
import { CardsContext } from "../contexts/CardsContext.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState("");
  const [isLoading, setIsLoading] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setloggedIn] = React.useState(false);
  const [operationSuccess, setOperationStatus] = React.useState(false);
  const [operationMessage, setOperationMessage] = React.useState("");
  const [currentUserEmail, setcurrentUserEmail] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      api.checkToken(localStorage.getItem("jwt")).then((res) => {
        onLogin(res.data.email);
      });
    }
    if (loggedIn) {
      api
        .getUserInfo(localStorage.getItem("jwt"))
        .then((userInfo) => {
          setCurrentUser(userInfo.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(true);

      api
        .getCards(localStorage.getItem("jwt"))
        .then((dataCards) => {
          setCards(
            dataCards.data.map((item) => ({
              _id: item._id,
              name: item.name,
              link: item.link,
              likes: item.likes,
              owner: item.owner._id,
            }))
          );
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn, setCards]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .likeCard(localStorage.getItem("jwt"), card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) =>
          c._id === card._id ? newCard.data : c
        );
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    /* cards state updated only in case of response success */
    api
      .deleteCard(localStorage.getItem("jwt"), card._id)
      .then(() => setCards(cards.filter((c) => c._id !== card._id)))
      .catch((err) => console.log(err));
  }

  function handleCardClick(e) {
    setSelectedCard(e.target);
    setImagePopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard("");
    setInfoTooltipOpen(false);
  }
  function onRegistrationSuccess(email) {
    setOperationStatus(true);
    setOperationMessage("Вы успешно зарегистрировались!");
    setInfoTooltipOpen(true);
    onLogin(email);
  }
  function onOperationFail() {
    setOperationStatus(false);
    setOperationMessage("Что-то пошло не так! Попробуйте ещё раз.");
    setInfoTooltipOpen(true);
  }

  function onLogin(email) {
    setloggedIn(true);
    setcurrentUserEmail(email);
    history.push("/");
  }

  function onLogOut() {
    if (loggedIn) {
      setloggedIn(false);
      setcurrentUserEmail("");
      localStorage.removeItem("jwt");
      history.push("/sign-in");
    }
  }
  function handleUpdateUser({ name, about }) {
    api
      .editProfile(localStorage.getItem("jwt"), name, about)
      .then((res) => res.json())
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .updateAvatar(localStorage.getItem("jwt"), avatar)
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ name, url }) {
    api
      .postCard(localStorage.getItem("jwt"), name, url)
      .then((newCard) => {
        setCards([...cards, newCard.data]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="App">
          <div className="page">
            <Route exact path="/">
              <Header
                linkTo="/sign-in"
                onLogOut={onLogOut}
                currentUserEmail={currentUserEmail}
                authText="Выйти"
              />
            </Route>
            <Switch>
              <Route exact path="/sign-up">
                <Header
                  linkTo="/sign-in"
                  onLogOut={onLogOut}
                  currentUserEmail={currentUserEmail}
                  authText="Вход"
                />
                <Register
                  onRegistrationSuccess={onRegistrationSuccess}
                  onRegistrationFail={onOperationFail}
                />
              </Route>
              <Route exact path="/sign-in">
                <Header
                  linkTo="/sign-up"
                  onLogOut={onLogOut}
                  currentUserEmail={currentUserEmail}
                  authText="Регистрация"
                />
                <Login onLogin={onLogin} onAuthFail={onOperationFail} />
              </Route>
              <ProtectedRoute
                exact
                path="/"
                loggedIn={loggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                isLoading={isLoading}
                component={Main}
              />
            </Switch>
            <Footer />

            <PopupWithForm
              name="delete"
              title="Вы уверены?"
              actionCaption="Да"
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <ImagePopup
              isOpen={isImagePopupOpen}
              card={selectedCard}
              onClose={closeAllPopups}
            />
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              status={operationSuccess}
              message={operationMessage}
            />
          </div>
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
