export const watchListReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_WATCH_LIST':
      return [...state, action.event];
    case 'REMOVE_FROM_WATCH_LIST':
      const filtered = state.filter(event => event.e_id !== action.event.e_id);
      return [...filtered];
    default:
      return state;
  }
};
