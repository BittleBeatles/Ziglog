// SSE 구독 type
export interface SseNotification {
  id: string;
  senderNickname: string;
  senderProfileUrl: string;
  receiverNickname: string;
  noteId: number;
  title: string;
  isRead: boolean;
  type: string;
  dateTime: string;
}

// Notification List
export interface NotificationList {
  nontificationList: NotificationResult[];
}

export interface NotificationResult {
  id: string;
  senderNickname: string;
  senderProfileUrl: string;
  receiverNickname: string;
  noteId: number;
  title: string;
  isRead: boolean;
  type: string;
  dateTime: string;
}
