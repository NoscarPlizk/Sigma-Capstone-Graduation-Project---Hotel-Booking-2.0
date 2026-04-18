import * as Falcons from "react-icons/fa";


export default function HaveChargeBreakfast({ breakfastword, isbreakfastincluded }) {
  if (!breakfastword || isbreakfastincluded === null) return;
  // console.log(`HaveChargeBreakfast is Running:`, breakfastword, isbreakfastincluded);

  const BreakfastIcon = Falcons.FaCoffee;

  const CheckisMealsFree = (MealsData) => {
    // Breakfast EUR 999
    const string = MealsData.split(' ');
    // const mealstype = 'Breakfast';

    if (
      string.length === 3 
      && (string[0] === 'Breakfast' || string[0] === 'Lunch' || string[0] === 'Dinner')
      && /^[A-Z]{3}$/.test(string[1])
      && /^\d+$/.test(string[2])
    ) {
      console.log("CheckisMealsFree:", "true free");
      return true;
    } else {
      console.log("CheckisMealsFree:", "false free");
      return false;
    }
  }



  if (breakfastword === "Breakfast included" && isbreakfastincluded === true) {
    // Breakfast included // FREE MEALS
    console.log("HaveChargeBreakfast:", `1 HaveChargeBreakfast`);
    return (
      <span style={{ color: 'green' }}>
        <BreakfastIcon /> {breakfastword}
      </span> 
    )

  } else if (CheckisMealsFree(breakfastword)) {
    console.log(`2 HaveChargeBreakfast`);
    // Breakfast EUR 999
    return (
      <span>
        <BreakfastIcon /> {breakfastword}
      </span>
    )

  
  } else if (breakfastword.includes(`Breakfast included`) && isbreakfastincluded === true) {
    console.log("HaveChargeBreakfast:", `3 HaveChargeBreakfast`);
    // Breakfast included Lunch EUR 46 Dinner EUR 62 // length: 8
    // Breakfast included in the price Lunch EUR 46 Dinner EUR 62 // length: 11

    const SplitedString = breakfastword.split('\n');
    console.log("SplitedString:", SplitedString);

    const MealsObject = {
      BreakfastInclude: `${SplitedString[0]} `,
      LunchPrice: `${SplitedString[1]}`,
      DinnerPrice: `${SplitedString[2]}`
    }

    return (
      <span style={{ color: 'green' }}>
        <BreakfastIcon /> {MealsObject.BreakfastInclude ?? ''} (Except Other Meals)
      </span>
    )

    
  } else if (
    breakfastword.match(/Enjoy a convenient/g).length === 3
    && breakfastword.split('. ').length === 3
  ) {
    console.log("HaveChargeBreakfast:", `4 HaveChargeBreakfast`);
    // Enjoy a convenient breakfast at the property for EUR 37 per person, per night. 
    // Enjoy a convenient lunch at the property for EUR 81 per person, per night. 
    // Enjoy a convenient dinner at the property for EUR 135 per person, per night.

    const WordArray = breakfastword.split('. ');
    console.log("WordArray:", WordArray);
    const BreakfastString = WordArray[0];
    const LunchString = WordArray[1];
    const DinnerString = WordArray[2];

    function MealReformation(StringText) {
      const CurrencyNPrice = StringText.split(' for ')[1].split(' per person')[0].split(' ');
      const Currency = CurrencyNPrice[0];
      const Price = CurrencyNPrice[1];

      const Meals = StringText.split(' ').find(element => 
        element === 'breakfast' || element === 'lunch' || element === 'dinner'
      );

      return (
        `${Meals.charAt(0).toUpperCase() + Meals.slice(1).toLowerCase()} ${Currency} ${Price}`
      )
    }

    const BreakfastPrice = MealReformation(BreakfastString);
    const LunchPrice = MealReformation(LunchString);
    const DinnerPrice = MealReformation(DinnerString);

    const MealsObject = {
      BreakfastPrice: BreakfastPrice,
      LunchPrice: LunchPrice,
      DinnerPrice: DinnerPrice
    }

    return (
      <span>
        <BreakfastIcon /> {MealsObject.BreakfastPrice} (Per Person Per Night)
      </span>
    )

  } else if (breakfastword.match(/Enjoy a convenient/g).length === 1) {
    console.log("HaveChargeBreakfast:", `5 HaveChargeBreakfast`);
    // Enjoy a convenient breakfast at the property for EUR 37 per person, per night. 
    
    const RephraseFunction = (breakfastword) => {
      const CurrencyNPrice = breakfastword.split(' for ')[1].split(' per person')[0].split(' ');
      const Currency = CurrencyNPrice[0];
      const Price = CurrencyNPrice[1];

      const Meals = breakfastword.split(' ').find(element => 
        element === 'breakfast' || element === 'lunch' || element === 'dinner'
      );      

      return (
        `${Meals.charAt(0).toUpperCase() + Meals.slice(1).toLowerCase()} ${Currency} ${Price}`
      )
    }


    return (
      <span>
        <BreakfastIcon /> {RephraseFunction(breakfastword)}
      </span>
    )
  } else if (!breakfastword) {
    console.log("HaveChargeBreakfast:", `6 HaveChargeBreakfast`);
    // any length string but except free meals
    return (
      <span>
        <BreakfastIcon /> {breakfastword}
      </span>
    )

  } else {
    console.log("HaveChargeBreakfast:", `7 HaveChargeBreakfast`);
    return null;
  }
}