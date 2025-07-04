// global.d.ts  – picked up automatically by tsconfig

import React from 'react';

declare global {
  /*  make TS happy when it sees <w3m-button /> in TSX/JSX  */
  namespace JSX {
    interface IntrinsicElements {
      /* allow any attributes you might pass, e.g. size="sm" */
      'w3m-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export {};
