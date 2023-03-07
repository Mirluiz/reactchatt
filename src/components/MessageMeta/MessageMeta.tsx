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
  edited: boolean;
  pending: boolean;
}> = (props) => {
  const { date, status, style, position, edited, pending } = props;
  const theme = useTheme();

  return (
    <div className={`rc-meta rc-meta-${style}`}>
      {edited && (
        <div className="rc-meta-editStatus">
          <Typography
            size={"s"}
            color={
              style !== "image"
                ? position === "left"
                  ? theme.palette.onLeftSecondary
                  : theme.palette.onRightSecondary
                : "white"
            }
          >
            Edited
          </Typography>
        </div>
      )}
      <div className="rc-meta-time">
        <Typography
          color={
            style !== "image"
              ? position === "left"
                ? theme.palette.onLeftSecondary
                : theme.palette.onRightSecondary
              : "white"
          }
          size={"s"}
        >
          {moment(date).format("hh:mm A")}
        </Typography>
      </div>
      {position === "right" && (
        <div className="rc-meta-icons">
          {status === 1 && (
            <svg
              width={"14"}
              height={"14"}
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              style={{
                fill:
                  style === "image"
                    ? theme.palette.onContrast
                    : theme.palette.onRightSecondary,
              }}
            >
              <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
            </svg>
          )}
          {status === 2 && (
            <svg
              width={"14"}
              height={"14"}
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              style={{
                fill:
                  style === "image"
                    ? theme.palette.onContrast
                    : theme.palette.onRightSecondary,
              }}
            >
              <path d="m18 7-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41 6 19l1.41-1.41L1.83 12 .41 13.41z"></path>
            </svg>
          )}
          {pending && (
            <svg
              width={"14"}
              height={"14"}
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              style={{
                fill:
                  style === "image"
                    ? theme.palette.onContrast
                    : theme.palette.onRightSecondary,
              }}
            >
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-.22-13h-.06c-.4 0-.72.32-.72.72v4.72c0 .35.18.68.49.86l4.15 2.49c.34.2.78.1.98-.24.21-.34.1-.79-.25-.99l-3.87-2.3V7.72c0-.4-.32-.72-.72-.72z"></path>
            </svg>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageMeta;
