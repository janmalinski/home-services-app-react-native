import { RootState } from 'app/store';

export function getAlert(state: RootState) {
  return state.alert.message;
}
