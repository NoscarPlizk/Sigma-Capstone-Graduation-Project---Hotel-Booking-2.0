import { useState } from "react";
import ConvertToFarKey from "./Sub-Function/ConvertToFarKey.js";
import * as Falcons from "react-icons/fa";

export default function AvaliableFacilitiesLabel({ facilities }) {
  const [expanded, setExpanded] = useState(false);
  const safeFacilities = Array.isArray(facilities) ? facilities : [];
  const shouldCollapse = safeFacilities.length > 12;
  const visibleFacilities = expanded || !shouldCollapse ? safeFacilities : safeFacilities.slice(0, 12);

  return (
    <section className="vh-section-card">
      <div className="vh-section-heading">
        <div>
          <p className="vh-eyebrow">Facilities</p>
          <h4>Most popular facilities</h4>
        </div>
        <span className="vh-section-count">{safeFacilities.length}</span>
      </div>

      <div className="lg-container vh-facilities-grid">
        {visibleFacilities.map((label, index) => {
          const farKey = ConvertToFarKey(label.icon);
          const Icon = Falcons[farKey];

          return (
            <div key={`${label.name}-${index}`} className="lg-child vh-facility-chip">
              <span className="vh-facility-icon">{Icon ? <Icon aria-hidden="true" /> : <Falcons.FaCheck />}</span>
              <span>{label.name}</span>
            </div>
          );
        })}
      </div>

      {shouldCollapse ? (
        <button
          type="button"
          className="vh-inline-button"
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? "Show less" : `Show all ${safeFacilities.length}`}
        </button>
      ) : null}
    </section>
  );
}
