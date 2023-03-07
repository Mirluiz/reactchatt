export const style = `
.reactchat .rc-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reactchat .rc-meta div:not(:first-child) {
  margin-left: var(--rc-sx-05);
}

.reactchat .rc-meta-editStatus {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2px;
}

.reactchat .rc-meta-text {
	border-radius: 0.5rem;
  height: 22px;
	float: right;
	position: relative;
	right: -3px;
	bottom: auto !important;
	line-height: 22px;
	margin-left: 0.4rem;
	top: 10px;
}

.reactchat .rc-meta-image {
	align-items: center;
	border-radius: 0.5rem;
	height: 16px;
	float: right;
	position: relative;
	right: 1px;
	bottom: auto !important;
	margin-left: 0.4rem;
	padding-left: 5px;
	padding-right: 5px;
	margin-top: -24px;
	line-height: 18px;
	background-color: rgba(0, 0, 0, 0.2);
	color: red;
  top: 6px;
}

.reactchat .rc-meta-file {
	position: absolute;
	display: flex;
	align-items: center;
	border-radius: 0.5rem;
	padding-top: 1px;
	padding-bottom: 1px;
	height: 16px;
	float: right;
	right: 6px;
	bottom: -1px;
	line-height: 1.35;
}

.reactchat .rc-meta-time {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2px;
}

.reactchat .rc-meta-icons {
  height: 100%;
  display: flex;
  align-items: center;
}

`;
