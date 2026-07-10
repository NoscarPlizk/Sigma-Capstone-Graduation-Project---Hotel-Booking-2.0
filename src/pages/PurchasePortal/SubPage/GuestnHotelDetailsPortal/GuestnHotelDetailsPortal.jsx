import { useContext, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { setMainGuestName } from "../../Redux/FinalBookingDataSlice";
import { useAuth } from "../../../../content/Firebase/AuthContext";
import { BookedList } from "../../../../content/data transfer/bookedListContent";
import PerksListColumn from "../../../ViewHotel/component/PerksListRelatedFunction/PerksListColumn";
import PurchaseInfoForm from "./component/PurchaseInfoForm";
import "./GuestnHotelDetailsPortal.css";

function formatPrice(value) {
  const numericValue = Number(value ?? 0);
  return Number.isFinite(numericValue) ? numericValue.toFixed(2) : "0.00";
}

function getOrdinal(number) {
  if (number % 100 >= 11 && number % 100 <= 13) return `${number}th`;

  switch (number % 10) {
    case 1:
      return `${number}st`;
    case 2:
      return `${number}nd`;
    case 3:
      return `${number}rd`;
    default:
      return `${number}th`;
  }
}

function HotelRoomList({ bookingRegistry }) {
  const dispatch = useDispatch();
  const { childAgeString } = useContext(BookedList);
  const [editingGuestKey, setEditingGuestKey] = useState("");
  const [guestNameDraft, setGuestNameDraft] = useState("");

  const roomGroups =
    bookingRegistry?.main_hotel_booked?.select_room_offers ?? [];

  const totalSelectedRooms = roomGroups.reduce(
    (sum, roomGroup) => sum + (roomGroup?.base_select_room?.length ?? 0),
    0
  );

  function startEditGuestName(uniqueKey, currentName) {
    setEditingGuestKey(uniqueKey);
    setGuestNameDraft(currentName ?? "");
  }

  function cancelEditGuestName() {
    setEditingGuestKey("");
    setGuestNameDraft("");
  }

  function saveGuestName(baseRoomId, uniqueKey) {
    dispatch(
      setMainGuestName({
        baseRoomId,
        uniqueKey,
        newMainGuestName: guestNameDraft.trim(),
      })
    );

    cancelEditGuestName();
  }

  if (roomGroups.length === 0) {
    return <p className="purchase-empty-copy">No selected rooms found.</p>;
  }

  return (
    <div className="purchase-room-groups">
      <div className="purchase-room-summary-row">
        <span className="purchase-pill">
          {totalSelectedRooms} assigned room
          {totalSelectedRooms > 1 ? "s" : ""}
        </span>
      </div>

      {roomGroups.map((roomGroup, roomGroupIndex) => {
        const baseRoomName = roomGroup?.base_room_name ?? "Room option";
        const roomDescription =
          roomGroup?.base_select_room_description?.total_same_rooms_name ??
          baseRoomName;
        const roomOffers = roomGroup?.base_select_room ?? [];

        return (
          <article
            key={`${baseRoomName}-${roomGroupIndex}`}
            className="purchase-room-group"
          >
            <div className="purchase-room-group-head">
              <div>
                <h4>{baseRoomName}</h4>
                <p>{roomDescription}</p>
              </div>
              <span>
                {roomOffers.length} room{roomOffers.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="purchase-room-offer-list">
              {roomOffers.map(
                ({ spec_room_data, main_guest_name, uniqueKey }, offerIndex) => {
                  const adultCount = spec_room_data?.nr_adults ?? 0;
                  const childCount = spec_room_data?.nr_children ?? 0;
                  const offerCurrency =
                    spec_room_data?.product_price_breakdown?.all_inclusive_amount
                      ?.currency ?? "MYR";
                  const offerPrice =
                    spec_room_data?.product_price_breakdown?.all_inclusive_amount
                      ?.value ?? 0;
                  const isEditing = editingGuestKey === uniqueKey;
                  const guestDisplayName =
                    main_guest_name?.trim() || "Assign main guest";

                  return (
                    <div key={uniqueKey} className="purchase-room-offer-card">
                      <div className="purchase-room-offer-top">
                        <span className="purchase-room-order">
                          {getOrdinal(offerIndex + 1)}
                        </span>
                        <div className="purchase-room-occupancy">
                          <span>
                            {adultCount} adult{adultCount > 1 ? "s" : ""}
                          </span>
                          {childCount > 0 ? (
                            <span>
                              {childCount} child
                              {childCount > 1 ? "ren" : ""}
                            </span>
                          ) : null}
                        </div>
                        <strong className="purchase-room-price">
                          {offerCurrency} {formatPrice(offerPrice)}
                        </strong>
                      </div>

                      <div className="purchase-room-guest-box">
                        <div className="purchase-room-guest-label">
                          <span>Main guest</span>
                        </div>

                        {isEditing ? (
                          <div className="purchase-inline-form">
                            <input
                              type="text"
                              value={guestNameDraft}
                              placeholder="Enter guest name"
                              onChange={(event) =>
                                setGuestNameDraft(event.target.value)
                              }
                            />
                            <button
                              type="button"
                              className="purchase-inline-save"
                              onClick={() =>
                                saveGuestName(roomGroup.base_room_id, uniqueKey)
                              }
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="purchase-inline-cancel"
                              onClick={cancelEditGuestName}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="purchase-room-guest-display">
                            <strong>{guestDisplayName}</strong>
                            <button
                              type="button"
                              className="EditGuestNameHyperlink"
                              onClick={() =>
                                startEditGuestName(uniqueKey, main_guest_name)
                              }
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="purchase-room-perks">
                        <PerksListColumn
                          offer={spec_room_data}
                          childAgeString={childAgeString}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function ContinueToPaymentButton({
  canProceed,
  completionCount,
  requiredFieldCount,
  onProceed,
}) {
  return (
    <div className="purchase-primary-action">
      <div>
        <p className="purchase-eyebrow">Ready for payment</p>
        <h3>Move to the secure payment step</h3>
        <p className="purchase-section-copy">
          Required form fields completed: {completionCount} of{" "}
          {requiredFieldCount}.
        </p>
      </div>

      <button
        type="button"
        className="purchase-primary-button"
        disabled={!canProceed}
        onClick={onProceed}
      >
        Continue to payment
      </button>
    </div>
  );
}

export default function GuestnHotelDetailsPortal({
  bookingRegistry,
  setSubPage,
}) {
  const { userProfile } = useAuth();
  const bookingType =
    bookingRegistry?.main_guest_name?.guest_booking_for_type ?? "mainGuest";

  const [isTouched, setIsTouched] = useState({
    first_name: false,
    last_name: false,
    country_region_name: false,
    email: false,
    phone_country_region: false,
    phone_number: false,
    company_name: false,
    company_reg_num: false,
  });

  const [hadvaluebeforeSubmit, SethadvaluebeforeSubmit] = useState({
    first_name: false,
    last_name: false,
    country_region_name: false,
    email: false,
    phone_country_region: false,
    phone_number: false,
    company_name: false,
    company_reg_num: false,
  });

  const requiredFieldKeys = useMemo(() => {
    const fields = [
      "first_name",
      "last_name",
      "country_region_name",
      "email",
      "phone_country_region",
      "phone_number",
    ];

    if (bookingType === "company") {
      fields.push("company_name", "company_reg_num");
    }

    return fields;
  }, [bookingType]);

  const completionCount = requiredFieldKeys.filter(
    (key) => hadvaluebeforeSubmit[key]
  ).length;
  const canProceed = completionCount === requiredFieldKeys.length;

  function DetectedTouch({ name }) {
    setIsTouched((prev) => ({ ...prev, [name]: true }));
  }

  function isEmpty(value) {
    return String(value ?? "").trim() === "";
  }

  function isError(actualState, stateKey) {
    if (
      (isEmpty(actualState) && isTouched[stateKey] === false) ||
      (!isEmpty(actualState) && isTouched[stateKey] === true)
    ) {
      return false;
    }

    return isEmpty(actualState) && isTouched[stateKey] === true;
  }

  function checkBeforeGoSettlePayment() {
    if (!canProceed) {
      return;
    }

    setSubPage("StripePaymentPage");
  }

  return (
    <div className="FormNInfomationFrame">
      <section className="purchase-stage-card">
        <div className="purchase-section-header">
          <div>
            <p className="purchase-eyebrow">Guest details</p>
            <h2>Confirm who is staying and how to contact them</h2>
            <p className="purchase-section-copy">
              This information will be attached to the booking record after the
              payment succeeds.
            </p>
          </div>
          <span className="purchase-pill">
            {completionCount}/{requiredFieldKeys.length} required fields ready
          </span>
        </div>

        <PurchaseInfoForm
          userProfile={userProfile}
          DetectedTouch={DetectedTouch}
          isError={isError}
          VarValueBeforeSubmitState={{
            hadvaluebeforeSubmit,
            SethadvaluebeforeSubmit,
          }}
        />
      </section>

      <section className="purchase-room-shell">
        <div className="purchase-section-header">
          <div>
            <p className="purchase-eyebrow">Room assignment</p>
            <h3>Review the selected rooms from the hotel page</h3>
            <p className="purchase-section-copy">
              Each room can carry a different main guest name before checkout.
            </p>
          </div>
        </div>

        <HotelRoomList bookingRegistry={bookingRegistry} />
      </section>

      <ContinueToPaymentButton
        canProceed={canProceed}
        completionCount={completionCount}
        requiredFieldCount={requiredFieldKeys.length}
        onProceed={checkBeforeGoSettlePayment}
      />
    </div>
  );
}
