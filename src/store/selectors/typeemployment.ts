import { RootState } from 'app/store';

export function getTypeemployments(state: RootState) {
  return state.typeemployment.data;
}

export function isTypeemploymentsLoading(state: RootState) {
  return state.typeemployment.isLoading;
}
