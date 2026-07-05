import { useMemo, useState } from 'react';
import { useHotels } from '../context/HotelsContext.jsx';
import SearchDesk from '../components/SearchDesk.jsx';
import HotelEntry from '../components/HotelEntry.jsx';
import Pagination from '../components/Pagination.jsx';
import { LoadingState, ErrorState, EmptyState } from '../components/StateBlocks.jsx';

const PAGE_SIZE = 10;

const DEFAULT_FILTERS = {
  query: '',
  location: '',
  maxPrice: '',
  minRating: '0',
};

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating-desc', label: 'Rating: highest first' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

export default function HotelListPage() {
  const { hotels, status, error, reload } = useHotels();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState('relevance');
  const [page, setPage] = useState(1);

  const locations = useMemo(() => {
    const set = new Set(hotels.map((h) => h.location));
    return [...set].sort();
  }, [hotels]);

  const filtered = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : null;
    const minRating = Number(filters.minRating);

    let list = hotels.filter((hotel) => {
      const matchesQuery =
        !query ||
        hotel.name.toLowerCase().includes(query) ||
        hotel.location.toLowerCase().includes(query);
      const matchesLocation = !filters.location || hotel.location === filters.location;
      const matchesPrice = maxPrice === null || Number(hotel.price) <= maxPrice;
      const matchesRating = hotel.rating >= minRating;

      return matchesQuery && matchesLocation && matchesPrice && matchesRating;
    });

    switch (sortBy) {
      case 'price-asc':
        list = [...list].sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'rating-desc':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return list;
  }, [hotels, filters, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleFiltersChange = (next) => {
    setFilters(next);
    setPage(1);
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    setSortBy('relevance');
    setPage(1);
  };

  const handlePageChange = (next) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SearchDesk filters={filters} onChange={handleFiltersChange} onReset={handleReset} locations={locations} />

      <div className="container">
        {status === 'loading' && <LoadingState />}
        {status === 'error' && <ErrorState message={error} onRetry={reload} />}

        {status === 'ready' && (
          <>
            <div className="results-bar">
              <div className="results-bar__count">
                <strong>{filtered.length}</strong> {filtered.length === 1 ? 'entry' : 'entries'} found
              </div>
              <div className="sort-field">
                <label htmlFor="sort-by">Sort by</label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <EmptyState onReset={handleReset} />
            ) : (
              <>
                <div className="register">
                  {paged.map((hotel, i) => (
                    <HotelEntry key={hotel.id} hotel={hotel} index={(safePage - 1) * PAGE_SIZE + i} />
                  ))}
                </div>
                <Pagination page={safePage} totalPages={totalPages} onPageChange={handlePageChange} />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}