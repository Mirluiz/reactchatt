export const getFileExtIcon = (name: string): string => {
	let extension = name.split(".");
	let ret;

	switch (extension[extension.length - 1]) {
		case "xls":
		case "xlsx":
			ret = "xlsx.svg";
			break;
		case "pdf":
			ret = "pdf.svg";
			break;
		default:
			ret = "file.svg";
			break;
	}

	return ret;
};

export const getMeta = (
	url: string,
	callBack: (
		info: null | { width: number; height: number },
		err?: string | Event
	) => void
) => {
	const img = new Image();
	img.onload = () =>
		callBack({
			height: img.height,
			width: img.width,
		});
	img.onerror = (err) => callBack(null, err);
	img.src = url;
};

type Required<T> = {
	[P in keyof T]-?: T[P];
};

export const uuid4 = () => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};
