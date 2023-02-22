export const raf = (callback: () => void) => {
	requestAnimationFrame(() => {
		callback();
	});
};

export const animate = (tick: () => boolean) => {
	if (tick()) {
		raf(() => {
			animate(tick);
		});
	}
};
