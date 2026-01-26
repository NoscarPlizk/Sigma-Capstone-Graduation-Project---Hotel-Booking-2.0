import axios from 'axios';

const key = import.meta.env.VITE_RAPIDAPI_KEY;
const host = import.meta.env.VITE_RAPIDAPI_HOST;

export async function searchDestination({ AllPack }) {
    const options = {
      method: 'GET',
      url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination',
      params: { query: AllPack.search },
      headers: {
        'x-rapidapi-key': key,
        'x-rapidapi-host': host
      }
    };

    let SHDdata = [];

    try {
      const response = await axios.request(options);
      console.log(response.data);
      SHDdata = response.data;
    } catch (error) {
      return console.error(error);
    }
    
    serchHotels({ SHDdata });
  };

export async function serchHotels(SHDdata) {
  const { dest_id, search_type } = SHDdata;

  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
    params: {
      dest_id,
      search_type,
      adults: '1',
      children_age: '0,17',
      room_qty: '1',
      page_number: '1',
      units: 'metric',
      temperature_unit: 'c',
      languagecode: 'en-us',
      currency_code: 'AED',
      location: 'US'
    },
    headers: {
      'x-rapidapi-key': key,
      'x-rapidapi-host': host
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

