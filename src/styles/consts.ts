export const primaryColor: string = "#5a36a1";
export const disabledColor: string = "#ccc";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
  },
});

export default theme;
