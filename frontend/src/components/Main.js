import React from "react";
import Card from "./Card.js";
import Spinner from "./Spinner.js";
import editButtonImage from "../images/profile__edit-button_image.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  isLoading,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Фото профиля"
          />
          <img
            className="profile__avatar-edit"
            src={editButtonImage}
            alt="Редактировать"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__profile-info">
          <h2 className="profile__full-name">{currentUser.name}</h2>
          <button
            className="profile__edit-button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__vocation">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {isLoading ? (
          <Spinner />
        ) : (
          cards.map((card) => (
            <Card
              title={card.name}
              src={card.link}
              alt={card.name}
              key={card._id}
              currentUser={currentUser._id}
              ownerId={card.ownerId}
              likes={card.likes}
              likeCounter={card.likes.length}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              card={card}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default Main;
