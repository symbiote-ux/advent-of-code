const fs = require('fs');

const restoreCode = codes => {
  for (let index = 0; index < codes.length; index += 4) {
    const num1Pos = codes[index + 1];
    const num2Pos = codes[index + 2];
    const outputPos = codes[index + 3];
    if (codes[index] === 1) {
      codes[outputPos] = codes[num1Pos] + codes[num2Pos];
      continue;
    }
    if (codes[index] === 2) {
      codes[outputPos] = codes[num1Pos] * codes[num2Pos];
    }
  }
  return codes[0];
};

const main = () => {
  const content = fs.readFileSync('../DATA/alarmCode.txt', 'utf8');
  const codes = content.split(',').map(code => +code);
  console.log(restoreCode(codes));
};

main();
