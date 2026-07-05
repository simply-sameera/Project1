import React from 'react';

function getPageNumbers(current, total) {
  const pages = new Set([1, total, current, current - 1, current + 1]);
  return [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
}

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <nav className="pagination" aria-label="Hotel list pages">
      <button
        type="button"
        className="page-btn"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        &lsaquo;
      </button>

      {pageNumbers.map((num, i) => {
        const prev = pageNumbers[i - 1];
        const showEllipsis = prev !== undefined && num - prev > 1;

        return (
          <React.Fragment key={num}>
            {showEllipsis && <span className="page-ellipsis" aria-hidden="true">&hellip;</span>}
            <button
              type="button"
              className="page-btn"
              aria-current={num === page}
              onClick={() => onPageChange(num)}
            >
              {num}
            </button>
          </React.Fragment>
        );
      })}

      <button
        type="button"
        className="page-btn"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        &rsaquo;
      </button>
    </nav>
  );
}
