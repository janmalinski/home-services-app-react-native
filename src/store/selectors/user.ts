import { RootState } from 'app/store';

export function getUser(state: RootState) {
  return state.user.user;
}

export function getNearbyUsers(state: RootState) {
  return state.user.nearbyUsers;
}
