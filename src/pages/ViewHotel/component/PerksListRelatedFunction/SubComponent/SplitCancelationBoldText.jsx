import * as Falcons from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";

export default function SplitCancelationBoldText({ originalcancelationword }) {
  const CancelationValidIcon = 
    originalcancelationword === 'Non-refundable'
    ? Falcons.FaTimes 
    : originalcancelationword === 'Costs first night to cancel'
    ? FaMoneyBill1Wave
    : Falcons.FaCheck;


  if (!originalcancelationword) { 
    return;

  } else if (originalcancelationword.includes('<b>Free cancellation</b>')) {
    const splitCanceltext = originalcancelationword.split(/<\/?b>/);
    return (
      <span style={{ color: 'green' }}>
        <CancelationValidIcon/>{' '}<b>{splitCanceltext[1]}</b>{splitCanceltext[2]}
      </span>
    )

  } else if (originalcancelationword === "Non-refundable") {
    return (
      <div>
        <CancelationValidIcon/>{' '}{originalcancelationword}
      </div>
    )

  } else if (originalcancelationword.includes('Costs first night to cancel')) {
    return (
      <div>
        <CancelationValidIcon/>{' '}{originalcancelationword}
      </div>
    )

  } else {
    return (
      <div>
        <CancelationValidIcon/>{' '}{originalcancelationword}
      </div>
    )

  }
};