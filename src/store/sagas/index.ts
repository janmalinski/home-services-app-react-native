import { all } from 'redux-saga/effects';

import adSagas from './ad';
import authSagas from './auth';
import rolesSagas from './role';
import serviceSagas from './service';
import typeemploymentsSagas from './typeemployment';
import userSagas from './user';

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...serviceSagas,
    ...adSagas,
    ...typeemploymentsSagas,
    ...rolesSagas,
    ...userSagas,
  ]);
}
