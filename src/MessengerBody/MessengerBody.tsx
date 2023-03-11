import React, {
  FC,
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { isText, isImage, isFile, isAny } from "../utils/guards";
import { useChat } from "../hooks";
import { useTheme } from "../hooks/useTheme";
import { scheduler } from "../utils/scheduler";
import { animate, raf } from "../utils/animation";
import { Loader, Typing, Typography } from "../elements";
import { MessengerBodyProps } from "./MessengerBodyType";
import { MessageProps } from "../@types/message";
import { MessageSystemDate, MessageWrapper } from "../components";

const ANIMATION_DURATION = 120;

const MessengerBody: FC<
  MessengerBodyProps & { messages: Array<MessageProps> }
> = (props) => {
  const {
    loading,
    messages,
    threshold,
    renderImageMessage,
    renderFileMessage,
    renderTextMessage,
    renderAny,
    typing,
    typingInfo,
  } = props;

  const theme = useTheme();
  const { props: globalProps, getPosition, days } = useChat();
  const { onEdgeReach } = globalProps;

  const endReachedStatus = useRef<boolean>(false);

  const renderMessages = useRef<Array<MessageProps>>([...messages]);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animating = useRef<boolean>(false);
  const animatingTime = useRef<number | null>();

  const prevArr = useRef<Array<MessageProps>>();
  const prevHeight = useRef<number>();

  const [, forceUpdate] = useState<boolean>();

  useEffect(() => {
    if (!containerRef.current || !scrollContainerRef.current) return;

    const { current: scrollC } = scrollContainerRef;

    raf(() => {
      scrollC.scrollTop = scrollC.scrollHeight - scrollC.offsetHeight;
    });
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current || !scrollContainerRef.current) return;

    scheduler.addToStack({
      fn: (data) => {
        runAnimation(data);
      },
      duration: ANIMATION_DURATION + 50,
      data: [...messages],
    });
  }, [messages]);

  const runAnimation = (messages: Array<MessageProps>) => {
    if (!containerRef.current || !scrollContainerRef.current) return;

    prevArr.current = [...renderMessages.current];
    prevHeight.current = scrollContainerRef.current?.scrollHeight;
    renderMessages.current = [...messages];

    forceUpdate((trigger) => !trigger);

    raf(() => {
      preScroll(renderMessages.current);
    });
  };

  const preScroll = (_messages: Array<MessageProps>) => {
    if (!containerRef.current || !scrollContainerRef.current) return;

    const wasAdded =
      prevArr.current &&
      prevArr.current[prevArr.current?.length - 1]?.id !==
        _messages[_messages.length - 1]?.id &&
      _messages.length - prevArr.current?.length === 1;

    if (!wasAdded) {
      if (scrollContainerRef.current.scrollTop === 0 && prevHeight.current) {
        scrollContainerRef.current.scrollTop =
          scrollContainerRef.current.scrollHeight - prevHeight.current;
      }

      return;
    }

    let bottomOffset =
      scrollContainerRef.current.scrollHeight -
      scrollContainerRef.current.scrollTop -
      scrollContainerRef.current.offsetHeight;
    if (bottomOffset > scrollContainerRef.current.offsetHeight * 2) {
      return;
    }

    const layers: NodeListOf<Element> = document.querySelectorAll(".rc-layer");

    //TODO: sometime layers less than messages (in fast click)
    if (layers.length !== _messages.length) {
      raf(() => {
        scrollWithJs();
      });
    } else {
      scrollWithJs();
    }
  };

  const scrollWithJs = () => {
    if (!containerRef.current || !scrollContainerRef.current) return;

    const layers: NodeListOf<Element> = document.querySelectorAll(".rc-layer");
    const list: null | Element = document.querySelector(".rc-list");

    if (layers.length === 0) return;

    const { current: container } = containerRef;
    const { current: scrollContainer } = scrollContainerRef;

    const needForceScroll =
      !list?.clientHeight || list?.clientHeight < scrollContainer!.offsetHeight;

    if (needForceScroll) {
      container.parentElement?.classList.add("force-messages-scroll");

      timeoutRef.current = null;
      timeoutRef.current = setTimeout(() => {
        container.parentElement?.classList.remove("force-messages-scroll");
        timeoutRef.current = null;
      }, ANIMATION_DURATION);

      const lastLayer = layers[layers.length - 1];

      const start = Date.now();
      const marginTop = parseInt(
        window.getComputedStyle(container!)["marginTop"]
      );

      const bottomOffset = lastLayer.clientHeight;
      const topOffset = marginTop - bottomOffset;

      scrollContainer!.scrollTop = topOffset;

      raf(() => {
        animating.current = true;
        animate(() => {
          scrollContainer!.scrollTop = Math.round(
            topOffset +
              bottomOffset *
                Math.min((Date.now() - start) / ANIMATION_DURATION, 1)
          );

          animatingTime.current = ANIMATION_DURATION - (Date.now() - start);

          if (animatingTime.current < 0) {
            animating.current = false;
            animatingTime.current = null;
          }

          return animating.current;
        });
      });
    } else {
      const lastLayer = layers[layers.length - 1];
      container!.parentElement?.classList.remove("force-messages-scroll");

      const bottomOffset = lastLayer.clientHeight;
      const topOffset =
        scrollContainer!.scrollHeight -
        bottomOffset -
        scrollContainer!.offsetHeight;
      const start = Date.now();

      raf(() => {
        animating.current = true;
        animate(() => {
          scrollContainer!.scrollTop =
            topOffset +
            Math.round(
              bottomOffset *
                Math.min((Date.now() - start) / ANIMATION_DURATION, 1)
            );

          if (ANIMATION_DURATION - (Date.now() - start) < 0)
            animating.current = false;

          return animating.current;
        });
      });
    }
  };

  const sameDate = useCallback(
    (prevMsg?: MessageProps, currentMsg?: MessageProps): boolean => {
      let ret: boolean = false;

      if (!prevMsg) {
        // single message - start of conversation
        ret = true;
      } else if (
        prevMsg.date.getFullYear() === currentMsg?.date.getFullYear() &&
        prevMsg.date.getMonth() === currentMsg?.date.getMonth() &&
        prevMsg.date.getDate() === currentMsg?.date.getDate()
      ) {
        ret = true;
      }

      return ret;
    },
    []
  );

  const checkOrder = useCallback(
    (
      messages: Array<MessageProps>,
      index: number
    ): "start" | "middle" | "end" | "single" => {
      let ret: "start" | "middle" | "end" | "single";
      let prevMsg: MessageProps | undefined = messages[index - 1],
        currentMsg: MessageProps = messages[index],
        nextMsg: MessageProps | undefined = messages[index + 1];

      if (!sameDate(currentMsg, nextMsg)) {
        ret = "end";
      } else {
        if (
          prevMsg?.owner.id !== currentMsg?.owner.id ||
          currentMsg?.owner.id !== nextMsg?.owner.id
        ) {
          if (
            prevMsg?.owner.id !== currentMsg?.owner.id &&
            nextMsg?.owner.id !== currentMsg?.owner.id
          ) {
            ret = "single";
          } else if (nextMsg?.owner.id !== currentMsg?.owner.id) {
            ret = "end";
          } else if (prevMsg?.owner.id !== currentMsg?.owner.id) {
            ret = "start";
          } else {
            ret = "middle";
          }
        } else {
          if (
            !prevMsg ||
            (getPosition(prevMsg) !== getPosition(currentMsg) &&
              (!nextMsg || getPosition(nextMsg) !== getPosition(currentMsg)))
          ) {
            ret = "single";
          } else if (
            !nextMsg ||
            getPosition(nextMsg) !== getPosition(currentMsg)
          ) {
            ret = "end";
          } else if (
            !prevMsg ||
            getPosition(prevMsg) !== getPosition(currentMsg)
          ) {
            ret = "start";
          } else {
            ret = "middle";
          }
        }
      }

      return ret;
    },
    []
  );

  return (
    <>
      <div
        className="rc-messages-scroll"
        onScroll={() => {
          if (!scrollContainerRef.current) return;

          let { current } = scrollContainerRef;

          if (current.scrollTop - threshold > 0) {
            endReachedStatus.current = false;
          }

          if (
            !endReachedStatus?.current &&
            current.scrollTop - threshold <= 0 &&
            current.scrollHeight > current.clientHeight
          ) {
            endReachedStatus.current = true;
            onEdgeReach && onEdgeReach();
          }
        }}
        ref={scrollContainerRef}
      >
        <div className="rc-container" ref={containerRef}>
          <div className="rc-list">
            {renderMessages.current.map((message, index) => {
              return (
                <div key={message.id}>
                  {days &&
                    !sameDate(
                      renderMessages.current[index - 1],
                      renderMessages.current[index]
                    ) &&
                    props.date && (
                      <MessageSystemDate
                        date={message.date}
                        format={props.dateFormat}
                      />
                    )}
                  <Layer id={message.id} position={getPosition(message)}>
                    <>
                      {isText(message) &&
                        renderTextMessage(
                          message,
                          checkOrder(renderMessages.current, index)
                        )}
                      {isImage(message) &&
                        renderImageMessage(
                          message,
                          checkOrder(renderMessages.current, index)
                        )}
                      {isFile(message) &&
                        renderFileMessage(
                          message,
                          checkOrder(renderMessages.current, index)
                        )}
                      {isAny(message) &&
                        renderAny(
                          message,
                          checkOrder(renderMessages.current, index)
                        )}
                    </>
                  </Layer>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        style={{
          height: loading ? "30px" : "0",
          width: "100%",
          borderRadius: theme.shape.borderRadius,
          backdropFilter: "blur(1px)",
          transition: "height 200ms",
          paddingTop: loading ? 4 : 0,
          paddingBottom: loading ? 4 : 0,
        }}
      >
        <div
          style={{
            height: "inherit",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "inherit",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Loader />
          </div>
        </div>
      </div>
      <div
        style={{
          height: "8px",
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        {typing && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {typingInfo && (
              <div
                style={{
                  marginRight: 8,
                  height: 8,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography size={"s"} color={theme.palette.onBackground}>
                  {typingInfo}
                </Typography>
              </div>
            )}
            <Typing />
          </div>
        )}
      </div>
    </>
  );
};

const Layer: FC<{
  id: string;
  position: "left" | "right";
  children?: ReactElement;
}> = (props) => {
  const { id, position, children } = props;
  const { onMessageDblClick, onMessageContext } = useChat().props;

  return (
    <div
      id={`message-${id}`}
      className="rc-layer"
      onDoubleClick={(e) => {
        if (onMessageDblClick) {
          onMessageDblClick(id);
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      onContextMenu={(e) => {
        if (onMessageContext) {
          onMessageContext(id);
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      style={{
        justifyContent: position === "left" ? "flex-start" : "flex-end",
      }}
    >
      <MessageWrapper messageId={id}>{children}</MessageWrapper>
    </div>
  );
};

export default memo(MessengerBody);
