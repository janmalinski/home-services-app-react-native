import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore, PersistConfig } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import * as actions from 'app/store/actions';
import * as selectors from 'app/store/selectors';

import {
  authReducer,
  AuthState,
  alertReducer,
  userReducer,
  serviceReducer,
  adReducer,
  typeemploymentReducer,
  roleReducer
} from './reducers';
import rootSaga from './sagas';

const authPersistConfig: PersistConfig<AuthState> = {
  key: 'auth',
  timeout: undefined,
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  alert: alertReducer,
  user: userReducer,
  service: serviceReducer,
  ad: adReducer,
  typeemployment: typeemploymentReducer,
  role: roleReducer
});

// export default rootReducer;

const sagaMiddleware = createSagaMiddleware({
  onError: (error: Error) => {
    if (__DEV__) {
      console.warn(error);
    }
  },
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: __DEV__,
});

const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;

export { store, persistor, actions, selectors };
