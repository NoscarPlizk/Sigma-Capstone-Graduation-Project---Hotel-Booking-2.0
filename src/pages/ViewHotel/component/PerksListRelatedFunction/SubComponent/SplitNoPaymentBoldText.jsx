export default function SplitNoPaymentBoldText(NoPaymentPolicy) {
  if (!NoPaymentPolicy) {
    return;
  } else if (
    NoPaymentPolicy 
    && !NoPaymentPolicy.includes('<b>No prepayment needed</b>')
  ) {
    return;
  }
  
  return NoPaymentPolicy.split(/<\/?b>/);
}