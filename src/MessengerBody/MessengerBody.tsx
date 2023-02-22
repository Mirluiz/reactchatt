import React, {
  FC,
  memo,
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { isText, isImage, isFile } from "../utils/guards";
import { useChat } from "../hooks/useChat";
import { useTheme } from "../hooks/useTheme";
import { scheduler } from "../utils/scheduler";
import { animate, raf } from "../utils/animation";
import { Loader } from "../elements";
import { MessengerBodyProps } from "./MessengerBodyType";
import { MessageProps } from "../@types/message";

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
  } = props;

  const theme = useTheme();
  const { onEdgeReach } = useChat();

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
    if (containerRef && containerRef.current) {
      containerRef.current.addEventListener("scroll", scrolling);
    }

    return () => {
      containerRef?.current?.removeEventListener("scroll", scrolling);
    };
  }, [messages]);

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
        _messages[_messages.length - 1]?.id;

    if (!wasAdded) {
      if (scrollContainerRef.current.scrollTop === 0 && prevHeight.current) {
        scrollContainerRef.current.scrollTop =
          scrollContainerRef.current.scrollHeight - prevHeight.current;
      }

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

  const checkOrder = (
    messages: Array<MessageProps>,
    index: number
  ): "start" | "middle" | "end" | "single" => {
    let ret: "start" | "middle" | "end" | "single";
    let prevMsg: MessageProps | undefined = messages[index - 1],
      currentMsg: MessageProps = messages[index],
      nextMsg: MessageProps | undefined = messages[index + 1];

    if (
      (!prevMsg || prevMsg.position !== currentMsg.position) &&
      (!nextMsg || nextMsg.position !== currentMsg.position)
    ) {
      ret = "single";
    } else if (!nextMsg || nextMsg.position !== currentMsg.position) {
      ret = "end";
    } else if (!prevMsg || prevMsg.position !== currentMsg.position) {
      ret = "start";
    } else {
      ret = "middle";
    }

    return ret;
  };

  const scrolling = () => {
    if (!containerRef.current) return;
    let { current } = containerRef;
    if (current.scrollTop - threshold > 0) {
      endReachedStatus.current = false;
    }
    if (
      !endReachedStatus?.current &&
      current.scrollTop - threshold < 0 &&
      current.scrollHeight > current.clientHeight
    ) {
      endReachedStatus.current = true;
      onEdgeReach();
    }
  };

  return (
    <>
      <div
        style={{
          height: loading ? "30px" : "0",
          width: "100%",
          borderRadius: theme.shape.borderRadius,
          background: theme.palette.background,
          transition: "height 200ms",
          position: "absolute",
          left: 0,
          top: 5,
          right: 0,
          zIndex: 1,
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
      <div className="rc-messages-scroll" ref={scrollContainerRef}>
        <div className="rc-container" ref={containerRef}>
          <div className="rc-list">
            {renderMessages.current.map((message, index) => {
              return (
                <Layer
                  id={message.id}
                  position={message.position}
                  key={message.id}
                >
                  {isText(message) ? (
                    renderTextMessage(
                      message,
                      checkOrder(renderMessages.current, index)
                    )
                  ) : isImage(message) ? (
                    renderImageMessage(
                      message,
                      checkOrder(renderMessages.current, index)
                    )
                  ) : isFile(message) ? (
                    renderFileMessage(
                      message,
                      checkOrder(renderMessages.current, index)
                    )
                  ) : (
                    <></>
                  )}
                </Layer>
              );
            })}
          </div>
        </div>
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
  const { onDblClick } = useChat();

  return (
    <div
      id={`message-${id}`}
      className="rc-layer"
      onDoubleClick={() => {
        onDblClick(id);
      }}
      style={{
        justifyContent: position === "left" ? "flex-start" : "flex-end",
      }}
    >
      {children}
    </div>
  );
};

export default memo(MessengerBody);
