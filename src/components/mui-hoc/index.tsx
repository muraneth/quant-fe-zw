import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "rgba(255, 255, 255, 0.65)" },
    secondary: {
      main: "#7451ff",
      light: "#8f73ff",
    },
    error: {
      main: "#EF8F8F",
    },
    background: { default: "#121212", paper: "#1E1E1E" },
  },
  spacing: 0,
});

const MuiHOC = (props) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {props.children}
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default MuiHOC;
