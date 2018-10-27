export const watchListReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_WATCH_LIST':
      return [...state, action.event];
    case 'REMOVE_FROM_WATCH_LIST':
      return state.filter(event => event.id !== action.id);
    default:
      return state;
  }
};
