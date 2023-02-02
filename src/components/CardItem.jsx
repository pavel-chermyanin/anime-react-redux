import { AiFillLike } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import React from "react";
import { Link } from "react-router-dom";

const CardItem = ({ item, onRemoveCard, addFavorite, favorite }) => {
  return (
    <div className="cardItem">
      <Link to={`/products/${item.id}`}>
        <h3>{item.attributes.titles.en_jp}</h3>
      </Link>
      <Link to={`/products/${item.id}`} className="imgWrapper">
        <img
          src={item.attributes.posterImage.tiny}
          alt=""
        />
      </Link>
      <p>{item.attributes.description}</p>
      {!favorite && (
        <div className="buttons">
          <button
            onClick={addFavorite}
            className="like"
          >
            <AiFillLike className={`${item.liked && "liked"}`} />
          </button>
          <button
            onClick={onRemoveCard}
            className="delete"
          >
            <AiFillDelete />
          </button>
        </div>
      )}
    </div>
  );
};

export default CardItem;
