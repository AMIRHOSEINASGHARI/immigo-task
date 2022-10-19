import React, { useReducer } from "react";

export const CommentContextProvider = React.createContext();

const initialState = {
  comments: [],
};

const commentReducer = (state, action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      if (!state.comments.find((item) => item.id === action.payload.id)) {
        state.comments.push({
          ...action.payload,
          comment: [action.content],
        });
      }
      return {
        ...state,
      };
    case "INCREASE_COMMENT":
      const commentIndex = state.comments.findIndex(
        (item) => item.id === action.payload.id
      );
      state.comments[commentIndex].comment.push(action.content);
      return {
        ...state,
      };
  }
};

const CommentContext = ({ children }) => {
  const [commentState, cDispatch] = useReducer(commentReducer, initialState);
  return (
    <CommentContextProvider.Provider value={{ commentState, cDispatch }}>
      {children}
    </CommentContextProvider.Provider>
  );
};

export default CommentContext;
