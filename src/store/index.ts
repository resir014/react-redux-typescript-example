import { combineReducers } from 'redux'
import { all, fork } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import { LayoutState, layoutReducer } from './layout'

import heroesSaga from './heroes/sagas'
import { heroesReducer } from './heroes/reducer'
import { HeroesState } from './heroes/types'
import teamsSaga from './teams/sagas'
import { TeamsState } from './teams/types'
import { teamsReducer } from './teams/reducer'

// The top-level state object
export interface ApplicationState {
  layout: LayoutState
  heroes: HeroesState
  teams: TeamsState
  router: RouterState
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const createRootReducer = (history: History) =>
  combineReducers({
    layout: layoutReducer,
    heroes: heroesReducer,
    teams: teamsReducer,
    router: connectRouter(history)
  })

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
export function* rootSaga() {
  yield all([fork(heroesSaga), fork(teamsSaga)])
}
