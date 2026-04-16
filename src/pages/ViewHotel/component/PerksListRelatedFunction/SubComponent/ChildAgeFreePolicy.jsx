export default function ChildAgeFreePolicy(childAgeString, offer) {
  if (!childAgeString) return;
  const checkChildAge = childAgeString.split(',');
  const fromYoungtoOldAge = checkChildAge.sort((a, b) =>  a - b);
  // console.log("fromYoungtoOldAge", fromYoungtoOldAge);

  const offerMaxAgeForFree = offer.max_children_free_age;
  const offerChildFreeSlot = offer.max_children_free;

  if (
    (fromYoungtoOldAge[0] <= offerMaxAgeForFree) && (offerChildFreeSlot === 1)
  ) {

    return `Free Charge for ${offerChildFreeSlot} of your children 
    (${fromYoungtoOldAge[0]} years old)` 
  
  } else if (
    (fromYoungtoOldAge.some(childElement => childElement <= offerMaxAgeForFree)) && 
    (offerChildFreeSlot === 2)
  ) {
  
    return `Free Charge for ${offerChildFreeSlot} for your children   
    (${fromYoungtoOldAge[0]} and ${fromYoungtoOldAge[1]} years old)`

  } else if (offerChildFreeSlot) {

    return `Free stay for ${offerChildFreeSlot} of your children`

  }
};