export const isSaved = (state, id) => {
  const result = state.savedNews.find((item) => item.id === id);
  return result;
};

export const commentIndex = (state, id) => {
  const index = state.comments.findIndex((item) => item.id === id);
  if (index >= 0) {
    return index;
  } else {
    return null;
  }
};

export const ifHasComment = (state, id) => {
  const result = !!state.comments.find((item) => item.id === id);
  return result;
};
