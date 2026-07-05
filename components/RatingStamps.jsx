function tierFor(rating) {
  if (rating >= 4.2) return 'high';
  if (rating >= 3) return 'mid';
  return 'low';
}

export default function RatingStamp({ rating, size = 'md' }) {
  const tier = tierFor(rating);
  const className = `stamp${size === 'lg' ? ' stamp--lg' : ''}`;

  return (
    <div className={className} data-tier={tier} role="img" aria-label={`Rated ${rating} out of 5`}>
      <span className="stamp__value">{rating.toFixed(1)}</span>
      <span className="stamp__label">/ 5</span>
    </div>
  );
}