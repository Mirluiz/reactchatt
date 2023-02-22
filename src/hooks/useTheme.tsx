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
		left: "rgb(255,255,255)",
		leftTitle: "#e17076",
		onLeft: "rgb(0,0,0)",
		onLeftSecondary: "rgb(104, 108, 114)",
		right: "rgb(238,255,222)",
		rightTitle: "#6ec9cb",
		onRight: "rgb(0,0,0)",
		onRightSecondary: "rgba(79,174,78,1)",
		chip: "#b2b2b2",
		onChip: "#fff",
		background: "#95c48a",
		paper: "#fff",
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