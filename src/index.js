module.exports = function toReadable(number) {
  let result;
  const strNum = number.toString();
  const wordNumber = {
    ones: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
    secondTen: ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
    tens: ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
  };

  function getOnes(num) {
    return wordNumber.ones[num];
  }

  function getSecondTen(num) {
    return wordNumber.secondTen[num];
  }

  function getTens(num) {
    const firstDigit = +num[0];
    const secondDigit = +num[1];
    let word = wordNumber.tens[firstDigit - 2];
    if (secondDigit > 0) word = `${word} ${getOnes(secondDigit)}`;
    return word;
  }

  function getTwoDigitWord(num) {
    return +num < 20 ? getSecondTen(num[1]) : getTens(num);
  }

  function getThreeDigitWord(num) {
    let word = `${getOnes(num[0])} hundred`;
    if (num[1] > 0) word = `${word} ${getTwoDigitWord(num.slice(1, 3))}`;
    else if (num[2] > 0) {
      word = `${word} ${getOnes(num[2])}`;
    }
    return word;
  }

  function getFourDigitWord(num) {
    let word = `${getOnes(num[0])} thousand`;
    if (num[1] > 0) word = `${word} ${getThreeDigitWord(num.slice(1, 4))}`;
    else if (num[2] > 0) word = `${word} ${getTwoDigitWord(num.slice(2, 4))}`;
    else if (num[3] > 0) word = `${word} ${getOnes(num[3])}`;
    return word;
  }

  function getFiveDigitWord(num) {
    let word = `${getTwoDigitWord(num.slice(0, 2))} thousand`;
    if (num[2] > 0) word = `${word} ${getThreeDigitWord(num.slice(2, 5))}`;
    else if (num[3] > 0) word = `${word} ${getTwoDigitWord(num.slice(3, 5))}`;
    else if (num[4] > 0) word = `${word} ${getOnes(num[4])}`;
    return word;
  }

  function getSixDigitWord(num) {
    let word = `${getThreeDigitWord(num.slice(0, 3))} thousand`;
    if (num[3] > 0) word = `${word} ${getThreeDigitWord(num.slice(3, 6))}`;
    else if (num[4] > 0) word = `${word} ${getTwoDigitWord(num.slice(4, 6))}`;
    else if (num[5] > 0) word = `${word} ${getOnes(num[5])}`;
    return word;
  }

  function getSevenDigitWord(num) {
    let word = `${num[0]} million`;
    if (num[1] > 0) word = `${word} ${getSixDigitWord(num.slice(1, 7))}`;
    else if (num[2] > 0) word = `${word} ${getFiveDigitWord(num.slice(2, 7))}`;
    else if (num[3] > 0) word = `${word} ${getFourDigitWord(num.slice(3, 7))}`;
    else if (num[4] > 0) word = `${word} ${getThreeDigitWord(num.slice(4, 7))}`;
    else if (num[5] > 0) word = `${word} ${getTwoDigitWord(num.slice(5, 7))}`;
    else if (num[6] > 0) word = `${word} ${getOnes(num[6])}`;
    return word;
  }

  switch (strNum.length) {
    case 1:
      result = getOnes(strNum);
      break;

    case 2:
      result = getTwoDigitWord(strNum);
      break;

    case 3:
      result = getThreeDigitWord(strNum);
      break;

    case 4:
      result = getFourDigitWord(strNum);
      break;

    case 5:
      result = getFiveDigitWord(strNum);
      break;

    case 6:
      result = getSixDigitWord(strNum);
      break;

    case 7:
      result = getSevenDigitWord(strNum);
      break;

    default:
      result = 'error';
  }
  
  return result;
}

