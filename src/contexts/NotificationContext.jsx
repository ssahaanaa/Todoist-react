import { createContext } from "react";

const defaultOptions = {
  success: () => {},
  failure: () => {},
  clearNotification: () => {},
  notificationConfig: {}
};

export const NotificationContext = createContext({defaultOptions});