import { takeEvery, call, put, fork } from 'redux-saga/effects';

import * as Api from 'app/api';
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
  latitude: number;
  longitude: number;
  type: string;
};

type getUserAvatarParams = { payload: { token: string; avatar: string }; type: string };

type getNearbyUsersParams = { payload: { latitude: number, longitude: number }; type: string };

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
      yield put(Actions.setAlert(error.response.data.message, 'error'));
      yield put(Actions.getUserFailed({ message: error.response.data.message }));
    } else {
      yield put(Actions.setAlert('Something went wrong', 'error'));
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
      token, firstName, phoneNumber, consentPhoneNumberVisibility, email, latitude, longitude
    );
    yield put(
      Actions.updateUserSuccess({
        user: result.data.user,
      }),
    );
  } catch (error: any) {
    if(error.response){
      yield put(Actions.setAlert(error.response.data.message, 'error'));
      yield put(Actions.updateUserFailed({ message: error.response.data.message }));
    } else {
      yield put(Actions.setAlert('Something went wrong', 'error'));
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
      yield put(Actions.setAlert(error.response.data.message, 'error'));
      yield put(Actions.getUserAvatarFailed({ message: error.response.data.message }));
    } else {
      yield put(Actions.setAlert('Something went wrong','errror'));
    }
  }
}

function* watchGetUserAvatarRequest() {
  yield takeEvery(Types.USER.POST_USER_AVATAR_REQUEST, getUserAvatar);
}

function* getNearbyUsers(payload: getNearbyUsersParams) {
  try {
    yield put(Actions.setLoadingGetUser());
    const { latitude, longitude } = payload.payload;
    const result: ResponseGenerator = yield call(Api.getNearbyUsers, latitude, longitude);
    yield put(
      Actions.getNearbyUsersSuccess({
        nearbyUsers: result.data.users
      }),
    );
  } catch (error: any) {
    if(error.response){
      yield put(Actions.setAlert(error.response.data.message, 'error'));
      yield put(Actions.getNearbyUserFailed({ message: error.response.data.message }));
    } else {
      yield put(Actions.setAlert('Something went wrong','errror'));
    }
  }
}

function* watchGetNearbyUsersRequest() {
  yield takeEvery(Types.USER.GET_NEARBY_USERS_REQUEST, getNearbyUsers);
}

const userSagas = [
    fork(watchGetUserRequest),
    fork(watchGetUserAvatarRequest),
    fork(watchUpdateUserRequest),
    fork(watchGetNearbyUsersRequest)
  ];
  
  export default userSagas;