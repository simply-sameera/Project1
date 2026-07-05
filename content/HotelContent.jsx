import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { fetchHotels } from '../api/hotelApi';

const HotelsContext = createContext(null);

export function HotelsProvider({ children }) {
  const [hotels, setHotels] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const data = await fetchHotels();
      setHotels(data);
      setStatus('ready');
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching hotels.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const getHotelById = useCallback(
    (id) => hotels.find((hotel) => String(hotel.id) === String(id)),
    [hotels]
  );

  const value = useMemo(
    () => ({ hotels, status, error, reload: load, getHotelById }),
    [hotels, status, error, load, getHotelById]
  );

  return <HotelsContext.Provider value={value}>{children}</HotelsContext.Provider>;
}

export function useHotels() {
  const ctx = useContext(HotelsContext);
  if (!ctx) {
    throw new Error('useHotels must be used within a HotelsProvider');
  }
  return ctx;
}