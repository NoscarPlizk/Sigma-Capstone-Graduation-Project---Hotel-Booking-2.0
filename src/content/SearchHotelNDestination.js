import axios from 'axios';

const key = import.meta.env.VITE_RAPIDAPI_KEY;
const host = import.meta.env.VITE_RAPIDAPI_HOST;

export default async function searchHotelLocalnInfo(
  search, setSearchData, adultPax, childAge, 
  initialDate, dueDate, roomAmount 
) {

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

  let SHDdata = {};

  try {
    const response = await axios.request(options);
    console.log(response.data);
    SHDdata = response.data;
  } catch (error) {
    return console.error(error);
  }
  
  serchHotels( 
    SHDdata, adultPax, childAge, initialDate, dueDate, roomAmount, setSearchData
  );
};


async function serchHotels( 
  SHDdata, adultPax, childAge, initialDate, dueDate, roomAmount, setSearchData
) {
  const { dest_id, search_type } = SHDdata;

  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
    params: {
      dest_id: dest_id,
      search_type: search_type,
      arrival_date: initialDate,
      departure_date: dueDate,
      adults: adultPax,
      children_age: childAge,
      room_qty: roomAmount,
      page_number: '1',
      units: 'metric',
      temperature_unit: 'c',
      languagecode: 'en-us',
      currency_code: 'AED',
      location: 'US'
    },
    headers: {
      'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
      'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
    }
  };

  try {
    const response = await axios.request(options);
    const check = response.data;

    if (!check?.success) {
      console.warn("Backend Fetch Error:", check?.error || check?.message);
      return;
    }

    console.log(response.data);
    setSearchData(response.data); 
  } catch (error) {
    console.error(error);
  }
};




// export async function searchDestination({ AllPack }) {
//     const options = {
//       method: 'GET',
//       url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination',
//       params: { query: AllPack.search },
//       headers: {
//         'x-rapidapi-key': key,
//         'x-rapidapi-host': host
//       }
//     };

//     let SHDdata = [];

//     try {
//       const response = await axios.request(options);
//       console.log(response.data);
//       SHDdata = response.data;
//     } catch (error) {
//       return console.error(error);
//     }
    
//     serchHotels({ SHDdata });
//   };

// export async function serchHotels(SHDdata) {
//   const { dest_id, search_type } = SHDdata;

//   const options = {
//     method: 'GET',
//     url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
//     params: {
//       dest_id,
//       search_type,
//       adults: '1',
//       children_age: '0,17',
//       room_qty: '1',
//       page_number: '1',
//       units: 'metric',
//       temperature_unit: 'c',
//       languagecode: 'en-us',
//       currency_code: 'AED',
//       location: 'US'
//     },
//     headers: {
//       'x-rapidapi-key': key,
//       'x-rapidapi-host': host
//     }
//   };

//   try {
//     const response = await axios.request(options);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };