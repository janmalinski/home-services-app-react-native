// Prettier/Eslint wants to put all the imports inside the first "declaration module"
/* eslint-disable import/order */

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}

// NOTE: TS offers a "Partial" method that is only for the first level of an object.
// With this, you can cover all levels of your object.
// This should help you with your tests if example you need to mock a fragment of your redux state.
//
declare type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
