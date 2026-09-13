export const CompletionProgressBar = ({ completionBarTitle, titleClass, numerator, denominator, isPercentageToBeDisplayed}) => {
  let completionRatio = Math.min(100, (Number(numerator)/Number(denominator)) * 100).toFixed(2);
  completionRatio = completionRatio + "%";
  let tasksCompleted = `${numerator} of ${denominator} done`;
  return (
    <div className="max-width-860px">
        <div className="d-flex justify-content-between">
            <span className={`${titleClass ? titleClass : ''}`}>{completionBarTitle}</span>
            <span className="overall-progress color-accent">{isPercentageToBeDisplayed ? completionRatio : tasksCompleted}</span>
        </div>
        <div className="linear-chart" >
            <div className="numerator" style={{width:`${completionRatio}`}} ></div>
        </div>
    </div>
  )
}