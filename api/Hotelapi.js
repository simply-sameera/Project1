const BASE_URL = 'https://demohotelsapi.pythonanywhere.com';

/**
 *
 * @returns {Promise<Array<{
 *   id: number,
 *   name: string,
 *   price: string,
 *   thumbnail: string,
 *   rating: number,
 *   location: string,
 *   description: string,
 *   photos: string[]
 * }>>}
 */
export async function fetchHotels() {
  const response = await fetch(`${BASE_URL}/hotels/`);

  if (!response.ok) {
    throw new Error(`Hotel API responded with status ${response.status}`);
  }

  const payload = await response.json();

  if (payload.status !== 200 || !Array.isArray(payload.data)) {
    throw new Error(payload.message || 'Unexpected response shape from hotel API');
  }

  return payload.data;
}