import { RootState } from 'app/store';

export function isLoggedIn(state: RootState) {
  return state.auth.token;
}

export function isLoading(state: RootState) {
  return state.auth.isLoading;
}

export function isVerificationEmailSent(state: RootState) {
  return state.auth.verificationEmailSent;
}