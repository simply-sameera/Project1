import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useHotels } from '../context/HotelsContext.jsx';
import RatingStamp from '../components/RatingStamps.jsx';
import { LoadingState, ErrorState } from '../components/StateBlocks.jsx';

export default function HotelDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { status, error, reload, getHotelById } = useHotels();
  const [activePhoto, setActivePhoto] = useState(0);

  if (status === 'loading') return <LoadingState />;
  if (status === 'error') return <ErrorState message={error} onRetry={reload} />;

  const hotel = getHotelById(id);

  if (!hotel) {
    return (
      <div className="container">
        <div className="state-block">
          <p className="state-block__title">This entry isn&rsquo;t in the register</p>
          <p>We couldn&rsquo;t find a hotel with that ID.</p>
          <button type="button" className="btn-primary" onClick={() => navigate('/')}>
            Back to the register
          </button>
        </div>
      </div>
    );
  }

  const photos = hotel.photos && hotel.photos.length ? hotel.photos : [hotel.thumbnail];
  const price = Number(hotel.price);

  return (
    <>
      <div className="detail-hero">
        <div className="container">
          <Link to="/" className="detail-back">
            &larr; Back to the register
          </Link>
          <div className="detail-hero__top">
            <div>
              <div className="detail-hero__location">{hotel.location}, India</div>
              <h1 className="detail-hero__title">{hotel.name}</h1>
            </div>
            <RatingStamp rating={hotel.rating} size="lg" />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="gallery">
          <div className="gallery__main">
            <img src={photos[activePhoto]} alt={`${hotel.name} — photo ${activePhoto + 1}`} />
          </div>
          {photos.slice(0, 6).map((photo, i) => (
            <button
              key={photo + i}
              type="button"
              className={`gallery__thumb${i === activePhoto ? ' is-active' : ''}`}
              onClick={() => setActivePhoto(i)}
              aria-label={`Show photo ${i + 1}`}
            >
              <img src={photo} alt="" />
            </button>
          ))}
        </div>

        <div className="detail-body">
          <div className="detail-section">
            <div className="detail-section__label">About this stay</div>
            <p>{hotel.description}</p>
          </div>

          <aside className="ledger-card">
            <div className="ledger-card__price">
              &#8377;{price.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              <span> / night</span>
            </div>
            <div className="ledger-card__row">
              <span>Location</span>
              <strong>{hotel.location}</strong>
            </div>
            <div className="ledger-card__row">
              <span>Rating</span>
              <strong>{hotel.rating.toFixed(1)} / 5</strong>
            </div>
            <div className="ledger-card__row">
              <span>Register No.</span>
              <strong>#{hotel.id}</strong>
            </div>
            <button 
              type="button" 
              className="btn-primary" 
              onClick={() => window.alert('This is a demo project — booking is not connected to a live reservation system.')}
            >
              Reserve this room
            </button>
          </aside>
        </div>
      </div>
    </>
  );
}