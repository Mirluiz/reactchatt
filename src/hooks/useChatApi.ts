import { animate, raf } from "../utils/animation";

export const useChatApi = () => {
  const ANIMATION_TIME = 700;
  const scrollTo: (id: string, highlight?: boolean) => void = (
    id,
    highlight = true
  ) => {
    let container = document.querySelector<HTMLElement>(".rc-messages-scroll");
    let message = document.querySelector<HTMLElement>("#message-" + id);

    if (!container || !message) return;

    let isVb = isVisible(message, container);

    if (message && !isVb) {
      let start = Date.now();
      let animating = true;
      raf(() => {
        let top = container!.scrollTop;
        let diff =
          message!.getBoundingClientRect().top -
          container!.getBoundingClientRect().top -
          container!.offsetHeight / 2;

        animate(() => {
          container!.scrollTop = Math.round(
            top + diff * Math.min((Date.now() - start) / ANIMATION_TIME, 1)
          );

          if (ANIMATION_TIME - (Date.now() - start) < 0) animating = false;

          return animating;
        });
      });
    }

    setTimeout(
      () => {
        if (highlight) {
          highlightMessage(id);
        }
      },
      isVb ? 0 : 800
    );
  };

  const highlightMessage: (id: string) => void = (id: string) => {
    let message = document.querySelector<HTMLElement>("#message-" + id);

    if (!message) return;

    message.classList.add("highlight");

    setTimeout(() => {
      message!.classList.remove("highlight");
    }, ANIMATION_TIME);
  };

  return {
    scrollTo: (id: string) => scrollTo(id),
    highlightMessage: (id: string) => highlightMessage(id),
  };
};

const isVisible = (element: HTMLElement, scrollBody: HTMLElement) => {
  let top =
    element.getBoundingClientRect().top >=
    scrollBody!.getBoundingClientRect().top;
  let bot =
    element.getBoundingClientRect().bottom + element.clientHeight * 2 <=
    scrollBody.scrollTop +
      scrollBody.offsetHeight -
      scrollBody!.getBoundingClientRect().top;
  const ret = top && bot;

  return ret;
};
