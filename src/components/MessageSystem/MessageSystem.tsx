import React, { ChangeEventHandler, FC, useEffect } from "react";

type Props = {
	date: string;
};

const Message: FC<Props> = ({ date }) => {
	return (
		<div
			className="message"
			// style={{ height: "inherit", marginTop: 2 }}
		/>
	);
};

export default Message;
