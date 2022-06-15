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

type getServicesParams = { payload: { token: string }; type: string }

function* getServices(payload: getServicesParams) {
  try {
    yield put(Actions.setLoadingGetServices());
    const result: ResponseGenerator = yield call(Api.getAllServices, payload.payload.token);
    yield put(
      Actions.getServicesSuccess({
        services: result.data.services,
      }),
    );
  } catch (error: any) {
    if(error.response){
      yield put(Actions.setAlert(error.response.data.message, 'error'));
      yield put(Actions.getServicesFailed({ message: error.response.data.message }));
    } else {
      yield put(Actions.setAlert('Something went wrong', 'error'));
    }
  }
}

function* watchGetUserRequest() {
  yield takeEvery(Types.SERVICE.GET_SERVICES_REQUEST, getServices);
}

const serviceSagas = [fork(watchGetUserRequest)];

export default serviceSagas;
