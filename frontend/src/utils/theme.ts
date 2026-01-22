import { createTheme } from "@mui/material/styles";

const BRAND_COLORS = {
  primary: "#00a7e3",
  onPrimary: "#ffffff",
  secondary: "#9c9e9f",
  accent: "#008acf",
  accentLight: "#85cfeb",
  accentDark: "#0066a7",
};

const theme = createTheme({
  palette: {
    primary: {
      main: BRAND_COLORS.primary,
      contrastText: BRAND_COLORS.onPrimary,
    },
    secondary: {
      main: BRAND_COLORS.secondary,
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
    },
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: 'var(--font-base, "Titillium Web", system-ui, sans-serif)',
    h1: {
      fontSize: "var(--h1-font-size, 24px)",
      fontWeight: "var(--h1-font-weight, bold)" as any,
    },
    h6: {
      fontWeight: "var(--h1-font-weight, bold)" as any,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "var(--font-base)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "var(--radius-md, 6px)",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "var(--radius-md, 6px)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "var(--radius-md, 6px)",
          fontWeight: "bold",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: "16px 0",
        },
      },
    },
  },
});

export default theme;
