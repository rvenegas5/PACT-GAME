import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

const primary = "#A46D51";
const primary_light = "#C5A593";
const primary_dark = "#82634F";


const Theme = createTheme({
  palette: {
    primary: {
      main: primary,
      light: primary_light,
      dark: "",
      constrastText: ""
    },
    secondary: {
      main: "#F2E8D9",
      light: "",
      dark: "",
      constrastText: ""
    },
    error: {
      main: colors.red.A400,
      light: "",
      dark: "",
      constrastText: ""
    },
    background: {
      paper: primary_light,
      default: primary
    }
  }
});

export { Theme };
