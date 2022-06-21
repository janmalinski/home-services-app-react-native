import { RootState } from 'app/store';

export function getAddError(state: RootState) {
  return state.ad.error;
}

export function isAdCreatePending(state: RootState) {
  return state.ad.isPending;
}

export function isAdCreated(state: RootState) {
  return state.ad.success;
}
