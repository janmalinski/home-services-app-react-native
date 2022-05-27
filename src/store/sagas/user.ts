import { takeEvery, call, put, fork } from 'redux-saga/effects';

import * as Api from 'app/api';
import { ToastControl } from 'app/components/ToastControl';
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

type getUserParams = {payload: { token: string }; type: string };
type updateUserParams = {
  token: string;
  firstName: string;
  phoneNumber: string;
  consentPhoneNumberVisibility: boolean;
  email: string;
  latitude: string;
  longitude: string;
  type: string;
};
type getUserAvatarParams = { payload: { token: string; avatar: string }; type: string };

function* getUser(payload: getUserParams) {
  try {
    yield put(Actions.setLoadingGetUser());
    const result: ResponseGenerator = yield call(Api.getUser, payload.payload.token);
    yield put(
      Actions.getUserSuccess({
        user: result.data.user,
      }),
    );
  } catch (error: any) {
    if(error.response){
      ToastControl.show(error.response.data.message, 'error');
      yield put(Actions.getUserFailed({ message: error.response.data.message }));
    } else {
      ToastControl.show('Something went wrong', 'error')
    }
  }
}

function* watchGetUserRequest() {
  yield takeEvery(Types.USER.GET_USER_REQUEST, getUser);
}

function* updateUser(
  payload: updateUserParams
) {
  try {
    const { token, firstName, phoneNumber, consentPhoneNumberVisibility, email, latitude, longitude} = payload;
    yield put(Actions.setLoadingUpdateUser());
    const result: ResponseGenerator = yield call(
      Api.updateUser,
      token,
      firstName,
      phoneNumber,
      consentPhoneNumberVisibility,
      email,
      latitude,
      longitude
    );
    yield put(
      Actions.updateUserSuccess({
        user: result.data.user,
      }),
    );
  } catch (error: any) {
    if(error.response){
      ToastControl.show(error.response.data.message, 'error');
      yield put(Actions.updateUserFailed({ message: error.response.data.message }));
    } else {
      ToastControl.show('Something went wrong', 'error')
    }
  }
}

function* watchUpdateUserRequest() {
  yield takeEvery(Types.USER.UPDATE_USER_REQUEST, updateUser);
}

function* getUserAvatar(payload: getUserAvatarParams) {
  try {
    const result: ResponseGenerator = yield call(
      Api.uploadUserAvatar,
      payload.payload.token,
      payload.payload.avatar,
    );
    yield put(Actions.getUserAvatarSuccess(result.data.avatarURL));
  } catch (error: any) {
    if(error.response){
      ToastControl.show(error.response.data.message,'errror');
      yield put(Actions.getUserAvatarFailed({ message: error.response.data.message }));
    } else {
      ToastControl.show('Something went wrong','errror')
    }
  }
}

function* watchGetUserAvatarRequest() {
  yield takeEvery(Types.USER.POST_USER_AVATAR_REQUEST, getUserAvatar);
}


const userSagas = [
    fork(watchGetUserRequest),
    fork(watchGetUserAvatarRequest),
    fork(watchUpdateUserRequest),
  ];
  
  export default userSagas;