// This file holds our state type, as well as any other types related to this Redux store.

// Response object for GET /teams
// https://docs.opendota.com/#tag/teams%2Fpaths%2F~1teams%2Fget
export interface Team {
  team_id: number
  rating: number
  wins: number
  losses: number
  last_match_time: number
  name: string
  tag?: string
  logo_url?: string
}

export interface Player {
  account_id: number
  name: string
  games_played: number
  wins: number
  is_current_team_member: boolean
}

export interface TeamSelectedPayload {
  detail: Team
  players: Player[]
}

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum TeamsActionTypes {
  FETCH_REQUEST = '@@teams/FETCH_REQUEST',
  FETCH_SUCCESS = '@@teams/FETCH_SUCCESS',
  FETCH_ERROR = '@@teams/FETCH_ERROR',
  SELECT_TEAM = '@@teams/SELECT_TEAM',
  SELECTED = '@@teams/SELECTED',
  CLEAR_SELECTED = '@@teams/CLEAR_SELECTED'
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface TeamsState {
  readonly loading: boolean
  readonly data: Team[]
  readonly selected?: TeamSelectedPayload
  readonly errors?: string
}
