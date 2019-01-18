export const eventsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      state[action.page] = action.events;
      return state;

    case 'SET_WATCH_EVENT':
      state[action.page][state[action.page].indexOf(action.event)] =
        action.event;
      return state;

    case 'RESET_EVENTS':
      return state;

    default:
      return state;
  }
};

export const eventsPageReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_EVENT_PAGE_INFO':
      return action.info;
    case 'SET_CURRENT_EVENT_PAGE':
      return { ...state, current: action.page };
    default:
      return state;
  }
};

export const eventsLinkReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_EVENT_LINK_INFO':
      return action.links;
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
