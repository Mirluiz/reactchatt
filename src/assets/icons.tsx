import React from "react";

export const leftIcon = (
  <svg
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="AttachFileOutlinedIcon"
  >
    <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"></path>
  </svg>
);
export const rightIcon = (
  <svg
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="SentimentSatisfiedAltOutlinedIcon"
  >
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
    data-testid="EmailOutlinedIcon"
  >
    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"></path>
  </svg>
);

export const tail = (color: string, position: "left" | "right") => {
  return (
    <svg
      className="bubble_icon"
      width="8px"
      height="15px"
      viewBox="0 0 8 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="black"
        transform={position === "left" ? "scale(-1, 1) translate(-8, 0)" : ""}
      >
        <path
          d="M 0 15
                 H 5.4
                 Q 6.1 14.6 6 13.7
                 Q 0 10 0 0
                 Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export const ___tail = (color: string, position: string) => {
  return (
    <svg
      className="bubble_icon"
      width="8px"
      height="15px"
      viewBox="0 0 8 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="black">
        <path
          d="M 0 15
                 H 5.4
                 Q 6.1 14.6 6 13.7
                 Q 0 4 0 0
                 Z"
          fill={color}
        />
      </g>
    </svg>
  );
};
