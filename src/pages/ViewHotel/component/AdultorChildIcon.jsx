import * as Falcons from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";


export default function AdultorChildIcon({ amount_adults, amount_child }) {
  const AdultIcon = FaPerson;
  const ChildIcon = Falcons.FaChild;

  const AdultLength = Array.from({ length: amount_adults });
  const ChildLength = Array.from({ length: amount_child });
  
  return (
    <div className="d-flex flex-wrap">
      {amount_adults > 0 
        ? <div>
            {AdultLength.map((_, index) => (
              <AdultIcon key={index} />
            ))}
          </div>
        : <div>n/a</div>
      } 
      {amount_child > 0 
        && <div className="d-flex">
            <div>+</div>
            <div>
              {ChildLength.map((_, index) => (
                <ChildIcon key={index} />
              ))}
            </div>
          </div>
      }
    </div>
  )
}