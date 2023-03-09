import React, { useContext } from "react";
import { ThemeProps } from "../@types/theme";

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeContext = React.createContext<ThemeProps>({
  spacing: 8,
  shape: {
    borderRadius: 1,
  },
  palette: {
    left: "",
    leftTitle: "",
    onLeft: "",
    onLeftSecondary: "",
    right: "",
    rightTitle: "",
    onRight: "",
    onRightSecondary: "",
    background: "",
    onBackground: "",
    onContrast: "",
    contrast: "",
    composer: "",
    onComposer: "",
    accent: "",
    onAccent: "",
    text: "",
    reply: "",
    onReply: "",
  },
  typography: {
    fontSize: "1.4rem",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  space: (v: number) => {
    return `${v * 8}px`;
  },
});

export default useTheme;
