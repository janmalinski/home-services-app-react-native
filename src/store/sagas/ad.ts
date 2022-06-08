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

function* createAd(payload: {
  token: string;
  description: string;
  serviceIds: string[];
  employmentTypeIds: string[];
  dateAvailableFrom: Date;
  fixedTerm: boolean;
  dateAvailableTo: Date;
  workingTimeNegotiable: boolean;
  workingTime: Types.WorkingTime[],
  address: string,
  latitude: number,
  longitude: number,
}) {
  const { token, description, serviceIds, employmentTypeIds, dateAvailableFrom, fixedTerm, dateAvailableTo,  workingTimeNegotiable, workingTime, address, latitude, longitude } = payload;
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
      workingTime,
      address,
      latitude,
      longitude
    );
    yield put(Actions.createAdSuccess(result.data.message, result.data.add));
    ToastControl.show(result.data.message, 'success');
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
