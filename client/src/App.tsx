import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider, CssBaseline, Container } from "@material-ui/core";
import TasksContainer from "./components/TasksContainer/TasksContainer";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#c26565"
    },
    secondary: {
      main: "#fff"
    }
  },
  typography: {
    button: {
      textTransform: "capitalize"
    }
  },
  overrides: {
    MuiCard: {
      root: {
        border: "2px solid #000"
      }
    }
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Container maxWidth="md">
          <Route to="/tasks" component={TasksContainer} />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;