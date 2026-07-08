import { useState } from "react";

export default function DescriptionDetails({ hotelDescriptionData }) {
  const [expanded, setExpanded] = useState(false);
  const description =
    hotelDescriptionData?.data?.find((element) => element.descriptiontype_id === 6)?.description ??
    "";
  const shouldCollapse = description.length > 360 || description.split("\n").length > 2;

  return (
    <section className="vh-section-card">
      <div className="vh-section-heading">
        <div>
          <p className="vh-eyebrow">Overview</p>
          <h4>About this hotel</h4>
        </div>
      </div>

      {description ? (
        <>
          <div
            className={`vh-description-copy ${expanded ? "is-expanded" : "is-collapsed"}`}
            style={!expanded && shouldCollapse ? { WebkitLineClamp: 6 } : undefined}
          >
            {description}
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
        </>
      ) : (
        <p className="vh-empty-copy">Description unavailable.</p>
      )}
    </section>
  );
}
