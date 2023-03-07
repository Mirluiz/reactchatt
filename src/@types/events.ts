export type MessengerEvents = {
  onMessageSystemDateClick?: (date: Date) => void;
  onMessageClick?: (id: string) => void;
  onMessageDblClick?: (id: string) => void;
  onMessageItemClick?: (message: string, id: string | false) => void;
  onMessageLongTouch?: (id: string) => void;
  onPulled?: (id: string) => void;
  onMessageContext?: (id: string, messageItself?: boolean) => void;
  onReplyMessageClick?: (messageId: string, parentId?: string) => void;
  onEdgeReach?: () => void;
};
