import * as Falcons from "react-icons/fa";

export default function HaveChargeBreakfast({ breakfastword, isbreakfastincluded }) {
  if (!breakfastword || isbreakfastincluded === null) return;
  // console.log(`HaveChargeBreakfast is Running:`, breakfastword, isbreakfastincluded);

  const BreakfastIcon = Falcons.FaCoffee;

  const CheckisMealsFree = (MealsData) => {
    // Breakfast EUR 999
    const string = MealsData.split(' '); // // change to regex form
    // console.log("string:", string);

    if (
      string.length === 3 
      && (string[0] === 'Breakfast' || string[0] === 'Lunch' || string[0] === 'Dinner')
      && /^[A-Z]{3}$/.test(string[1])
      && /^\d+$/.test(string[2])
    ) {
      // console.log("CheckisMealsFree:", "true, is charge");
      return true;
    } else {
      // console.log("CheckisMealsFree:", "false, is free");
      return false;
    }
  }



  if (breakfastword === "Breakfast included" && isbreakfastincluded === true) {
    // Breakfast included // FREE MEALS
    console.log("HaveChargeBreakfast:", `1 condition`);
    return (
      <span style={{ color: 'green' }}>
        <BreakfastIcon /> {breakfastword}
      </span> 
    )

  } else if (CheckisMealsFree(breakfastword) && isbreakfastincluded === false) {
    console.log(`2 HaveChargeBreakfast`);
    // Breakfast EUR 999
    return (
      <span>
        <BreakfastIcon /> {breakfastword}
      </span>
    )

  
  } else if (breakfastword.includes(`Breakfast included`) && isbreakfastincluded === true) {
    console.log("HaveChargeBreakfast:", `2 condition`);
    // Breakfast included Lunch EUR 46 Dinner EUR 62 // length: 8
    // Breakfast included in the price Lunch EUR 46 Dinner EUR 62 // length: 11

    const SplitedString = breakfastword.split('\n');
    // console.log("SplitedString:", SplitedString);

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

    
  } else if (breakfastword.split(/\s+/g).length === 9) {
    console.log("HaveChargeBreakfast:", `3 condition`);
    // Breakfast MYR 131 Lunch MYR 212 Dinner MYR 286 // length: 9

    const SplitedString = breakfastword.split('\n');
    // console.log("SplitedString:", SplitedString);

    const MealsObject = {
      BreakfastPrice: `${SplitedString[0]} `,
      LunchPrice: `${SplitedString[1]}`,
      DinnerPrice: `${SplitedString[2]}`
    }

    return (
      <span style={{ color: 'green' }}>
        <BreakfastIcon /> {MealsObject.BreakfastPrice ?? ''} (Other Meals)
      </span>
    )

    
  } else if (
    breakfastword.match(/Enjoy a convenient/g)
    && breakfastword.match(/Enjoy a convenient/g).length === 3
    && breakfastword.split('. ').length === 3
  ) {
    console.log("HaveChargeBreakfast:", `4 condition`);
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

  } else if (
    breakfastword.match(/Enjoy a convenient/g) 
    && breakfastword.match(/Enjoy a convenient/g).length === 1
  ) {
    console.log("HaveChargeBreakfast:", `5 condition`);
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
    console.log("HaveChargeBreakfast:", `6 condition`);
    // any length string but except free meals
    return (
      <span>
        <BreakfastIcon /> {breakfastword}
      </span>
    )

  } else {
    console.log("HaveChargeBreakfast:", `7 condition`);
    return null;
  }
}