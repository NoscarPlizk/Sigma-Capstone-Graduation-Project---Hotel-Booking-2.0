import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import SelectMenu from "../../component/SelectMenu/SelectMenu";
import { BookedList } from "../../content/data transfer/bookedListContent";
import "./SearchToHotelList.css";

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-low", label: "Lowest price" },
  { value: "price-high", label: "Highest price" },
  { value: "rating-high", label: "Highest rating" },
  { value: "reviews-high", label: "Most reviews" },
];

const FACILITY_OPTIONS = [
  { key: "wifi", label: "Wi-Fi" },
  { key: "parking", label: "Parking" },
  { key: "pool", label: "Pool" },
  { key: "restaurant", label: "Restaurant" },
];

function createDefaultFilters(priceLimit) {
  return {
    priceLimit,
    minStars: 0,
    minReviewScore: 0,
    breakfastOnly: false,
    freeCancellationOnly: false,
    noPrepaymentOnly: false,
    dealOnly: false,
    preferredOnly: false,
    sortBy: "recommended",
    facilities: [],
  };
}

function cleanText(value = "") {
  return value
    .replace(/[\u200e\u200f\u202a-\u202e]/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractLabelLines(accessibilityLabel = "") {
  return accessibilityLabel
    .split("\n")
    .map((line) => cleanText(line))
    .filter(Boolean);
}

function extractAreaAndDistance(lines, fallbackArea) {
  const locationLine = lines.find(
    (line) => /from downtown|in downtown/i.test(line),
  );

  if (!locationLine) {
    return {
      area: fallbackArea || "Area unavailable",
      distance: "",
    };
  }

  const parts = locationLine
    .split(/\s+[^\p{L}\p{N}\s]+\s+/u)
    .map((part) => cleanText(part));
  const area = parts[0] || fallbackArea || "Area unavailable";

  if (/in downtown/i.test(locationLine)) {
    return { area, distance: "In downtown" };
  }

  const distanceMatch = locationLine.match(
    /(\d+(?:\.\d+)?\s?(?:km|m)\sfrom downtown)/i,
  );

  return {
    area,
    distance: distanceMatch?.[1] ?? "",
  };
}

function extractStayType(lines) {
  const stayLine = lines.find((line) =>
    /hotel room|private room|apartment|studio/i.test(line),
  );

  if (!stayLine) return "";
  if (/apartment/i.test(stayLine)) return "Apartment";
  if (/studio/i.test(stayLine)) return "Studio";
  if (/private room/i.test(stayLine)) return "Private room";
  if (/hotel room/i.test(stayLine)) return "Hotel room";
  return "";
}

function extractHighlights(accessibilityLabel, property) {
  const labelText = cleanText(accessibilityLabel).toLowerCase();
  const benefitBadges = property?.priceBreakdown?.benefitBadges ?? [];
  const hasDealBadge = benefitBadges.some((badge) =>
    /deal/i.test(cleanText(badge?.text || badge?.identifier || "")),
  );

  return {
    breakfast: /breakfast included/i.test(labelText),
    freeCancellation: /free cancellation/i.test(labelText),
    noPrepayment: /no prepayment needed/i.test(labelText),
    taxesIncluded: /includes taxes and fees/i.test(labelText),
    deal: /getaway deal/i.test(labelText) || hasDealBadge,
    preferred: Boolean(property?.isPreferred),
    limitedAvailability: /only \d+ left/i.test(labelText),
  };
}

function extractFacilities(accessibilityLabel = "") {
  const labelText = cleanText(accessibilityLabel).toLowerCase();

  return FACILITY_OPTIONS.filter((option) => labelText.includes(option.key)).map(
    (option) => option.key,
  );
}

function formatMoney(currency, value, fractionDigits = 0) {
  if (!Number.isFinite(value)) return "Price unavailable";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(value);
  } catch {
    return `${currency ?? ""} ${value.toFixed(fractionDigits)}`.trim();
  }
}

function formatReviewCount(reviewCount) {
  if (!Number.isFinite(reviewCount)) return "";
  return new Intl.NumberFormat("en-US").format(reviewCount);
}

function normalizeHotel(hotel) {
  const property = hotel?.property ?? {};
  const lines = extractLabelLines(hotel?.accessibilityLabel ?? "");
  const { area, distance } = extractAreaAndDistance(lines, property?.wishlistName);
  const stayType = extractStayType(lines);
  const flags = extractHighlights(hotel?.accessibilityLabel ?? "", property);
  const facilities = extractFacilities(hotel?.accessibilityLabel ?? "");
  const photoUrl = Array.isArray(property?.photoUrls)
    ? property.photoUrls[0]
    : property?.photoUrls || "";
  const grossPrice = property?.priceBreakdown?.grossPrice?.value;
  const grossCurrency = property?.priceBreakdown?.grossPrice?.currency;
  const excludedPrice = property?.priceBreakdown?.excludedPrice?.value;
  const strikethroughPrice = property?.priceBreakdown?.strikethroughPrice?.value;
  const taxesNote = flags.taxesIncluded
    ? "Includes taxes and fees"
    : Number.isFinite(excludedPrice)
      ? `+ ${formatMoney(grossCurrency, excludedPrice, 0)} taxes and charges`
      : "";

  const highlightLabels = [
    flags.breakfast ? "Breakfast included" : null,
    flags.freeCancellation ? "Free cancellation" : null,
    flags.noPrepayment ? "No prepayment" : null,
    flags.deal ? "Deal" : null,
    flags.preferred ? "Preferred" : null,
    flags.limitedAvailability ? "Limited availability" : null,
  ].filter(Boolean);

  return {
    source: hotel,
    hotelId: hotel?.hotel_id ?? property?.id,
    name: property?.name ?? "Hotel unavailable",
    city: property?.wishlistName ?? "",
    area,
    distance,
    stayType,
    photoUrl,
    stars: Number(property?.accuratePropertyClass ?? property?.propertyClass ?? 0),
    reviewScore: Number(property?.reviewScore ?? 0),
    reviewScoreWord: property?.reviewScoreWord ?? "Review score",
    reviewCount: Number(property?.reviewCount ?? 0),
    grossPrice,
    currency: grossCurrency,
    excludedPrice,
    strikethroughPrice,
    taxesNote,
    checkinFrom: property?.checkin?.fromTime ?? "",
    checkoutUntil: property?.checkout?.untilTime ?? "",
    rankingPosition: Number(property?.rankingPosition ?? property?.position ?? 0),
    flags,
    facilities,
    highlightLabels,
  };
}

function StarRow({ count }) {
  const safeCount = Math.max(0, Math.min(5, Number(count) || 0));

  return (
    <div className="hotel-stars" aria-label={`${safeCount} star property`}>
      {Array.from({ length: 5 }, (_, index) =>
        index < safeCount ? (
          <FaStar key={index} className="hotel-star-filled" />
        ) : (
          <FaRegStar key={index} className="hotel-star-empty" />
        ),
      )}
    </div>
  );
}

function FilterPanel({
  filters,
  setFilters,
  minimumPrice,
  maximumPrice,
  displayCurrency,
  availableFacilityKeys,
}) {
  const roundedMinimum = Math.floor(minimumPrice || 0);
  const roundedMaximum = Math.ceil(maximumPrice || 0);

  function toggleFacility(facilityKey) {
    setFilters((current) => {
      const nextFacilities = current.facilities.includes(facilityKey)
        ? current.facilities.filter((key) => key !== facilityKey)
        : [...current.facilities, facilityKey];

      return {
        ...current,
        facilities: nextFacilities,
      };
    });
  }

  function resetFilters() {
    setFilters(createDefaultFilters(roundedMaximum));
  }

  return (
    <aside className="hotel-filter-panel">
      <div className="filter-panel-head">
        <div>
          <p className="filter-eyebrow">Filter results</p>
          <h2>Keep it simple</h2>
        </div>
        <Button
          variant="outline-dark"
          className="filter-reset-button"
          onClick={resetFilters}
        >
          Reset
        </Button>
      </div>

      <section className="filter-section">
        <div className="filter-section-title">
          <h3>Price cap</h3>
          <span>{formatMoney(displayCurrency, filters.priceLimit, 0)}</span>
        </div>
        <Form.Range
          min={roundedMinimum}
          max={roundedMaximum || roundedMinimum || 1}
          step={50}
          value={Math.min(filters.priceLimit, roundedMaximum || filters.priceLimit)}
          onChange={(event) =>
            setFilters((current) => ({
              ...current,
              priceLimit: Number(event.target.value),
            }))
          }
        />
        <div className="filter-range-meta">
          <span>{formatMoney(displayCurrency, roundedMinimum, 0)}</span>
          <span>{formatMoney(displayCurrency, roundedMaximum, 0)}</span>
        </div>
      </section>

      <section className="filter-section">
        <h3>Star rank</h3>
        <Form.Select
          value={filters.minStars}
          onChange={(event) =>
            setFilters((current) => ({
              ...current,
              minStars: Number(event.target.value),
            }))
          }
        >
          <option value={0}>All star ratings</option>
          <option value={3}>3 stars and above</option>
          <option value={4}>4 stars and above</option>
          <option value={5}>5 stars only</option>
        </Form.Select>
      </section>

      <section className="filter-section">
        <h3>Review score</h3>
        <Form.Select
          value={filters.minReviewScore}
          onChange={(event) =>
            setFilters((current) => ({
              ...current,
              minReviewScore: Number(event.target.value),
            }))
          }
        >
          <option value={0}>All review scores</option>
          <option value={7}>7.0 and above</option>
          <option value={8}>8.0 and above</option>
          <option value={9}>9.0 and above</option>
        </Form.Select>
      </section>

      <section className="filter-section">
        <h3>Meals and perks</h3>
        <Form.Check
          type="switch"
          id="filter-breakfast"
          label="Breakfast included"
          checked={filters.breakfastOnly}
          onChange={(event) =>
            setFilters((current) => ({
              ...current,
              breakfastOnly: event.target.checked,
            }))
          }
        />
        <Form.Check
          type="switch"
          id="filter-free-cancellation"
          label="Free cancellation"
          checked={filters.freeCancellationOnly}
          onChange={(event) =>
            setFilters((current) => ({
              ...current,
              freeCancellationOnly: event.target.checked,
            }))
          }
        />
        <Form.Check
          type="switch"
          id="filter-no-prepayment"
          label="No prepayment"
          checked={filters.noPrepaymentOnly}
          onChange={(event) =>
            setFilters((current) => ({
              ...current,
              noPrepaymentOnly: event.target.checked,
            }))
          }
        />
        <Form.Check
          type="switch"
          id="filter-deal"
          label="Deal offers"
          checked={filters.dealOnly}
          onChange={(event) =>
            setFilters((current) => ({
              ...current,
              dealOnly: event.target.checked,
            }))
          }
        />
        <Form.Check
          type="switch"
          id="filter-preferred"
          label="Preferred property"
          checked={filters.preferredOnly}
          onChange={(event) =>
            setFilters((current) => ({
              ...current,
              preferredOnly: event.target.checked,
            }))
          }
        />
      </section>

      <section className="filter-section">
        <h3>Facilities</h3>
        {availableFacilityKeys.length > 0 ? (
          FACILITY_OPTIONS.filter((option) =>
            availableFacilityKeys.includes(option.key),
          ).map((option) => (
            <Form.Check
              key={option.key}
              type="checkbox"
              id={`facility-${option.key}`}
              label={option.label}
              checked={filters.facilities.includes(option.key)}
              onChange={() => toggleFacility(option.key)}
            />
          ))
        ) : (
          <p className="filter-muted-note">
            This search result does not expose structured facility keywords.
          </p>
        )}
      </section>
    </aside>
  );
}

function HotelCard({ hotel }) {
  const navigate = useNavigate();

  return (
    <article className="hotel-card">
      <div className="hotel-card-media">
        {hotel.photoUrl ? (
          <img
            className="hotel-card-image"
            src={hotel.photoUrl}
            alt={`Photo of ${hotel.name}`}
          />
        ) : (
          <div className="hotel-card-image hotel-card-image-fallback">
            Image unavailable
          </div>
        )}
      </div>

      <div className="hotel-card-body">
        <div className="hotel-card-main">
          <div className="hotel-card-heading">
            <div className="hotel-card-title-wrap">
              <StarRow count={hotel.stars} />
              <h3>{hotel.name}</h3>
            </div>
            <div className="hotel-location-line">
              <span>{hotel.area}</span>
              {hotel.distance ? <span>{hotel.distance}</span> : null}
              {hotel.stayType ? <span>{hotel.stayType}</span> : null}
            </div>
          </div>

          <div className="hotel-card-tags">
            {hotel.highlightLabels.slice(0, 4).map((label) => (
              <span key={label} className="hotel-tag">
                {label}
              </span>
            ))}
          </div>

          <div className="hotel-card-meta">
            <div className="hotel-meta-block">
              <p className="hotel-meta-label">Review</p>
              <div className="hotel-review-inline">
                <strong>{hotel.reviewScoreWord}</strong>
                <span>{hotel.reviewScore.toFixed(1)}</span>
                <span>{formatReviewCount(hotel.reviewCount)} reviews</span>
              </div>
            </div>
            <div className="hotel-meta-block">
              <p className="hotel-meta-label">Stay details</p>
              <div className="hotel-stay-times">
                <span>Check-in {hotel.checkinFrom || "N/A"}</span>
                <span>Check-out {hotel.checkoutUntil || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hotel-card-side">
          <div className="hotel-score-box">{hotel.reviewScore.toFixed(1)}</div>
          <div className="hotel-price-box">
            {Number.isFinite(hotel.strikethroughPrice) ? (
              <p className="hotel-old-price">
                {formatMoney(hotel.currency, hotel.strikethroughPrice, 0)}
              </p>
            ) : null}
            <h4>{formatMoney(hotel.currency, hotel.grossPrice, 0)}</h4>
            <p className="hotel-price-note">{hotel.taxesNote || "Total stay price"}</p>
          </div>
          <Button
            className="hotel-card-button"
            onClick={() => navigate("/viewhotel", { state: { hotels: hotel.source } })}
          >
            See availability
          </Button>
        </div>
      </div>
    </article>
  );
}

function ResultsSection({ hotels, filters, setFilters, searchTitle, propertyTitle }) {
  const prices = hotels
    .map((hotel) => hotel.grossPrice)
    .filter((price) => Number.isFinite(price));
  const minimumPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maximumPrice = prices.length > 0 ? Math.max(...prices) : 0;

  const availableFacilityKeys = [...new Set(hotels.flatMap((hotel) => hotel.facilities))];
  const displayCurrency = hotels.find((hotel) => hotel.currency)?.currency || "USD";

  const filteredHotels = hotels
    .filter((hotel) => {
      if (Number.isFinite(hotel.grossPrice) && hotel.grossPrice > filters.priceLimit) {
        return false;
      }

      if (filters.minStars > 0 && hotel.stars < filters.minStars) {
        return false;
      }

      if (
        filters.minReviewScore > 0 &&
        Number(hotel.reviewScore || 0) < filters.minReviewScore
      ) {
        return false;
      }

      if (filters.breakfastOnly && !hotel.flags.breakfast) {
        return false;
      }

      if (filters.freeCancellationOnly && !hotel.flags.freeCancellation) {
        return false;
      }

      if (filters.noPrepaymentOnly && !hotel.flags.noPrepayment) {
        return false;
      }

      if (filters.dealOnly && !hotel.flags.deal) {
        return false;
      }

      if (filters.preferredOnly && !hotel.flags.preferred) {
        return false;
      }

      if (
        filters.facilities.length > 0 &&
        !filters.facilities.every((facility) => hotel.facilities.includes(facility))
      ) {
        return false;
      }

      return true;
    })
    .sort((firstHotel, secondHotel) => {
      switch (filters.sortBy) {
        case "price-low":
          return (firstHotel.grossPrice ?? Infinity) - (secondHotel.grossPrice ?? Infinity);
        case "price-high":
          return (secondHotel.grossPrice ?? 0) - (firstHotel.grossPrice ?? 0);
        case "rating-high":
          return (secondHotel.reviewScore ?? 0) - (firstHotel.reviewScore ?? 0);
        case "reviews-high":
          return (secondHotel.reviewCount ?? 0) - (firstHotel.reviewCount ?? 0);
        default:
          return (firstHotel.rankingPosition ?? 0) - (secondHotel.rankingPosition ?? 0);
      }
    });

  return (
    <div className="search-results-layout">
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        minimumPrice={minimumPrice}
        maximumPrice={maximumPrice}
        displayCurrency={displayCurrency}
        availableFacilityKeys={availableFacilityKeys}
      />

      <section className="hotel-results-panel">
        <div className="results-toolbar">
          <div>
            <p className="results-eyebrow">Available stays</p>
            <h1>{searchTitle || "Your search"} </h1>
            <p className="results-copy">
              {filteredHotels.length} of {hotels.length} properties shown
              {propertyTitle ? ` - ${propertyTitle}` : ""}
            </p>
          </div>

          <div className="results-sort-box">
            <label htmlFor="sort-by">Sort by</label>
            <Form.Select
              id="sort-by"
              value={filters.sortBy}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  sortBy: event.target.value,
                }))
              }
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>

        {filteredHotels.length > 0 ? (
          <div className="hotel-results-list">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.hotelId} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="hotel-empty-state">
            <h2>No hotels match the current filters</h2>
            <p>Try widening the price cap or turning off some filter switches.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default function SearchToHotelList() {
  const { search, searchFetchData } = useContext(BookedList);
  const rawHotels = Array.isArray(searchFetchData?.data?.hotels)
    ? searchFetchData.data.hotels
    : [];
  const hotels = rawHotels.map((hotel) => normalizeHotel(hotel));
  const priceValues = hotels
    .map((hotel) => hotel.grossPrice)
    .filter((price) => Number.isFinite(price));
  const maximumPrice = priceValues.length > 0 ? Math.ceil(Math.max(...priceValues)) : 0;
  const [filters, setFilters] = useState(createDefaultFilters(maximumPrice));

  useEffect(() => {
    setFilters(createDefaultFilters(maximumPrice));
  }, [maximumPrice, searchFetchData?.timestamp]);

  return (
    <Container fluid className="hotel-search-page-shell">
      <div className="hotel-search-page-inner">
        <div className="hotel-search-header">
          <p className="hotel-search-kicker">Search hotels</p>
          <h1>Find a stay that fits the trip</h1>
          <p className="hotel-search-subtitle">
            Cleaner results, clearer pricing, and lightweight filtering from the
            current Booking.com search response.
          </p>
        </div>

        <SelectMenu />

        {hotels.length > 0 ? (
          <ResultsSection
            hotels={hotels}
            filters={filters}
            setFilters={setFilters}
            searchTitle={search}
            propertyTitle={searchFetchData?.data?.meta?.[0]?.title ?? ""}
          />
        ) : (
          <div className="hotel-empty-state hotel-empty-state-root">
            <h2>No search results yet</h2>
            <p>Run a hotel search from the form above to view available stays.</p>
          </div>
        )}
      </div>
    </Container>
  );
}
