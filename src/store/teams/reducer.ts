import { Reducer } from 'redux'
import { TeamsState, TeamsActionTypes } from './types'

// Type-safe initialState!
export const initialState: TeamsState = {
  data: [],
  errors: undefined,
  selected: undefined,
  loading: false
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<TeamsState> = (state = initialState, action) => {
  switch (action.type) {
    case TeamsActionTypes.FETCH_REQUEST:
    case TeamsActionTypes.SELECT_TEAM: {
      return { ...state, loading: true }
    }
    case TeamsActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case TeamsActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    case TeamsActionTypes.SELECTED: {
      return { ...state, loading: false, selected: action.payload }
    }
    case TeamsActionTypes.CLEAR_SELECTED: {
      return { ...state, selected: undefined }
    }
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as teamsReducer }
