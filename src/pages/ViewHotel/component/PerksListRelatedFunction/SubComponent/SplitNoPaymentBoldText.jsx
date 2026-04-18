import * as Falcons from "react-icons/fa";

export default function SplitNoPaymentBoldText({ NoPaymentPolicy }) {
  if (!NoPaymentPolicy) return;
  
  // console.log(`SplitNoPaymentBoldText is Running`, NoPaymentPolicy);
  const ValidIcon = Falcons.FaCheck;

  if (NoPaymentPolicy.includes('<b>No prepayment needed</b>')) {
    const SplitString = NoPaymentPolicy.split(/<\/?b>/);

    return (
      <span style={{ color: 'green' }}>
        <ValidIcon /> <b>{SplitString[1]}</b> {SplitString[2]}
      </span>
    )
  } else if (NoPaymentPolicy) {

    return (
      <span style={{ color: 'green' }}>
        <ValidIcon /> {NoPaymentPolicy}
      </span>
    )
  }
  
}