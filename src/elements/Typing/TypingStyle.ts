export const style = `
.rc-dot-flashing {
  left: 12px;
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background-color: var(--rc-palette-on-background);
  color: var(--rc-palette-on-background);
  animation: rc-dot-flashing 1s infinite linear alternate;
  animation-delay: 0.5s;
}
.rc-dot-flashing::before, .rc-dot-flashing::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
}
.rc-dot-flashing::before {
  left: -12px;
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background-color: var(--rc-palette-on-background);
  color: var(--rc-palette-on-background);
  animation: rc-dot-flashing 1s infinite alternate;
  animation-delay: 0s;
}
.rc-dot-flashing::after {
  left: 12px;
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background-color: var(--rc-palette-on-background);
  color: var(--rc-palette-on-background);
  animation: rc-dot-flashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes rc-dot-flashing {
  0% {
    background-color: var(--rc-palette-on-background);
  }
  50%, 100% {
    background-color: rgba(152, 128, 255, 0.2);
  }
}
`;
