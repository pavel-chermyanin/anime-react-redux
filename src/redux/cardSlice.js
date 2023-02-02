import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
  const { data } = await axios.get(
    "https://kitsu.io/api/edge/anime?filter[text]=tokio"
  );
  return data.data;
});

export const cardSlice = createSlice({
  name: "card",
  initialState: {
    cards: [],
    likedCards: [],
    selectedCard: null,
    status: "",
  },
  reducers: {
    removeCard: (state, action) => {
      const indexItem = state.cards.findIndex(
        (item) => item.id === action.payload
      );
      state.cards.splice(indexItem, 1);
      state.likedCards = state.likedCards.filter((item) => {
        return item.id !== action.payload;
      });
    },
    addFavorite: (state, action) => {
      const index = state.cards.findIndex((item) => item.id === action.payload);

      if (!state.cards[index].liked) {
        state.likedCards.push(state.cards[index]);
        state.cards[index].liked = true;
      } else {
        state.likedCards = state.likedCards.filter((item) => {
          return item.id !== action.payload;
        });
        state.cards[index].liked = false;
      }
    },
    selectCard: (state, action) => {
      state.selectedCard = state.cards.find(
        (item) => item.id === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cards = [...action.payload];
        state.status = "idle";
      });
  },
});

export const { removeCard, addFavorite, selectCard } = cardSlice.actions;

export default cardSlice.reducer;
