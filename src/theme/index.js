import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
// material
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import * as locales from '@mui/material/locale';

//
import palette from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const [locale, setLocale] = useState('deDE');

  const themeOptions = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 8 },
      typography,
      shadows,
      customShadows,
    }),
    []
  );

  const themeWithLocale = useMemo(
    () => createTheme(themeOptions, locales[locale]),
    [locale, themeOptions],
  );
  themeWithLocale.components = componentsOverride(themeWithLocale);
  themeWithLocale.locale = locales[locale]

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={themeWithLocale}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
