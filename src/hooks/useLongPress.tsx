import React, {
	MouseEventHandler,
	TouchEvent,
	MouseEvent,
	useCallback,
	useRef,
	useState,
} from "react";

const useLongPress = (
	onLongPress: (e: TouchEvent) => void,
	onClick: (e: TouchEvent | MouseEvent) => void,
	{ shouldPreventDefault = true, delay = 300 } = {}
) => {
	const [longPressTriggered, setLongPressTriggered] = useState(false);
	const moved = useRef(false);
	const timeout = useRef<NodeJS.Timeout>();
	const target = useRef<EventTarget>();

	const start = useCallback(
		(event: MouseEvent | TouchEvent) => {
			moved.current = false;

			if (shouldPreventDefault && event.target) {
				event.target.addEventListener("touchend", preventDefault, {
					passive: false,
				});
				if (target.current) target.current = event.target;
			}
			timeout.current = setTimeout(() => {
				if (isTouch(event)) onLongPress(event);
				setLongPressTriggered(true);
			}, delay);
		},
		[onLongPress, delay, shouldPreventDefault]
	);

	const clear = useCallback(
		(event: MouseEvent | TouchEvent, shouldTriggerClick = true) => {
			timeout.current && clearTimeout(timeout.current);
			shouldTriggerClick &&
				!longPressTriggered &&
				!moved.current &&
				onClick(event);
			setLongPressTriggered(false);
			if (shouldPreventDefault && target.current) {
				target.current.removeEventListener("touchend", preventDefault);
			}
		},
		[shouldPreventDefault, onClick, longPressTriggered]
	);

	return {
		onMouseDown: (e: MouseEvent) => start(e),
		onTouchStart: (e: TouchEvent) => start(e),
		onMouseUp: (e: MouseEvent) => clear(e),
		onMouseLeave: (e: MouseEvent) => clear(e, false),
		onTouchEnd: (e: TouchEvent) => clear(e),
		onTouchMove: (e: TouchEvent) => {
			moved.current = true;
			clear(e, false);
		},
	};
};

const isTouch = (event: MouseEvent | TouchEvent): event is TouchEvent => {
	return "touches" in event;
};

const preventDefault = (event: any) => {
	if (!isTouch(event)) return;

	if (event.touches.length < 2 && event.preventDefault && event.cancelable) {
		event.preventDefault();
	}
};

export default useLongPress;
