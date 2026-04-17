import { FaChild } from "react-icons/fa";

export default function ChildAgeFreePolicy({ childAgeString, offer }) {
  const ChildIcon = FaChild;

  if (!childAgeString) return;
  console.log("childAgeString in ChildAgeFreePolicy:", childAgeString);
  const checkChildAge = childAgeString.split(',');
  const fromYoungtoOldAge = checkChildAge.sort((a, b) =>  a - b);
  // console.log("fromYoungtoOldAge", fromYoungtoOldAge);

  const offerMaxAgeForFree = offer.max_children_free_age;
  const offerChildFreeSlot = offer.max_children_free;

  let ReturningString = '';

  if ((fromYoungtoOldAge[0] <= offerMaxAgeForFree) && (offerChildFreeSlot === 1)) {    
    ReturningString = `Free Charge for ${offerChildFreeSlot} of your children 
    (${fromYoungtoOldAge[0]} years old)`;
  
  } else if (
    (fromYoungtoOldAge.some(childElement => childElement <= offerMaxAgeForFree)) 
    && (offerChildFreeSlot === 2)
  ) {
    ReturningString = `Free Charge for ${offerChildFreeSlot} for your children 
    (${fromYoungtoOldAge[0]} and ${fromYoungtoOldAge[1]} years old)`;
    
  } else if (offerChildFreeSlot) {
    ReturningString = `Free stay for ${offerChildFreeSlot} of your children`;
  }

  return (
    <span style={{ color: 'green' }}>
      <ChildIcon /> {ReturningString}
    </span> 
  )
};