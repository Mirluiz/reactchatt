import React, { useContext } from "react";

export const useChat = () => {
	return useContext(ChatContext);
};

export const ChatContext = React.createContext<{
	icon: boolean;
	typing: boolean;
	onClick: (id: string) => void;
	onLongClick: (id: string) => void;
	onDblClick: (id: string) => void;
	onPulled: (id: string) => void;
	onItemClick: (message: string, id: string) => void;
	onEdgeReach: () => void;
}>({
	icon: false,
	typing: false,
	onClick: (id) => {},
	onLongClick: (id) => {},
	onDblClick: (id) => {},
	onPulled: (id) => {},
	onItemClick: (message, id) => {},
	onEdgeReach: () => {},
});

export default useChat;
