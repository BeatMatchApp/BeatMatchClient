import { createTheme } from "@mui/material/styles";
import {
  lightColor,
  mediumColor,
  darkColor,
  textMainColor,
  textSecondaryColor,
  disabledColor,
  textLightColor,
  lightPurpleColor,
  pinkColor
} from "./colors";

declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      light: string;
      medium: string;
      dark: string;
      textMain: string;
      textSecondary: string;
      disabled: string;
      pink: string;
      default: string;
      lightPurple: string;
    };
  }
  interface PaletteOptions {
    customColors?: {
      light: string;
      medium: string;
      dark: string;
      textMain: string;
      textSecondary: string;
      textLight: string;
      disabled: string;
      pink: string;
      default: string;
      lightPurple: string;
    };
  }
}

const theme = createTheme({

  palette: {
    primary: {
      main: lightPurpleColor
    },
    customColors: {
      light: lightColor,
      medium: mediumColor,
      dark: darkColor,
      textMain: textMainColor,
      textSecondary: textSecondaryColor,
      textLight: textLightColor,
      disabled: disabledColor,
      pink: pinkColor,
      lightPurple: lightPurpleColor,
      default: "#e8f0fe"
    },
  },
});

export default theme;
