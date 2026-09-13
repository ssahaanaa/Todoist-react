export const EmptyState = ({title, emptyStateLogoUrl}) => {
  return (
    <div className="empty-state">
      <img src={emptyStateLogoUrl} alt="Empty State Image" />
      <p>{title}</p>
    </div>
  )
}