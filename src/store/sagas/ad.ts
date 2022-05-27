import { takeEvery, call, put, fork } from 'redux-saga/effects';

import * as Api from 'app/api';
import { ToastControl } from 'app/components/ToastControl';
import { navigationService } from 'app/lib/services';
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

function* createAd(payload: {
  token: string;
  description: string;
  serviceIds: string[];
  employmentTypeIds: string[];
  dateAvailableFrom: Date;
  fixedTerm: boolean;
  dateAvailableTo: Date;
  workingTimeNegotiable: boolean;
  workingTime: Types.WorkingTime[]
}) {
  const { token, description, serviceIds, employmentTypeIds, dateAvailableFrom, fixedTerm, dateAvailableTo,  workingTimeNegotiable, workingTime } = payload;
  try { 
    yield put(Actions.setLoadingCreateAd());
    const result: ResponseGenerator = yield call(
      Api.createAd,
      token,
      description,
      serviceIds,
      employmentTypeIds,
      dateAvailableFrom,
      fixedTerm,
      dateAvailableTo,
      workingTimeNegotiable,
      workingTime
    );
    yield put(Actions.createAdSuccess(result.data.message, result.data.add));
    navigationService.navigate(Types.Route.Settings);
  } catch (error: any) {
    if(error.response){
      ToastControl.show(error.response.data.message, 'error');
      yield put(Actions.createAdFailed({ message: error.response.data.message }));
    } else {
      ToastControl.show('Something went wrong', 'error')
    }
  }
}

function* watchCreateUserServiceRequest() {
  yield takeEvery(Types.AD.CREATE_AD_REQUEST as any, createAd);
}

const userServiceSagas = [fork(watchCreateUserServiceRequest)];

export default userServiceSagas;
