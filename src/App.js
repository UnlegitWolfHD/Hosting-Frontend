import * as React from 'react';

import Router from './routes';
import ThemeProvider from './theme';

export default function ToggleColorMode() {

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}