import { RootState } from 'app/store';

export function getRoles(state: RootState) {
  return state.role.data;
}

export function isRolesLoading(state: RootState) {
  return state.role.isLoading;
}
