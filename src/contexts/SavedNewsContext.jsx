import React, { useReducer } from "react";

export const SavedNewsProvider = React.createContext();
const initialState = {
  savedNews: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SAVE_NEWS":
      if (!state.savedNews.find((item) => item.id === action.payload.id)) {
        state.savedNews.push({
          ...action.payload,
        });
      }
      return {
        ...state,
      };
    case "DELETE_SAVED_NEWS":
      const index = state.savedNews.findIndex(
        (item) => item.id === action.payload.id
      );
      state.savedNews.splice(index, 1);
      return {
        ...state,
      };
  }
};

const SavedNewsContext = ({ children }) => {
  const [savedState, dispatch] = useReducer(reducer, initialState);
  return (
    <SavedNewsProvider.Provider value={{ savedState, dispatch }}>
      {children}
    </SavedNewsProvider.Provider>
  );
};

export default SavedNewsContext;
