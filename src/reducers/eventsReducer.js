export const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return action.events || state;

    case 'SET_WATCH_EVENT':
      const events = state.map(event => {
        if (event.e_id === action.event.e_id) {
          event.favorite = !event.favorite;
        }
        return event;
      });

      return events;

    default:
      return state;
  }
};

export const eventTargetReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_TARGET_EVENT':
      return action.event;
    default:
      return state;
  }
};

export const popupReducer = (state = false, action) => {
  switch (action.type) {
    case 'CHANGE_DISPLAY_POPUP':
      return action.bool;
    default:
      return state;
  }
};
