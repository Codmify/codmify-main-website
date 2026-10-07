import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string): PaletteColor =>
  augmentColor({ color: { main: mainColor } });

// Define the custom color
declare module "@mui/material/styles" {
  interface Palette {
    customGrey: PaletteColor;
  }
  interface PaletteOptions {
    customGrey?: PaletteColorOptions;
  }
}

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "#121279",
    },
    secondary: {
      main: "#fff",
      contrastText: "#121279",
    },
    text: { primary: "#121279", secondary: "#526573" },
    customGrey: createColor("#EDF2F7"),
  },

  components: {
    MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { minHeight: 48, padding: "12px 24px", borderRadius: "8px", "&:focus-visible": { outline: "2px solid currentColor", outlineOffset: 3 } } } },
    MuiContainer: { styleOverrides: { root: { paddingLeft: "24px", paddingRight: "24px" } } },
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h1: { fontSize: "3.5rem", lineHeight: 1.1, fontWeight: 700, "@media (max-width:899px)": { fontSize: "2.25rem" } },
    h2: { fontSize: "2.75rem", lineHeight: 1.15, fontWeight: 700, "@media (max-width:899px)": { fontSize: "2rem" } },
    h3: { fontSize: "1.5rem", lineHeight: 1.3, fontWeight: 700, "@media (max-width:899px)": { fontSize: "1.25rem" } },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.6 },
    button: { textTransform: "none", fontWeight: 700 },
  },
});
