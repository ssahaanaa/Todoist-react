import errorInformationUrl from "todoist/assets/error-information.svg";

export const InlineErrorDisplay = ({errors, fieldKey}) => {
  const errorInformation  = errors[fieldKey] || '';
  return (
    <>
      {errorInformation.length > 0 && (<span className="error-wrapper">
        <img src={errorInformationUrl} alt="error-icon" />
        <span className="error-display">{errorInformation}</span>
      </span>)}
    </>
  )
}