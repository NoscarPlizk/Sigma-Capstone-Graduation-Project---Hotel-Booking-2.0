import { useContext } from 'react';
import { BookedList } from '../../../content/data transfer/bookedListContent';

export default function MainHotelInfomation({ 
  BookedHotelNMainInfo,
  objectDateNCalculate
}) {
  const { hotelDetailsData, hotelPhotoData, selectedRooms, checkInNOutDate } = BookedHotelNMainInfo;
  const { start_date, end_date } = checkInNOutDate;

  const { RemakeDate, StarttoEndDateCalculate } = objectDateNCalculate;
  const remake_Date = RemakeDate(start_date, end_date);
  const total_days = StarttoEndDateCalculate(start_date, end_date);

  const { adultPax, childPax } = useContext(BookedList);
  
  const MainIMG = hotelPhotoData[0].url;

  function CountTotalPrice() {
    let all_price_room = 0;
    let currency = '';

    selectedRooms.forEach(baseObj => {
      baseObj.base_select_room.forEach(baseOff => {
        const valueofPrice = baseOff.amount * Number(
          baseOff?.
          spec_room_data?.
          product_price_breakdown?.
          all_inclusive_amount?.
          value?.
          toFixed(2));

        const thecurrency = 
          baseOff?.
          spec_room_data?.
          product_price_breakdown?.
          all_inclusive_amount?.currency

          
        currency = thecurrency;
        all_price_room += valueofPrice;
      });
    });

    const object = {
      currency: currency,
      all_price_room: all_price_room
    }

    return object;
  }

  const RoomNPrice = CountTotalPrice();

  console.log('RoomNPrice:', RoomNPrice);

  return (
    <div className="MainHotelInfomation">
      <img src={MainIMG} className="MainHotelImg" />
      <div className="p-2">
        <div>
          <div className="mt-2 mb-2">
            {hotelDetailsData?.rawData?.accuratePropertyClass
              &&  Array.from({ length: hotelDetailsData?.rawData?.accuratePropertyClass },
                  (_, index) => (
                    <span key={index}>⭐</span>
                  ))
            }
          </div>
          <h4>{hotelDetailsData?.hotel_name ?? ''}</h4>
          <p>
            {hotelDetailsData?.address ?? ''}
            , {hotelDetailsData?.zip} {hotelDetailsData?.city}
            , {hotelDetailsData?.country_trans}
          </p>
        </div>
        <div className="d-flex flex-column gap-2">
          <div className="border rounded-2 p-3">
            <h5>The Booking Details</h5>
            <div className="d-flex gap-5">
              <div>
                <p>Check In</p>
                {remake_Date.start_date}
              </div>
              <div>
                <p>Check Out</p>
                {remake_Date.end_date}         
              </div>
              <div>
                <p>Total Day</p>
                {total_days} Days
              </div>
            </div>
            <hr/>
              <div>
                <p>Living Guest For:</p>
                <div className="d-flex gap-2">
                  <div>
                    {adultPax} Adults
                  </div>
                  <div>
                    {childPax} Childs
                  </div>
                </div>    
              </div>
            <hr/>
            <div>
              <p><strong>Our Selected Plan for {total_days} Days</strong></p>
              {selectedRooms.map((baseObj, index) => {
                const MainRoomName = baseObj.base_room_name;
                const TotalRoomAmount = baseObj.base_select_room.reduce(
                  (sum, room) => sum + room.amount, 0
                );

                return (
                  <div key={index} className="d-flex gap-2">
                    <div>{TotalRoomAmount}</div>
                    <div>X</div>
                    <div>{MainRoomName}</div>
                  </div>
                )
                })
              }
            </div>
            <hr/>
            <div>
              <p><strong>The Price Summary</strong></p>
              <div className="d-flex justify-content-between">
                  <h3>Price: </h3>
                <h3>{RoomNPrice.currency} {RoomNPrice.all_price_room}</h3>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}