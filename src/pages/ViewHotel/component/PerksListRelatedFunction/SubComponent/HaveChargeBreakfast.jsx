export default function HaveChargeBreakfast(breakfastword, isbreakfastincluded) {
  if (breakfastword === "Breakfast included" && isbreakfastincluded === true) {
    // Breakfast included
    return breakfastword;

  } else if (
    breakfastword.includes(`Breakfast included`) 
    && breakfastword.split(' ').length === 8
  ) {
    // Breakfast included Lunch EUR 46 Dinner EUR 62 // length: 8

    const SplitedString = breakfastword.split(/\s+/);
    console.log("SplitedString:", SplitedString);
    return `${SplitedString[0]} ${SplitedString[1]} (Except Other Meals)`; 
    
  } else if (!breakfastword.includes(`Enjoy a convenient`)) {
    // anything
    // Breakfast EUR 999
    return breakfastword;
  
  } else if (
    breakfastword.match(/Enjoy a convenient/g).length > 1
    && breakfastword.split('. ').length === 3
  ) {
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

    return MealsObject;
  } else if (
    breakfastword.includes('Enjoy a convenient') 
    && breakfastword.match(/Enjoy a convenient/g).length === 1
  ) {
    console.log(`5th in HaveChargeBreakfast`);
    
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
}