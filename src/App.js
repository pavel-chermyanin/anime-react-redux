import { useEffect, useState } from "react";
import CardItem from "./components/CardItem";
import { addFavorite, fetchCards, removeCard } from "./redux/cardSlice";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProductPage from "./components/ProductPage";

function App() {
  const dispatch = useDispatch();
  const { cards } = useSelector((state) => state.card);
  const { likedCards } = useSelector((state) => state.card);

  const onRemoveCard = (id) => {
    dispatch(removeCard(id));
  };

  const onLikeCard = (id) => {
    dispatch(addFavorite(id));
  };

  useEffect(() => {
    dispatch(fetchCards());
  }, []);
  return (
    <div className="app">
      <h1>Карточки товаров</h1>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/favorite">Избранное</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <div className="cardList">
              {cards.map((item) => (
                <CardItem
                  onRemoveCard={() => onRemoveCard(item.id)}
                  addFavorite={() => onLikeCard(item.id)}
                  item={item}
                  key={item.id}
                />
              ))}
            </div>
          }
        />
        <Route
          path="/favorite"
          element={
            <div className="favoriteList">
              {likedCards.map((item) => (
                <CardItem
                  favorite
                  item={item}
                  key={item.id}
                />
              ))}
            </div>
          }
        />
        <Route
          path="/products/:id"
          element={<ProductPage/>}
        />
      </Routes>
    </div>
  );
}

export default App;
