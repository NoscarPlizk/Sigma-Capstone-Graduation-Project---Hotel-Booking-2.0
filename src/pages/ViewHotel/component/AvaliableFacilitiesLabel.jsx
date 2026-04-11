import ConvertToFarKey from './Sub-Function/ConvertToFarKey.js';
import * as Falcons from "react-icons/fa";

export default function AvaliableFacilitiesLabel({ facilities }) {
    return (
      <div>
        <h4>Avaliable Facilities</h4>
        <div className="lg-container">
          {facilities.map((label, index) => {
          const farKey = ConvertToFarKey(label.icon); 
          const Icon = Falcons[farKey] ?? 'div';
          return (
            <div key={index} className="lg-child">
              <div>
                <Icon aria-hidden="true" />
              </div>
              <div>
                <p>{label.name}</p>
              </div>
            </div>
          )})}
        </div>
      </div>
    );
  }