const isPair = list => {
  let numbers = [];
  list.forEach(num => {
    const index = numbers.findIndex(element => element[0] === num);
    if (index === -1) {
      numbers.push([num]);
    } else {
      numbers[index].push(num);
    }
  });
  return numbers.some(num => num.length === 2);
};

const isAdjacent = list => {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === list[i + 1]) return 1;
  }
  return 0;
};

const isInAscendingOrder = list => {
  for (let i = 0; i < list.length; i++) {
    if (list[i] > list[i + 1]) return 0;
  }
  return 1;
};

const decipherCode = (minValue, maxValue) => {
  let possibleCom = [];
  for (let num = minValue; num <= maxValue; num++) {
    const numbers = num.toString();
    const list = numbers.split('').map(e => +e);
    if (isInAscendingOrder(list) && isAdjacent(list) && isPair(list)) {
      possibleCom.push(num);
    }
  }
  return possibleCom.length;
};

const main = () => {
  const minValue = 206938;
  const maxValue = 679128;
  console.log(decipherCode(minValue, maxValue));
};

main();
