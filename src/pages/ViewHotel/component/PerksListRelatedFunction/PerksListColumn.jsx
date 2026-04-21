import HaveChargeBreakfast from "./SubComponent/HaveChargeBreakfast";
import SplitCancelationBoldText from "./SubComponent/SplitCancelationBoldText";
import ChildAgeFreePolicy from "./SubComponent/ChildAgeFreePolicy";
import SplitNoPaymentBoldText from "./SubComponent/SplitNoPaymentBoldText";

import * as Falcons from "react-icons/fa";
import { FaChair, FaCheck, FaHeart, FaMoneyBill1Wave, FaPerson, FaPlane, FaShare, FaWifi } from "react-icons/fa6";
import { FaChild } from "react-icons/fa";


export default function PerksListColumn({ offer, childAgeString }) {
    // success sample

    //  Breakfast included
    //  Costs first night to cancel
    //  Free Charge for 2 for your children (0 and 1 years old)
    //  No prepayment needed – pay at the property
    //  250.00 SGD food/drink credit
    //  One-way airport shuttle
    //  High-speed internet

    const breakfastword = offer?.mealplan ?? '';
    const isbreakfastincluded = offer?.breakfast_included > 0 ? true : false;
    // console.log("breakfastword:", breakfastword); 
    
    // Breakfast included
    
    // Enjoy a convenient breakfast at the property for MYR 100 per person, per night.

    // Enjoy a convenient breakfast at the property for EUR 37 per person, per night. 
    // Enjoy a convenient lunch at the property for EUR 81 per person, per night. 
    // Enjoy a convenient dinner at the property for EUR 135 per person, per night.

    // Breakfast EUR 999 // length: 17-20

    // Breakfast EUR 999 Lunch EUR 46 Dinner EUR 62 // length: 9
    // Breakfast included Lunch EUR 46 Dinner EUR 62 // length: 8
    // Breakfast included in the price Lunch EUR 46 Dinner EUR 62 // length: 11

    const originalcancelationword = offer?.policy_display_details?.
    cancellation?.title_details?.translation;    
    

    const NoPaymentPolicy = offer?.policy_display_details?.prepayment?.title_details?.translation ?? '';
    // console.log("splitNoPaymentText:", splitNoPaymentText);

    const ExtraPerks = offer?.bundle_extras?.benefits ?? [];

    return (
      <div className="d-flex flex-column gap-1">
        <div id='breakfast'>
          {breakfastword 
            ? <HaveChargeBreakfast 
                breakfastword={breakfastword} 
                isbreakfastincluded={isbreakfastincluded}
              /> 
            : `SplitCancelationBoldText no show`
          }
        </div>
        <div id='Cancelation Policies' >
          {originalcancelationword 
            ? <SplitCancelationBoldText 
                originalcancelationword={originalcancelationword}
              />
            : `SplitCancelationBoldText no show`
          }
        </div>
        <div id="ChildAgeFreePolicy">
          {childAgeString && offer 
            ? <ChildAgeFreePolicy 
                childAgeString={childAgeString} 
                offer={offer}
              /> 
            : `ChildAgeFreePolicy no show`
          }
        </div>
        <div id="No prepayment needed">
          {NoPaymentPolicy 
            ? <SplitNoPaymentBoldText NoPaymentPolicy={NoPaymentPolicy} />
            : 'SplitNoPaymentBoldText no show'
          }
        </div>
        {ExtraPerks && ExtraPerks.map((perks, index) =>
          {const TruePerks = perks?.category === "airport"
            ? FaPlane
            : perks?.category === "internet"
            ? FaWifi
            : Falcons.FaCheck ;
          
            return (
              <div key={index} id="ExtraBundle">
                <TruePerks /> {perks?.title ?? ''}
              </div>
            )
          }
        )}
      </div>
    )
  }
