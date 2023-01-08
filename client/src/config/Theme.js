import { createTheme } from "@mui/system";

const Theme = createTheme({
  palette: {
    background: {
      paper: "#fff",
      primary: "#A46D51",
      secondary: "#82634F",
      extra: "#C5A593"
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A"
    },
    action: {
      active: "#001E3C"
    },
    success: {
      dark: "#009688"
    }
  }
});


export { Theme };
