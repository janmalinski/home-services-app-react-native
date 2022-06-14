import { RootState } from 'app/store';

export function getAlertMessage(state: RootState) {
  return state.alert.message;
}

export function getAlertStatus(state: RootState) {
  return state.alert.status;
}
