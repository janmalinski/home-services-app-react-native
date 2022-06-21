import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from 'app/store';

import { Alert } from './components';
import { i18n } from './config/translations';
import { RootNavigator } from './navigation';

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <SafeAreaProvider>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <RootNavigator />
            <Alert />
          </SafeAreaProvider>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
