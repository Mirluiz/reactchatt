export const style = `
@media (pointer: fine) {
	.reactchat .rc-icon_button:hover {
		// background-color: whitesmoke;
	}
}

.reactchat .rc-icon_button {
	display: flex;
	justify-content: center;
	position: relative;
	box-sizing: border-box;
	font-size: var(--rc-fontSize);
	border: 0;
	margin: 0;
	border-radius: 50%;
	background-color: var(--rc-palette-paper);
	padding: var(--rc-sx-1);
	cursor: pointer;
	-webkit-user-select: none; /* Safari */
	-ms-user-select: none; /* IE 10 and IE 11 */
	user-select: none; 
}

.rc-icon_button:focus {
  outline: none;
  box-shadow: none;
  background-color: var(--rc-palette-paper);
  fill: var(--rc-palette-on-paper-secondary);
}

.rc-icon_div {
	width: 24px;
	height: 24px;
  background-color: var(--rc-palette-paper);
  fill: var(--rc-palette-on-paper-secondary);
}
`;
