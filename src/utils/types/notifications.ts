export enum NotificationSeverity {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}

export interface Notification {
  id: string;
  text: string;
  severity?: NotificationSeverity;
  duration?: number;
}

export interface NotificationMessage {
  text: string;
  severity: NotificationSeverity;
  copyValue?: string;
  duration?: number; // u milisekundama
}

export interface GroupedNotification extends NotificationMessage {
  count: number;
}
