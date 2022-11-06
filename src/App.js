import React from 'react';
import './App.css';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from "./components/Header";

import Employees from "./pages/Employees/Employees";
import HRLogIn from './pages/HR/HRLogIn';
import Notification from './components/Notification';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  }
})


const useStyles = makeStyles({
  appMain: {
    paddingLeft: '1px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles();

  const [HRValidated, setHRValidated] = React.useState(false)
  
 const temp='ss'
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' })



  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={classes.appMain}>
          {HRValidated ? <><Header /> <Employees /> </>: <HRLogIn setHRValidated={setHRValidated} setNotify={setNotify}/>}
        </div>
        <CssBaseline />
      </ThemeProvider>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </>

  );
}

export default App;
