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


    const isbreakfastincluded = offer?.breakfast_included > 0 ? true : false;
    const breakfastword = offer?.mealplan ?? '';
    console.log("breakfastword:", breakfastword); 
    
    // Breakfast included
    
    // Enjoy a convenient breakfast at the property for MYR 100 per person, per night.

    // Enjoy a convenient breakfast at the property for EUR 37 per person, per night. 
    // Enjoy a convenient lunch at the property for EUR 81 per person, per night. 
    // Enjoy a convenient dinner at the property for EUR 135 per person, per night.

    // Breakfast EUR 999 // length: 17-20

    // Breakfast EUR 999 Lunch EUR 46 Dinner EUR 62 // length: 9
    // Breakfast included Lunch EUR 46 Dinner EUR 62 // length: 8


    // console.log("breakfastword:", breakfastword);

    const MealsData = breakfastword ? HaveChargeBreakfast(breakfastword, isbreakfastincluded) : null;
    console.log("MealsData:", MealsData);
    const BreakfastIcon = Falcons.FaCoffee;
    const CheckisMealswithPrice = (MealsData) => {
      const string = MealsData.split(' ');
      const mealstype = 'Breakfast';

      if (
        string.length === 3 
        && string[0] === mealstype
        && /^[A-Z]{3}$/.test(string[1])
        && /^\d+$/.test(string[2])
      ) {
        console.log("CheckisMealswithPrice:", "true");
        return true;
      }
    }


    const originalcancelationword = offer?.policy_display_details?.
    cancellation?.title_details?.translation;    
    const splitCanceltext = SplitCancelationBoldText(originalcancelationword);
    const CancelationValidIcon = 
      originalcancelationword === 'Non-refundable'
      ? Falcons.FaTimes 
      : originalcancelationword === 'Costs first night to cancel'
      ? FaMoneyBill1Wave
      : Falcons.FaCheck;


    const childAgeFreeText = ChildAgeFreePolicy(childAgeString, offer);
    const ChildIcon = FaChild;
    

    const NoPaymentPolicy = offer?.policy_display_details?.prepayment?.title_details?.translation ?? '';
    const splitNoPaymentText = SplitNoPaymentBoldText(NoPaymentPolicy);
    const ValidIcon = Falcons.FaTimes;
    console.log("splitNoPaymentText:", splitNoPaymentText);

    
    const ExtraPerks = offer?.bundle_extras?.benefits ?? [];




    return (
      <div className="d-flex flex-column gap-1">
        <div id='breakfast'>
          {
            MealsData === "Breakfast included" 
            ? <span style={{ color: 'green' }}>
                <BreakfastIcon /> {MealsData}
              </span> 
            // : !MealsData.includes(`Enjoy a convenient`)
            : CheckisMealswithPrice(MealsData)
            ? <span>
                <BreakfastIcon /> {MealsData} (Per Person Per Night)
              </span> 
            : <span>
                <BreakfastIcon /> {MealsData.BreakfastPrice} (Per Person Per Night 2)
              </span> 
            }
        </div>
        <div id='Cancelation Policies' >
          {(splitCanceltext === "Non-refundable")
            ? <div>
                <CancelationValidIcon/>{' '}{splitCanceltext}
              </div>
            : ((splitCanceltext) && (originalcancelationword.includes('<b>Free cancellation</b>')))
            ? <span style={{ color: 'green' }}>
                <CancelationValidIcon/>{' '}<b>{splitCanceltext[1]}</b>{splitCanceltext[2]}
              </span>
            : ((splitCanceltext) && (originalcancelationword === 'Costs first night to cancel')) 
            ? <div>
                <CancelationValidIcon/>{' '}{splitCanceltext}
              </div>
            : <div>
                <CancelationValidIcon/>{' '}{splitCanceltext}
              </div>
          }
        </div>
        <div id="ChildAgeFreePolicy">
          {childAgeFreeText 
            ? <span style={{ color: 'green' }}>
                <ChildIcon /> {childAgeFreeText} 
              </span> 
            : ''}
        </div>
        <div id="No prepayment needed">
          {splitNoPaymentText ? 
            <span style={{ color: 'green' }}>
              <div>
                <ValidIcon /> <b>{splitNoPaymentText[1]}</b> {splitNoPaymentText[2]}
              </div>
            </span>
          : ''}
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
