// SSE 구독 type
// export interface NotificationEvent extends MessageEvent {
//   data: string;
// }
// export interface NotificationData {
//   type: string;
//   target: {
//     _listeners: Record<string, []>;
//     url: string;
//     readyState: number;
//     withCredentials: boolean;
//     headers: Record<string, string>;
//   };
//   data: string;
//   lastEventId: string;
// }
export interface SseNotification {
  id: string;
  senderNickname: string;
  senderProfileUrl: string;
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
  noteId: number;
  title: string;
  isRead: boolean;
  type: string;
  dateTime: Date;
}
