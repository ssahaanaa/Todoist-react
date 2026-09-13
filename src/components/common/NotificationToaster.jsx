import { CloseIcon } from "todoist/components/common/CloseIcon";
import errorIconUrl from "todoist/assets/error.svg";
import successIconUrl from "todoist/assets/success.svg";


export const NotificationToaster = ({ notificationConfig, clearNotification}) => {
  let  { message, type, id } = notificationConfig;
  return (
    (
      <div className={`notification-wrapper ${type}`}>
        <div className="d-flex items-center gap-15px">
          <img
            src={type === 'success' ? successIconUrl : errorIconUrl}
          />
          <span>{message}</span>
        </div>
        <button className="p-0 m-0 bg-transparent" onClick={() => clearNotification(id)}>
          <CloseIcon className="close-option cursor-pointer"/>
        </button>
      </div>
    )
  )
}