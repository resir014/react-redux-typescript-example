import { Reducer } from 'redux'
import { LayoutState, LayoutActionTypes } from './types'

// checking if localStorage is !null
const persistTheme = localStorage.getItem('theme') !== null ? JSON.parse(localStorage.getItem('theme') || '{}') : 'light'
// Type-safe initialState!
export const initialState: LayoutState = {
  theme: persistTheme
}
// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<LayoutState> = (state = initialState, action) => {
  switch (action.type) {
    case LayoutActionTypes.SET_THEME: {
      return { ...state, theme: action.payload }
    }
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as layoutReducer }
