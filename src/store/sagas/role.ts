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

function* getRoles() {
  try {
    yield put(Actions.setLoadingGetRole());
    const result: ResponseGenerator = yield call(Api.getAllRoles);
    yield put(
      Actions.getRoleSuccess({
        roles: result.data.roles,
      }),
    );
  } catch (error: any) {
    if(error.response){
      ToastControl.show(error.response.data.message, 'error');
      yield put(Actions.getRoleFailed({ message: error.response.data.message }));
    } else {
      ToastControl.show('Something went wrong', 'error')
    }
  
  }
}

function* watchGetRolesRequest() {
  yield takeEvery(Types.ROLE.GET_ROLE_REQUEST, getRoles);
}

const rolesSagas = [fork(watchGetRolesRequest)];

export default rolesSagas;
