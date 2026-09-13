import { useState, useRef } from "react";
import { NotificationContext } from "todoist/contexts/NotificationContext";

const timers = new Map();

export const NotificationContextProvider = ({ children }) => {
  const [ notificationConfig, setNotificationConfig ] = useState({
    message: '',
    type: ''
  })
  const timeOutRef = useRef(null);
  const success = ({ message }) => {
    clearTimeout(timeOutRef.current);
    let id = new Date();
    setNotificationConfig({
      message,
      type: 'success',
      id
    });

    timeOutRef.current = setTimeout(() => {
      clearNotification(id);
    }, 2000);
  }
  const failure = ({ message }) => {
    let id = new Date();
    clearTimeout(timeOutRef.current);
    setNotificationConfig({
      message,
      type: 'failure',
      id
    });

    timeOutRef.current = setTimeout(() => {
      clearNotification(id);
    }, 2000);
  }
  const clearNotification = (id) => {
    setNotificationConfig((currentNotification) => {
      if (currentNotification?.id === id) {
        return {
          message: '',
          type: ''
        }
      }
      return currentNotification;
    })
  }

  return (
    <NotificationContext
      value={{
        success,
        failure,
        clearNotification,
        notificationConfig
      }}
    >
      {children}
    </NotificationContext>
  );
};
