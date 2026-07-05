import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container">
      <div className="state-block">
        <p className="state-block__title">Page not found</p>
        <p>There&rsquo;s no entry at this address.</p>
        <Link to="/" className="btn-primary" style={{ display: 'inline-block' }}>
          Back to the register
        </Link>
      </div>
    </div>
  );
}
