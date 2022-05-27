import { RootState } from 'app/store';

export function getServices(state: RootState) {
  return state.service.data;
}

export function isServicesLoading(state: RootState) {
  return state.service.isLoading;
}
