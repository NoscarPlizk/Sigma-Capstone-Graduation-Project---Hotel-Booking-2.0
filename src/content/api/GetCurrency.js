import axios from 'axios';

const key = import.meta.env.VITE_RAPIDAPI_KEY;
const host = import.meta.env.VITE_RAPIDAPI_HOST;

export default async function GetCurrency() {
  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/meta/getCurrency',
    headers: {
      'x-rapidapi-key': key,
      'x-rapidapi-host': host,
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios.request(options);
    console.log("GetCurrency:", response.data);
    
    const returning = response.data;
    return returning;
  } catch (error) {
    console.error(error);
  }
}