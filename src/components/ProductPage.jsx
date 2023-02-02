import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCard } from "../redux/cardSlice";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCard } = useSelector((state) => state.card);

  useEffect(() => {
    dispatch(selectCard(id));
  }, []);

  if (!selectedCard) {
    return <p>loading</p>;
  }

  return (
    <div className="product">
      <h3>{selectedCard.attributes.titles.en_jp}</h3>

      <img
        src={selectedCard.attributes.posterImage.tiny}
        alt=""
      />
      <p>{selectedCard.attributes.description}</p>
    </div>
  );
};

export default ProductPage;
