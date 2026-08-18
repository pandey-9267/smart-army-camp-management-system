import * as actionTypes from "./types";

const INITIAL_KEY_STATE = {
  result: null,
  current: null,
  isLoading: false,
  isSuccess: false,
};

const INITIAL_STATE = {
  current: {
    result: null,
  },
  list: {
    result: {
      items: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 1,
      },
    },
    isLoading: false,
    isSuccess: false,
  },
  create: INITIAL_KEY_STATE,
  update: INITIAL_KEY_STATE,
  delete: INITIAL_KEY_STATE,
  read: INITIAL_KEY_STATE,
  search: { ...INITIAL_KEY_STATE, result: [] },
};

const crudReducer = (state = INITIAL_STATE, action) => {
  const { payload, keyState } = action;
  switch (action.type) {
    case actionTypes.RESET_STATE:
      return INITIAL_STATE;
    case actionTypes.CURRENT_ITEM:
      return {
        ...state,
        current: {
          result: payload,
        },
      };
    case actionTypes.REQUEST_LOADING:
      return {
        ...state,
        [keyState]: {
          ...state[keyState],
          isLoading: true,
        },
      };
    case actionTypes.REQUEST_FAILED:
      return {
        ...state,
        [keyState]: {
          ...state[keyState],
          isLoading: false,
          isSuccess: false,
        },
      };
    case actionTypes.REQUEST_SUCCESS:
  // When a delete succeeds, remove the deleted item
  // immediately from the current table list.
  if (keyState === "delete") {
    const deletedId = payload?._id;

    const currentItems = state.list.result.items || [];

    const updatedItems = deletedId
      ? currentItems.filter((item) => item._id !== deletedId)
      : currentItems;

    return {
      ...state,

      delete: {
        ...state.delete,
        result: payload,
        isLoading: false,
        isSuccess: true,
      },

      list: {
        ...state.list,

        result: {
          ...state.list.result,

          items: updatedItems,

          pagination: {
            ...state.list.result.pagination,
            total: Math.max(
              0,
              state.list.result.pagination.total -
                (deletedId ? 1 : 0)
            ),
          },
        },
      },
    };
  }

  return {
    ...state,
    [keyState]: {
      ...state[keyState],
      result: payload,
      isLoading: false,
      isSuccess: true,
    },
  };
    case actionTypes.CURRENT_ACTION:
      return {
        ...state,
        [keyState]: {
          ...INITIAL_KEY_STATE,
          current: payload,
        },
      };
    case actionTypes.RESET_ACTION:
      return {
        ...state,
        [keyState]: {
          ...INITIAL_STATE[keyState],
        },
      };
    default:
      return state;
  }
};

export default crudReducer;
