export const style = `
.rc-avatar {
	width: 30px;
	min-width: 30px;
	height: 30px;
	min-height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;

}

.rc-avatar.square {
	border-radius: var(--rc-sx-1);
}

.rc-avatar.square img {
	border-radius: var(--rc-sx-1);
}

.rc-avatar.rounded {
	border-radius: 100%;
}

.rc-avatar.rounded img {
	border-radius: 100%;
}
`;
