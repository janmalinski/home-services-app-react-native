import { RootState } from 'app/store';

export function getUser(state: RootState) {
  return state.user.data;
}
