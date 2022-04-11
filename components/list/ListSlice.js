import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const ListSlice = createSlice({
  name: "list",
  initialState: {
    list: [],
    textFilter: "",
    isSongFilterActivated: false,
    isArtistFilterActivated: false
  },
  reducers: {
    addResult: (state, action) => {
      const result = {
          id: uuid(),
          name: action.payload.result.name,
          artist: action.payload.result.artist,
          country: action.payload.result.country,
          genre: action.payload.result.genre,
          link: action.payload.result.link,
          picture: action.payload.result.picture,
          rating: 0
      }
        
      return { ...state, list: [...state.list, result] };
    },
    rateResult: (state, action) => {
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.payload.id ? {
              ...item,
              rating: action.payload.rating
            } :
              item
        )
      };
    },
    setTextFilter: (state, action) => {
      return {
        ...state,
        textFilter: action.payload.textFilter,
        isSongFilterActivated: false,
        isArtistFilterActivated: false
      };
    },
    activateSongFilter: (state, action) => {
      return {
        ...state,
        textFilter: "",
        isSongFilterActivated: true,
        isArtistFilterActivated: false
      };
    },
    activateArtistFilter: (state, action) => {
      return {
        ...state,
        textFilter: "",
        isSongFilterActivated: false,
        isArtistFilterActivated: true
      };
    }
  }
});

export const { addResult, rateResult, setTextFilter, activateSongFilter, activateArtistFilter } = ListSlice.actions;
export const listSelector = (state) => state.listRed;

export const filteredListSelector = (state) => {
  if (state.listRed.isSongFilterActivated)
    return state.listRed.list.filter((elm) => elm.artist !== "Artist");
  else if (state.listRed.isArtistFilterActivated)
    return state.listRed.list.filter((elm) => elm.artist === "Artist");
  else if (state.listRed.textFilter)
    return state.listRed.list.filter((elm) => elm.name.toLowerCase().includes(state.listRed.textFilter.toLowerCase()));
  else
    return state.listRed.list;
};

export default ListSlice.reducer;
