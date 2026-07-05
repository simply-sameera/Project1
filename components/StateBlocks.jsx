export function LoadingState() {
  return (
    <div className="state-block">
      <div className="spinner" aria-hidden="true" />
      <p>Opening the register&hellip;</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state-block">
      <p className="state-block__title">The register won&rsquo;t open</p>
      <p>{message || 'The hotel API did not respond. Check your connection and try again.'}</p>
      <button type="button" className="btn-primary" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}

export function EmptyState({ onReset }) {
  return (
    <div className="state-block">
      <p className="state-block__title">No entries match</p>
      <p>Nothing in the register fits those filters. Try widening your search.</p>
      <button type="button" className="btn-primary" onClick={onReset}>
        Clear filters
      </button>
    </div>
  );
}