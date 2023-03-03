import React, { FC, useEffect } from "react";
import { MessageStatus } from "../../@types/message";
import { useTheme } from "../../hooks";
import moment from "moment";
import { Typography } from "../../elements";

const MessageMeta: FC<{
  position: "left" | "right";
  date: Date;
  status: MessageStatus | undefined;
  style: "image" | "text" | "file";
}> = (props) => {
  const { date, status, style, position } = props;
  const theme = useTheme();

  return (
    <div className={`rc-meta-${style}`}>
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
              // fontSize: ".6rem",
              display: "flex",
              color:
                style !== "image"
                  ? position === "left"
                    ? theme.palette.onLeftSecondary
                    : theme.palette.onRightSecondary
                  : "white",
            }}
          >
            <Typography size={"es"}>
              {moment(date).format("hh:mm A")}
            </Typography>
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
                  fill:
                    style === "image"
                      ? theme.palette.paper
                      : theme.palette.onRightSecondary,
                }}
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
                  fill:
                    style === "image"
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
