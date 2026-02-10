import axios from 'axios';

const key = import.meta.env.VITE_RAPIDAPI_KEY;
const host = import.meta.env.VITE_RAPIDAPI_HOST;

export default async function getHotelPhoto(hotelsData) {
  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelPhotos',
    params: {hotel_id: hotelsData.hotel_id},
    headers: {
      'x-rapidapi-key': key,
      'x-rapidapi-host': host
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
