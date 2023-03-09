export const style = `
@keyframes rc-lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.reactchat  .rc-lds-ring {
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;
}

.reactchat  .rc-lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 30px;
  height: 30px;
  /* margin: 8px; */
  border: 4px solid var(--rc-palette-on-background);
  border-radius: 50%;
  animation: rc-lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--rc-palette-on-background) transparent transparent transparent;
}

.reactchat  .rc-lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.reactchat  .rc-lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.reactchat  .rc-lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
`;
