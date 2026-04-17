import * as Falcons from "react-icons/fa";

export default function SplitNoPaymentBoldText({ NoPaymentPolicy }) {
  const ValidIcon = Falcons.FaTimes;

  if (!NoPaymentPolicy && !NoPaymentPolicy.includes('<b>No prepayment needed</b>')) {
    return;
  } 
  
  const SplitString = NoPaymentPolicy.split(/<\/?b>/);

  return (
    <span style={{ color: 'green' }}>
      <ValidIcon /> <b>{SplitString[1]}</b> {SplitString[2]}
    </span>
  )
}