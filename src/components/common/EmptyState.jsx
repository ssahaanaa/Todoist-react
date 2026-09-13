export const EmptyState = ({title, emptyStateLogoUrl}) => {
  return (
    <div>
      <img src={emptyStateLogoUrl} alt="Empty State Image" />
      <p>{title}</p>
    </div>
  )
}