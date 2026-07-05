export default function SearchDesk({ filters, onChange, onReset, locations }) {
  const handleField = (field) => (event) => {
    onChange({ ...filters, [field]: event.target.value });
  };

  return (
    <div className="desk">
      <div className="container">
        <p className="desk__intro">
          <strong>Search the register.</strong> Filter 500 hotels across India by name, city,
          price, and rating.
        </p>
        <div className="search-row">
          <div className="field">
            <label htmlFor="search-query">Hotel or city</label>
            <input
              id="search-query"
              type="text"
              placeholder="e.g. Regal Crescent, Mumbai..."
              value={filters.query}
              onChange={handleField('query')}
            />
          </div>

          <div className="field">
            <label htmlFor="search-location">Location</label>
            <select id="search-location" value={filters.location} onChange={handleField('location')}>
              <option value="">All cities</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="search-price">Max price / night</label>
            <input
              id="search-price"
              type="number"
              min="0"
              step="500"
              placeholder="Any"
              value={filters.maxPrice}
              onChange={handleField('maxPrice')}
            />
          </div>

          <div className="field">
            <label htmlFor="search-rating">Min rating</label>
            <select id="search-rating" value={filters.minRating} onChange={handleField('minRating')}>
              <option value="0">Any rating</option>
              <option value="3">3.0+</option>
              <option value="3.5">3.5+</option>
              <option value="4">4.0+</option>
              <option value="4.5">4.5+</option>
            </select>
          </div>

          <div className="field field--reset">
            <button type="button" className="btn-reset" onClick={onReset}>
              Clear filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}