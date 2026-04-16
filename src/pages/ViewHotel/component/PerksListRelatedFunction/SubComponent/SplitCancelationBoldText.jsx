export default function SplitCancelationBoldText(originalcancelationword) {
  if (!originalcancelationword) { 
    return;
  } else if (originalcancelationword === "Non-refundable") {
    return originalcancelationword;
  } else if (originalcancelationword.includes('<b>Free cancellation</b>')) {
    return originalcancelationword.split(/<\/?b>/);
  } else if (originalcancelationword.includes('Costs first night to cancel')) {
    return originalcancelationword;
  } else {
    return originalcancelationword;
  }
};