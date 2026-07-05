import { Link } from 'react-router-dom';
import { useHotels } from '../context/HotelsContext.jsx';

export default function Header() {
  const { hotels, status } = useHotels();

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand">
          <span className="brand__mark">The Imperial</span>
        </Link>
        <div className="header-stat">
          {status === 'ready' ? (
            <>
              <strong>{hotels.length}</strong> properties on file
            </>
          ) : (
            'Loading the ledger...'
          )}
        </div>
      </div>
    </header>
  );
}