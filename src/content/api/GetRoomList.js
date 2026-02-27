import axios from 'axios';

const key = import.meta.env.VITE_RAPIDAPI_KEY;
const host = import.meta.env.VITE_RAPIDAPI_HOST;

export default async function getRoomList(
  hotelsData, start_date, end_date, adult_pax, childAge, roomAmount 
) {
  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/getRoomList',
    params: {
      hotel_id: hotelsData.hotel_id,
      arrival_date: start_date,
      departure_date: end_date,
      adults: adult_pax,
      children_age: childAge,
      room_qty: roomAmount,
      units: 'metric',
      temperature_unit: 'c',
      languagecode: 'en-us',
      currency_code: 'EUR',
      location: 'US'
    },
    headers: {
      'x-rapidapi-key': key,
      'x-rapidapi-host': host
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data)
    if (response.data !== undefined) return response.data;
  } catch (error) {
    console.error(error);
  }
}
