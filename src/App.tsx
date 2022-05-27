import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import { RootNavigator } from './navigation'; 
import { Toast }  from 'app/components/ToastControl';
import { store, persistor } from 'app/store';
import { i18n } from './config/translations';

const App = () => {
  useEffect(()=>{
    RNBootSplash.hide({ fade: true });
  }, [])


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}> 
        <I18nextProvider i18n={i18n}>
          <SafeAreaProvider>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <RootNavigator />
            <Toast />
          </SafeAreaProvider>
        </I18nextProvider>
      </PersistGate>
    </Provider>
   
  );
};

export default App;
