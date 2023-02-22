import React, { ChangeEventHandler, FC, useEffect } from "react";
import { Avatar, Typography } from "../elements";
import IconButton from "../elements/IconButton";
import { useTheme } from "../hooks/useTheme";
import { MessengerHeaderProps } from "./header";

const Header: FC<MessengerHeaderProps> = (props) => {
	// const { action, info, image } = props;
	// const theme = useTheme();

	return (
		<></>
		// <div
		// 	style={{
		// 		background: theme.palette.background,
		// 		// p: 1,
		// 		display: "flex",
		// 		alignItems: "center",
		// 		justifyContent: "space-between",
		// 	}}>
		// 	<div
		// 		style={{
		// 			display: "flex",
		// 			height: "100%",
		// 		}}>
		// 		<div
		// 			style={{
		// 				height: "100%",
		// 				width: "100%",
		// 				display: "flex",
		// 				justifyContent: "center",
		// 			}}>
		// 			<Avatar variant="rounded" img={image} />
		// 		</div>
		// 		<div
		// 			style={{
		// 				display: "flex",
		// 				flexDirection: "column",
		// 				paddingLeft: 0.9,
		// 			}}>
		// 			<div>
		// 				<div
		// 				// sx={{
		// 				// 	fontWeight: 500,
		// 				// 	color: "#3B3B3B",
		// 				// 	fontSize: 15,
		// 				// }}
		// 				>
		// 					{info?.main}
		// 				</div>
		// 			</div>
		// 			<div>
		// 				<Typography>{info?.secondary}</Typography>
		// 			</div>
		// 		</div>
		// 	</div>
		// 	<div
		// 		style={{ height: "100%", display: "flex", justifyContent: "flex-end" }}>
		// 		<IconButton>{/* <SearchRoundedIcon /> */}</IconButton>
		// 		<IconButton>{/* <MoreVertRoundedIcon /> */}</IconButton>
		// 	</div>
		// </div>
	);
};

export default Header;
