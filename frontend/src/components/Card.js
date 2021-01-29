import React from "react";

function Card({
  title,
  src,
  alt,
  likeCounter,
  onCardClick,
  ownerId,
  currentUser,
  likes,
  onCardLike,
  onCardDelete,
  card,
}) {
  const isOwn = card.owner === currentUser;
  const isLiked = likes.some((i) => i._id === currentUser);
  const elementLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : "element__like_unactive"
  }`;
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <div className="element">
      <img
        className="element__image"
        src={src}
        alt={alt}
        onClick={onCardClick}
      />
      {isOwn && (
        <button
          type="button"
          className="element__delete-button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <p className="element__title">{title}</p>
      <div className="element__wrapper">
        <button
          className={elementLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
        <p className="element__like-counter">{likeCounter}</p>
      </div>
    </div>
  );
}

export default Card;
