import { createTheme } from "@material-ui/core";

const theme = createTheme({
  typography: {
    fontFamily: ["Arial"].join(","),
  },
});

theme.typography.h2 = {
    fontFamily: ["Arial"].join(","),
    fontSize: "4rem",
  [theme.breakpoints.down("xs")]: {
    fontSize: "3rem",
  },
};

export default theme;
