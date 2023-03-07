export const style = `
.reactchat .rc-messages-scroll {
	width: 100%;
	flex: 1 1;
	overflow-y: scroll;
}


.rc-messages-scroll .rc-container {
	min-height: 100%;
	display: flex;
	align-items: flex-end;
}

.force-messages-scroll  .rc-container {
	margin-top: 100vh;
}


.rc-messages-scroll::-webkit-scrollbar {
	display: none;
}


.rc-messages-scroll .rc-list {
	display: flex;
	
	flex-direction: column;
	width: 100%;
}

.rc-layer {
	width: 100%;
	display: flex;
	align-items: flex-end;
	margin-top: var(--rc-sx-1);
}

@keyframes highlight {
  from {background-color: rgba(100,149,237, .6);}
  to {background-color: rgba(100,149,237, 0);}
}

.rc-layer.highlight {
	animation: highlight linear 700ms;
}
`;
