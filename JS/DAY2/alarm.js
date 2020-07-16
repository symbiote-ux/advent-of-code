const fs = require('fs');

const updateCode = () => {
  for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
      const content = fs.readFileSync('DATA/alarmCode.txt', 'utf8');
      const codes = content.split(',').map(code => +code);
      codes[1] = i;
      codes[2] = j;
      const result = restoreCode(codes);
      if (result[0] === 19690720) {
        return result;
      }
    }
  }
};

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
  return codes;
};

const main = () => {
  const result = updateCode();
  console.log(result[1], result[2]);
};

main();
