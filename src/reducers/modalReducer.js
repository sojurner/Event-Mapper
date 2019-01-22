export const modalReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_MODAL_VIEW':
      return action.command;
    default:
      return state;
  }
};
