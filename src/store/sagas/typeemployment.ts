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

function* getTypeemploymnets() {
  try {
    yield put(Actions.setLoadingGetTypeemployment());
    const result: ResponseGenerator = yield call(Api.getAllTypeemployment);
    yield put(
      Actions.getTypeemploymentSuccess({
        typeemployments: result.data.typeemployments,
      }),
    );
  } catch (error: any) {
    if (error.response) {
      yield put(Actions.setAlert(error.response.data.message, 'error'));
      yield put(Actions.getTypeemploymentFailed({ message: error.response.data.message }));
    } else {
      yield put(Actions.setAlert('Something went wrong', 'error'));
    }
  }
}

function* watchGetTypeemploymentsRequest() {
  yield takeEvery(Types.TYPEEMPLOYMENT.GET_TYPEEMPLOYMENT_REQUEST, getTypeemploymnets);
}

const typeemploymentsSagas = [fork(watchGetTypeemploymentsRequest)];

export default typeemploymentsSagas;
