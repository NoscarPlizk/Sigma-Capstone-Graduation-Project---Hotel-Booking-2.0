import axios from 'axios';

const key = import.meta.env.VITE_RAPIDAPI_KEY;
const host = import.meta.env.VITE_RAPIDAPI_HOST;

export default async function searchHotels( 
  hotdesdata, adultPax, childAge, initialDate, dueDate, roomAmount,
) {
  console.log({ hotdesdata: hotdesdata });
  
  if ( !hotdesdata?.dest_id || !hotdesdata?.dest_type ) return null;
  const allChildAge = String(childAge)
  console.log({ allChildAge: allChildAge });

  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
    params: {
      dest_id: hotdesdata.dest_id,
      search_type: hotdesdata.dest_type,
      arrival_date: initialDate,
      departure_date: dueDate,
      adults: adultPax,
      children_age: allChildAge,
      room_qty: roomAmount,
      page_number: '1',
      units: 'metric',
      temperature_unit: 'c',
      languagecode: 'en-us',
      currency_code: 'AED',
      location: 'US'
    },
    headers: {
      'x-rapidapi-key': key,
      'x-rapidapi-host': host,
    }
  };

  try {
    const response = await axios.request(options);

    if (response?.data === undefined) {
      console.warn("Backend Fetch Error:", 
        response?.data.error || response?.data.message
      );
      return;
    }

    console.log(response.data);
    return response.data; 
  } catch (error) {
    console.error(error);
  }
};
