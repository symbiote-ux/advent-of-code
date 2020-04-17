const fs = require('fs');

const calculateFuel = content => {
  const masses = content.split('\n');
  let totalFuel = 0;
  masses.forEach(mass => {
     totalFuel += Math.floor(mass / 3) - 2;
  });
  return totalFuel;
};

const main = () => {
  const content = fs.readFileSync('./DATA/mass.txt','utf8');
  console.log(calculateFuel(content));
};

main();
