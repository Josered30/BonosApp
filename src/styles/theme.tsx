import { cyan } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#07283E',
      main: '#07283E',
      dark: '#07283E',
      contrastText: '#fff',
    },
    secondary: {
      light: '#26BFA6',
      main: '#26BFA6',
      dark: '#26BFA6',
      contrastText: '#000',
    }
  },
});

export default theme;