import { takeLatest, call, put, fork } from 'redux-saga/effects';

import * as Api from 'app/api';
import { navigationService } from 'app/lib/services';
import AuthService from 'app/lib/services/AuthService';
import * as Actions from 'app/store/actions';
import * as Types from 'app/types';

interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

type signUpParams = { payload: Types.SignUpPayload; type: string };
type verifyParams = { payload: { code: string }; type: string };
type signInParams = { payload: Types.SignInPayload; type: string };

function* signUp({ payload }: signUpParams) {
  try {
    yield put(Actions.setLoadingSignUp());
    const { email, password, termsAccepted, latitude, longitude, userType, language } = payload;
    const result: ResponseGenerator = yield call(Api.signUp, {
      email,
      password,
      termsAccepted,
      latitude,
      longitude,
      userType,
      language,
    });
    yield put(Actions.setSignUpSuccess());
    navigationService.navigate(Types.Route.RegistrationCodeSignUp);
    yield put(Actions.setAlert(result.data.message, 'info'));
  } catch (error: any) {
    if (error.response) {
      yield put(Actions.setAlert(error.response.data.message, 'error'));
      yield put(Actions.setSignUpFailed({ message: error.response.data.message }));
    } else {
      yield put(Actions.setAlert('Something went wrong', 'error'));
    }
  }
}

function* watchSignUpRequest() {
  yield takeLatest(Types.AUTH.SIGN_UP_REQUEST, signUp);
}

function* verify({ payload }: verifyParams) {
  try {
    yield put(Actions.setLoadinVerify());
    const { code } = payload;
    const result: ResponseGenerator = yield call(Api.verify, {
      code,
    });
    yield put(Actions.setVerifySuccess());
    navigationService.navigate(Types.Route.SignIn);
    yield put(Actions.setAlert(result.data.message, 'info'));
  } catch (error: any) {
    if (error.response) {
      yield put(Actions.setAlert(error.response.data.message, 'error'));
      yield put(Actions.setVerifyFailed({ message: error.response.data.message }));
    } else {
      yield put(Actions.setAlert('Something went wrong', 'error'));
    }
  }
}

function* watchVerifyRequest() {
  yield takeLatest(Types.AUTH.VERIFY_REQUEST, verify);
}

function* signIn({ payload }: signInParams) {
  try {
    yield put(Actions.setLoadingSignIn());
    const result: ResponseGenerator = yield call(Api.signIn, {
      email: payload.email,
      password: payload.password,
    });
    yield put(Actions.setToken({ token: result.data.token }));
    yield put(Actions.setSignInSuccess());
  } catch (error: any) {
    if (error.response) {
      yield put(Actions.setAlert(error.response.data.message, 'error'));
      yield put(Actions.setSignInFailed({ message: error.response.data.message }));
    } else {
      yield put(Actions.setAlert('Something went wrong', 'error'));
    }
  }
}

function* watchSignInRequest() {
  yield takeLatest(Types.AUTH.SIGN_IN, signIn);
}

function* signOut() {
  try {
    yield AuthService.resetAsyncStorage();
  } catch (error) {
    console.log('RESET_ASYNCSTORAGE_ERROR', error);
  }
}

function* watchSignOut() {
  yield takeLatest(Types.AUTH.SIGN_OUT, signOut);
}

const authSagas = [
  fork(watchSignUpRequest),
  fork(watchVerifyRequest),
  fork(watchSignInRequest),
  fork(watchSignOut),
];

export default authSagas;
