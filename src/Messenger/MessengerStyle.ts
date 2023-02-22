export const style = `
.reactchat {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	background-color: var(--rc-palette-background);
	border-radius: var(--rc-border-radius);
	padding: var(--rc-sx-1);
	flex-grow: 1;
	position: relative;
	min-height: 400px;
}

.reactchat * {
	font-family: var(--rc-typography-fontFamily);
}
`;
