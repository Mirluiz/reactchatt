import React from "react";

export const leftIcon = (
	<svg
		focusable="false"
		aria-hidden="true"
		viewBox="0 0 24 24"
		data-testid="AttachFileOutlinedIcon">
		<path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"></path>
	</svg>
);
export const rightIcon = (
	<svg
		focusable="false"
		aria-hidden="true"
		viewBox="0 0 24 24"
		data-testid="SentimentSatisfiedAltOutlinedIcon">
		<circle cx="15.5" cy="9.5" r="1.5"></circle>
		<circle cx="8.5" cy="9.5" r="1.5"></circle>
		<path d="M12 16c-1.48 0-2.75-.81-3.45-2H6.88c.8 2.05 2.79 3.5 5.12 3.5s4.32-1.45 5.12-3.5h-1.67c-.69 1.19-1.97 2-3.45 2zm-.01-14C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
	</svg>
);
export const sendIcon = (
	<svg
		focusable="false"
		aria-hidden="true"
		viewBox="0 0 24 24"
		data-testid="EmailOutlinedIcon">
		<path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"></path>
	</svg>
);

export const tail = (
	<svg width="9" height="20" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<filter
				x="-50%"
				y="-14.7%"
				width="200%"
				height="141.2%"
				filterUnits="objectBoundingBox"
				id="a">
				<feOffset
					dy="1"
					in="SourceAlpha"
					result="shadowOffsetOuter1"></feOffset>
				<feGaussianBlur
					stdDeviation="1"
					in="shadowOffsetOuter1"
					result="shadowBlurOuter1"></feGaussianBlur>
				<feColorMatrix
					values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0"
					in="shadowBlurOuter1"></feColorMatrix>
			</filter>
		</defs>
		<g fill="none" fill-rule="evenodd">
			<path
				d="M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z"
				fill="#000"
				filter="url(#a)"></path>
			<path
				d="M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z"
				fill="#FFF"
				className="corner"></path>
		</g>
	</svg>
);
