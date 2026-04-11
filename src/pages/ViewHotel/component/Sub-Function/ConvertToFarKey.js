export default function ConvertToFarKey(iconKey) {
    const newWord = 
      "Fa" + iconKey
      .toLowerCase()
      .split(/[_\-\s]+/)
      .map(string => string ? string[0].toUpperCase() + string.slice(1) : "" )
      .join("");
    return newWord;
  }