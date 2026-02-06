import axios from 'axios'; 

const key = import.meta.env.VITE_RAPIDAPI_KEY;
const host = import.meta.env.VITE_RAPIDAPI_HOST;

export default async function searchHotelDestination(search) {

  if (!search?.trim()) return;

  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination',
    params: { query: search },
    headers: {
      'x-rapidapi-key': key,
      'x-rapidapi-host': host,
    }
  };

  try {
    const response = await axios.request(options);

    const list = response?.data?.data;
    if ( !Array.isArray(list) || list.length === 0 ) return null;
    return list[0];

  } catch (error) {
    console.log("status:", error?.response?.status);
    console.log("data:", error?.response?.data);
    console.log("headers:", error?.response?.headers);
    console.error(error);
  }
};


