import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f51b5', //00B98C 
    },
    secondary: {
      main: '#19857b', //FFB400
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    textSecondary: {
      default: '#fbfbfb',
    },
  },
});

export default theme;
