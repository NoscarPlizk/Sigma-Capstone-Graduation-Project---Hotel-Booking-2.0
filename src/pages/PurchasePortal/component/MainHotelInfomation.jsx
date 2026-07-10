import { useContext } from "react";
import { BookedList } from "../../../content/data transfer/bookedListContent";

function formatPrice(value) {
  const numericValue = Number(value ?? 0);
  return Number.isFinite(numericValue) ? numericValue.toFixed(2) : "0.00";
}

export default function MainHotelInfomation({
  BookedHotelNMainInfo,
  objectDateNCalculate,
  bookingRegistry,
}) {
  const {
    hotelDetailsData,
    hotelPhotoData,
    selectedRooms,
    checkInNOutDate,
  } = BookedHotelNMainInfo;

  const select_room_offers =
    bookingRegistry?.main_hotel_booked?.select_room_offers ?? [];

  const { start_date, end_date } = checkInNOutDate;
  const { RemakeDate, StarttoEndDateCalculate } = objectDateNCalculate;
  const remakeDate = RemakeDate(start_date, end_date);
  const totalDays = StarttoEndDateCalculate(start_date, end_date);
  const { adultPax, childPax } = useContext(BookedList);

  const mainImage =
    hotelPhotoData?.[0]?.url ??
    select_room_offers?.[0]?.base_main_photos ??
    "";

  function countTotalPrice() {
    let allPriceRoom = 0;
    let currency = "";

    selectedRooms.forEach((baseObj) => {
      baseObj.base_select_room.forEach((baseOff) => {
        const valueOfPrice =
          baseOff.amount *
          Number(
            baseOff?.spec_room_data?.product_price_breakdown?.all_inclusive_amount?.value?.toFixed(
              2
            )
          );

        currency =
          baseOff?.spec_room_data?.product_price_breakdown?.all_inclusive_amount
            ?.currency ?? currency;
        allPriceRoom += valueOfPrice;
      });
    });

    return {
      currency,
      all_price_room: allPriceRoom.toFixed(2),
    };
  }

  const roomAndPrice = countTotalPrice();
  const starCount = Number(hotelDetailsData?.rawData?.accuratePropertyClass ?? 0);
  const totalSelectedRooms = select_room_offers.reduce(
    (sum, roomGroup) => sum + (roomGroup?.base_select_room?.length ?? 0),
    0
  );

  return (
    <article className="MainHotelInfomation">
      {mainImage ? (
        <img
          src={mainImage}
          alt={
            hotelDetailsData?.hotel_name
              ? `${hotelDetailsData.hotel_name} preview`
              : "Hotel preview"
          }
          className="MainHotelImg"
        />
      ) : null}

      <div className="purchase-summary-body">
        <div className="purchase-summary-header">
          {starCount > 0 ? (
            <div
              className="purchase-star-row"
              aria-label={`${starCount} star property`}
            >
              {Array.from({ length: starCount }, (_, index) => (
                <span key={index} className="purchase-star">
                  ★
                </span>
              ))}
            </div>
          ) : null}

          <div className="purchase-summary-title-group">
            <h3>{hotelDetailsData?.hotel_name ?? ""}</h3>
            <p className="purchase-summary-address">
              {hotelDetailsData?.address ?? ""}
              {hotelDetailsData?.zip ? `, ${hotelDetailsData.zip}` : ""}
              {hotelDetailsData?.city ? ` ${hotelDetailsData.city}` : ""}
              {hotelDetailsData?.country_trans
                ? `, ${hotelDetailsData.country_trans}`
                : ""}
            </p>
          </div>
        </div>

        <div className="purchase-summary-grid">
          <div className="purchase-summary-metric">
            <span>Check-in</span>
            <strong>{remakeDate.start_date}</strong>
          </div>
          <div className="purchase-summary-metric">
            <span>Check-out</span>
            <strong>{remakeDate.end_date}</strong>
          </div>
          <div className="purchase-summary-metric">
            <span>Stay length</span>
            <strong>
              {totalDays} night{totalDays > 1 ? "s" : ""}
            </strong>
          </div>
          <div className="purchase-summary-metric">
            <span>Guests</span>
            <strong>
              {adultPax} adult{adultPax > 1 ? "s" : ""}
              {childPax > 0
                ? `, ${childPax} child${childPax > 1 ? "ren" : ""}`
                : ""}
            </strong>
          </div>
        </div>

        <section className="purchase-summary-section">
          <div className="purchase-summary-section-head">
            <h4>Your selected plan</h4>
            <span className="purchase-pill">
              {totalSelectedRooms} room selection
              {totalSelectedRooms > 1 ? "s" : ""}
            </span>
          </div>

          <div className="purchase-summary-room-list">
            {select_room_offers.map((rooms, index) => {
              const roomLabel =
                rooms?.base_select_room_description?.total_same_rooms_name ??
                rooms?.base_room_name ??
                "Room option";

              const roomCount = rooms?.base_select_room?.length ?? 0;

              return (
                <div
                  key={`${roomLabel}-${index}`}
                  className="purchase-summary-room-item"
                >
                  <div>
                    <strong>{roomLabel}</strong>
                    <p>
                      {roomCount} guest assignment
                      {roomCount > 1 ? "s" : ""}
                    </p>
                  </div>
                  <span>
                    {roomCount} room{roomCount > 1 ? "s" : ""}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="purchase-summary-total-card">
          <div>
            <p>Total payable</p>
            <strong>
              {roomAndPrice.currency} {formatPrice(roomAndPrice.all_price_room)}
            </strong>
          </div>
          <span>Taxes and fees included</span>
        </section>
      </div>
    </article>
  );
}
