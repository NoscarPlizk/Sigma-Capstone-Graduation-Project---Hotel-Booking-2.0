import { Container, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { storeBookRoom, clearBookedRooms } from "./Redux/StoreBookingRoom/BookingSlice_ViewHotel.js";
import "./ViewHotel.css";

import { BookedList } from "../../content/data transfer/bookedListContent";
import getHotelDetails from "../../content/api/GetHotelDetails";
import getHotelPhoto from "../../content/api/GetHotelPhoto";
import getRoomList from "../../content/api/GetRoomList";
import getDescriptionAndInfo from "../../content/api/GetDescriptionAndInfo";

import * as Falcons from "react-icons/fa";
import { FaHeart, FaShare } from "react-icons/fa6";

import MainPurchasePortal from "../PurchasePortal/MainPurchasePortal.jsx";

import AvaliableFacilitiesLabel from "./component/AvaliableFacilitiesLabel.jsx";
import SelectMenu from "../../component/SelectMenu/SelectMenu.jsx";
import DescriptionDetails from "./component/DescriptionDetails.jsx";
import HotelGallery from "./component/HotelGallery.jsx";
import PerksListColumn from "./component/PerksListRelatedFunction/PerksListColumn.jsx";
import ConvertToFarKey from "./component/Sub-Function/ConvertToFarKey.js";
import AdultorChildIcon from "./component/AdultorChildIcon.jsx";

function formatPrice(value) {
  return Number.isFinite(Number(value)) ? Number(value).toFixed(2) : "0.00";
}

function HighlightsPill({ iconKey, label }) {
  const farKey = ConvertToFarKey(iconKey);
  const Icon = Falcons[farKey];

  if (!Icon) {
    return <span className="highlights-pill">{label}</span>;
  }

  return (
    <span className="highlights-pill">
      <Icon className="pill-icon" aria-hidden="true" />
      {label}
    </span>
  );
}

function ExpandableText({ text, collapsedLines = 4, className = "" }) {
  const [expanded, setExpanded] = useState(false);
  const safeText = typeof text === "string" ? text.trim() : "";
  const shouldCollapse = safeText.length > 240 || safeText.split("\n").length > 2;

  if (!safeText) {
    return null;
  }

  return (
    <div className="vh-expandable-block">
      <div
        className={`vh-expandable-copy ${expanded ? "is-expanded" : "is-collapsed"} ${className}`.trim()}
        style={!expanded && shouldCollapse ? { WebkitLineClamp: collapsedLines } : undefined}
      >
        {safeText}
      </div>
      {shouldCollapse ? (
        <button
          type="button"
          className="vh-inline-button"
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      ) : null}
    </div>
  );
}

function ExpandableChipList({
  items,
  collapsedCount = 8,
  className = "",
  renderItem,
}) {
  const [expanded, setExpanded] = useState(false);
  const safeItems = Array.isArray(items) ? items.filter(Boolean) : [];
  const shouldCollapse = safeItems.length > collapsedCount;
  const visibleItems = expanded || !shouldCollapse ? safeItems : safeItems.slice(0, collapsedCount);

  if (safeItems.length === 0) {
    return null;
  }

  return (
    <div className="vh-expandable-block">
      <div className={className}>
        {visibleItems.map((item, index) => renderItem(item, index))}
      </div>
      {shouldCollapse ? (
        <button
          type="button"
          className="vh-inline-button"
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? "Show less" : `Show all ${safeItems.length}`}
        </button>
      ) : null}
    </div>
  );
}

function PurchaseEndPoint({ saveHouse, currency, setOpenModalPurchasePortal }) {
  const totals = saveHouse.reduce(
    (summary, baseObj) => {
      (baseObj?.base_select_room ?? []).forEach((baseOff) => {
        const amount = Number(baseOff?.amount ?? 0);
        const price = Number(
          baseOff?.spec_room_data?.product_price_breakdown?.all_inclusive_amount?.value ?? 0
        );

        summary.roomCount += amount;
        summary.totalPrice += amount * price;
      });

      return summary;
    },
    { roomCount: 0, totalPrice: 0 }
  );

  return (
    <div className="vh-summary-card">
      <div className="vh-summary-head">
        <p className="vh-eyebrow">Booking summary</p>
        <h4>Your selection</h4>
      </div>

      {totals.roomCount > 0 ? (
        <>
          <div className="vh-summary-total">
            <span>{totals.roomCount} room selections</span>
            <strong>
              {currency} {formatPrice(totals.totalPrice)}
            </strong>
          </div>
          <button
            type="button"
            className="finalpurchase_Button"
            onClick={() => setOpenModalPurchasePortal(true)}
          >
            Reserve now
          </button>
        </>
      ) : (
        <div className="vh-summary-empty">
          Choose room offers below to build your reservation summary.
        </div>
      )}

      <div className="vh-summary-list">
        {saveHouse.map((baseObj, index) => (
          <div key={`${baseObj?.base_room_name ?? "room"}-${index}`} className="ep-mainroomframe">
            <div className="ep-offroomtitle">
              <img
                src={baseObj?.base_main_photos ?? ""}
                alt={baseObj?.base_room_name ? `${baseObj.base_room_name} preview` : "Selected room"}
                width="64"
                height="64"
              />
              <div>
                <h5>{baseObj?.base_room_name ?? "Room option"}</h5>
                <p>{baseObj?.base_select_room?.length ?? 0} offer(s) selected</p>
              </div>
            </div>

            <div>
              {(baseObj?.base_select_room ?? []).map((baseOff, offerIndex) => {
                const roomData = baseOff?.spec_room_data ?? {};
                const priceBreakdown = roomData?.product_price_breakdown ?? {};
                const allInclusive = priceBreakdown?.all_inclusive_amount ?? {};
                const totalForOffer = Number(baseOff?.amount ?? 0) * Number(allInclusive?.value ?? 0);

                return (
                  <div key={offerIndex} className="ep-offroomlist">
                    <div className="pax-co">
                      <AdultorChildIcon
                        amount_adults={roomData?.nr_adults ?? 0}
                        amount_child={roomData?.nr_children ?? 0}
                      />
                    </div>
                    <div className="room_amt-co">{baseOff?.amount ?? 0} x room</div>
                    <div className="price-co">
                      {allInclusive?.currency ?? currency} {formatPrice(totalForOffer)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HotelRoomType({ roomList, childAgeString, currency, setOpenModalPurchasePortal }) {
  const dispatch = useDispatch();
  const saveHouse = useSelector((state) => state.viewhotel_selectbooking.saveHouse);

  if (!roomList) {
    return <div className="vh-loading-card">Loading available rooms...</div>;
  }

  const rooms = roomList?.data?.block;
  const roomsData = roomList?.data?.rooms;

  function processingAllOption(allRooms, mappedRoomsData) {
    if (!allRooms || !mappedRoomsData) {
      return [];
    }

    const roomMap = new Map();

    for (const room of allRooms) {
      const roomId = room.room_id;

      if (!roomMap.has(roomId)) {
        roomMap.set(roomId, []);
      }

      roomMap.get(roomId).push(room);
    }

    return Array.from(roomMap, ([roomId, roomSelection]) => {
      const base = roomSelection[0];

      return {
        room_id: roomId,
        room_name: base.room_name,
        room_surface_in_m2: base.room_surface_in_m2,
        room_data: mappedRoomsData[roomId],
        offers: roomSelection,
      };
    });
  }

  const roomsAllOptions = processingAllOption(rooms, roomsData);

  return (
    <div className="vh-availability-shell">
      <div className="vh-room-layout">
        <div className="vh-room-list">
          {roomsAllOptions.map((everyRoom, index) => (
            <article key={everyRoom.room_id ?? index} className="hotelnreserveboxsec vh-room-card">
              <div className="vh-room-summary">
                <div className="vh-room-media">
                  <img
                    className="ha-hoinsecimage"
                    src={everyRoom?.room_data?.photos?.[0]?.url_original ?? ""}
                    alt={everyRoom?.room_name ? `${everyRoom.room_name} preview` : "Room preview"}
                  />
                </div>

                <div className="vh-room-copy">
                  <div className="vh-room-title-row">
                    <h4>{everyRoom.room_name}</h4>
                    {everyRoom?.room_surface_in_m2 ? (
                      <span className="vh-meta-badge">{everyRoom.room_surface_in_m2} m2</span>
                    ) : null}
                  </div>

                  <div className="vh-bed-list">
                    {(everyRoom?.room_data?.bed_configurations?.[0]?.bed_types ?? []).map((label, bedIndex) => (
                      <span key={bedIndex} className="vh-meta-badge">
                        {label.name_with_count}
                      </span>
                    ))}
                  </div>

                  <ExpandableText
                    text={everyRoom?.room_data?.description}
                    collapsedLines={4}
                    className="vh-room-description"
                  />

                </div>

                <div className="vh-room-feature-grid">
                  <div className="vh-room-feature-group">
                    <p className="vh-feature-group-title">Highlights</p>
                    <ExpandableChipList
                      items={everyRoom?.room_data?.highlights}
                      collapsedCount={5}
                      className="vh-pill-row"
                      renderItem={(label, pillIndex) => (
                        <HighlightsPill
                          key={`${label?.translated_name ?? "highlight"}-${pillIndex}`}
                          iconKey={label?.icon}
                          label={label?.translated_name}
                        />
                      )}
                    />
                  </div>

                  <div className="vh-room-feature-group">
                    <p className="vh-feature-group-title">Room facilities</p>
                    <ExpandableChipList
                      items={everyRoom?.room_data?.facilities}
                      collapsedCount={8}
                      className="vh-facility-row"
                      renderItem={(label, facilityIndex) => (
                        <span
                          key={`${label?.name ?? "facility"}-${facilityIndex}`}
                          className="facilities-pill"
                        >
                          <Falcons.FaCheck aria-hidden="true" />
                          {label?.name}
                        </span>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="ct-right vh-offers-panel">
                <div className="inside-table-header vh-offers-header">
                  <p className="ith-guest">Guests</p>
                  <p className="ith-perks">Offer details</p>
                  <p className="ith-price">Price</p>
                  <p className="ith-rooms">Rooms</p>
                </div>

                <div className="vh-offers-list">
                  {everyRoom.offers.map((offer, offerIndex) => (
                    <div key={offerIndex} className="inside-table vh-offer-row">
                      <div className="it-guest-co table-content-row vh-offer-cell">
                        <span className="vh-cell-label">Guests</span>
                        <AdultorChildIcon
                          amount_adults={offer?.nr_adults ?? 0}
                          amount_child={offer?.nr_children ?? 0}
                        />
                      </div>

                      <div className="it-perks-co table-content-row vh-offer-cell">
                        <span className="vh-cell-label">Offer details</span>
                        <div className="vh-perks-wrap">
                          <PerksListColumn offer={offer} childAgeString={childAgeString} />
                        </div>
                      </div>

                      <div className="it-price-co table-content-row vh-offer-cell">
                        <span className="vh-cell-label">Price</span>
                        <div className="vh-price-stack">
                          <p className="vh-price-caption">Total</p>
                          <h5>
                            {offer?.product_price_breakdown?.all_inclusive_amount?.currency ?? currency}{" "}
                            {formatPrice(
                              offer?.product_price_breakdown?.all_inclusive_amount?.value
                            )}
                          </h5>
                        </div>
                        <div className="vh-price-stack">
                          <p className="vh-price-caption">Per night</p>
                          <h5>
                            {offer?.product_price_breakdown?.gross_amount_per_night?.currency ?? currency}{" "}
                            {formatPrice(
                              offer?.product_price_breakdown?.gross_amount_per_night?.value
                            )}
                          </h5>
                        </div>
                      </div>

                      <div className="it-rooms-co table-content-button vh-offer-cell vh-select-cell">
                        <span className="vh-cell-label">Rooms</span>
                        <select
                          name={`room_number_${everyRoom.room_id}_${offerIndex}`}
                          id={`room_number_${everyRoom.room_id}_${offerIndex}`}
                          className="vh-room-select"
                          defaultValue="0"
                          onChange={(event) =>
                            dispatch(
                              storeBookRoom({
                                mainRoomInfo: everyRoom,
                                offer,
                                roomAmount: event.target.value,
                              })
                            )
                          }
                        >
                          {Array.from({ length: 11 }, (_, amount) => (
                            <option key={amount} value={amount}>
                              {amount}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="hotelnreserveboxsec ha-reservesec vh-summary-panel">
          <PurchaseEndPoint
            saveHouse={saveHouse}
            currency={currency}
            setOpenModalPurchasePortal={setOpenModalPurchasePortal}
          />
        </aside>
      </div>
    </div>
  );
}

export default function ViewHotel() {
  const currency = useContext(BookedList).currency;
  const start_date = useContext(BookedList).initialDate;
  const end_date = useContext(BookedList).dueDate;
  const adult_pax = useContext(BookedList).adultPax;
  const childAgeString = useContext(BookedList).childAgeString;
  const roomAmount = useContext(BookedList).roomAmount;
  const { state } = useLocation();
  const dispatch = useDispatch();
  const selectedRooms = useSelector((data) => data.viewhotel_selectbooking.saveHouse);

  const hotelsData = state?.hotels;
  const hotelId = state?.hotels?.hotel_id;

  const [openModalPurchasePortal, setOpenModalPurchasePortal] = useState(false);
  const [hotelPhotoData, setHotelPhotoData] = useState(null);
  const [hotelDetailsData, setHotelDetailsData] = useState(null);
  const [hotelDescriptionData, setHotelDescriptionData] = useState(null);
  const [roomList, setRoomList] = useState(null);

  const facilities = hotelDetailsData?.data?.facilities_block?.facilities ?? [];
  const hotelData = hotelDetailsData?.data ?? {};
  const propertyClass = hotelData?.rawData?.accuratePropertyClass ?? 0;

  useEffect(() => {
    async function load() {
      const [photos, details, roomlists, description] = await Promise.all([
        getHotelPhoto(hotelsData),
        getHotelDetails(
          hotelsData,
          start_date,
          end_date,
          adult_pax,
          childAgeString,
          roomAmount,
          currency
        ),
        getRoomList(
          hotelsData,
          start_date,
          end_date,
          adult_pax,
          childAgeString,
          roomAmount,
          currency
        ),
        getDescriptionAndInfo(hotelId),
      ]);

      setHotelPhotoData(photos);
      setHotelDetailsData(details);
      setRoomList(roomlists);
      setHotelDescriptionData(description);
    }

    load();
    dispatch(clearBookedRooms());
  }, [
    adult_pax,
    childAgeString,
    currency,
    dispatch,
    end_date,
    hotelId,
    hotelsData,
    roomAmount,
    start_date,
  ]);

  const bookedHotelNMainInfo = {
    hotelDetailsData: hotelDetailsData?.data,
    hotelPhotoData: hotelPhotoData?.data,
    selectedRooms,
    checkInNOutDate: {
      start_date,
      end_date,
    },
    currency,
  };

  return (
    <>
      <Modal
        dialogClassName="ModalPurchasePortal"
        show={openModalPurchasePortal}
        onHide={() => setOpenModalPurchasePortal(false)}
      >
        <Modal.Body>
          <div className="vh-modal-close-row">
            <button
              type="button"
              className="vh-icon-button"
              onClick={() => setOpenModalPurchasePortal(false)}
            >
              x
            </button>
          </div>
          <MainPurchasePortal BookedHotelNMainInfo={bookedHotelNMainInfo} />
        </Modal.Body>
      </Modal>

      <Container className="Shell view-hotel-page">
        <div className="SelectMenu-Resize">
          <SelectMenu />
        </div>

        <section className="vh-hero">
          <div className="vh-hero-copy">
            <div className="vh-star-row">
              {Array.from({ length: propertyClass }, (_, index) => (
                <span key={index} className="vh-star">
                  ★
                </span>
              ))}
            </div>

            <h1>{hotelData?.hotel_name ?? ""}</h1>
            <p className="vh-address">{hotelData?.address ?? ""}</p>

            <div className="vh-hero-meta">
              {hotelData?.accommodation_type_name ? (
                <span className="vh-meta-badge">{hotelData.accommodation_type_name}</span>
              ) : null}
              {hotelData?.available_rooms ? (
                <span className="vh-meta-badge">
                  {hotelData.available_rooms} room types available
                </span>
              ) : null}
              {hotelData?.city ? <span className="vh-meta-badge">{hotelData.city}</span> : null}
            </div>
          </div>

          <div className="vh-rating-card">
            <div className="vh-action-row">
              <button type="button" className="vh-icon-button" aria-label="Save hotel">
                <FaHeart />
              </button>
              <button type="button" className="vh-icon-button" aria-label="Share hotel">
                <FaShare />
              </button>
            </div>

            <div className="vh-rating-copy">
              <p>{hotelData?.rawData?.reviewScoreWord ?? "Guest rating"}</p>
              <div className="vh-rating-score">{hotelData?.rawData?.reviewScore ?? "--"}</div>
            </div>
          </div>
        </section>

        <HotelGallery hotelPhotoData={hotelPhotoData} />

        <section className="vh-section-grid">
          <DescriptionDetails hotelDescriptionData={hotelDescriptionData} />
          <AvaliableFacilitiesLabel facilities={facilities} />
        </section>

        <section className="vh-availability-section">
          <div className="vh-section-intro">
            <p className="vh-eyebrow">Availability</p>
            <h3>Available room offers</h3>
            <p className="vh-section-subcopy">
              Compare room details, keep long descriptions collapsed by default, and expand only
              what you need.
            </p>
          </div>

          <HotelRoomType
            roomList={roomList}
            childAgeString={childAgeString}
            currency={currency}
            setOpenModalPurchasePortal={setOpenModalPurchasePortal}
          />
        </section>
      </Container>
    </>
  );
}
