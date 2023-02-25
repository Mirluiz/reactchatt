import React, { FC, useEffect } from "react";
import { MessageStatus } from "../../@types/message";
import { useTheme } from "../../hooks";
import moment from "moment";

const MessageMeta: FC<{
  position: "left" | "right";
  date: Date;
  status: MessageStatus | undefined;
  chip?: boolean;
  shift?: boolean;
}> = (props) => {
  const { date, status, chip, shift, position } = props;
  const theme = useTheme();

  const shiftStyle = {
    marginTop: shift ?? "-1rem",
  };

  return (
    <div
      className={chip ? "rc-chip" : "rc-meta"}
      style={{
        marginTop: shift ? "-1rem" : "",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              lineHeight: 1,
              paddingTop: theme.space(0.1),
              paddingBottom: theme.space(0.1),
              fontSize: ".6rem",
              color: !chip
                ? position === "left"
                  ? theme.palette.onLeftSecondary
                  : theme.palette.onRightSecondary
                : "white",
            }}
          >
            {moment(date).format("hh:mm A")}
          </span>
        </div>
        {position === "right" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: theme.space(0.4),
              width: "0.6rem",
            }}
          >
            {status === 1 && (
              <svg
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                style={{
                  fill: chip
                    ? theme.palette.paper
                    : theme.palette.onRightSecondary,
                }}
                data-testid="CheckOutlinedIcon"
              >
                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
              </svg>
            )}
            {status === 2 && (
              <svg
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                style={{
                  fill: chip
                    ? theme.palette.paper
                    : theme.palette.onRightSecondary,
                }}
                data-testid="DoneAllOutlinedIcon"
              >
                <path d="m18 7-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41 6 19l1.41-1.41L1.83 12 .41 13.41z"></path>
              </svg>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageMeta;
