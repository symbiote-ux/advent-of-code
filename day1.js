const fs = require('fs');

const calculateFuel = content => {
  const masses = content.split('\n');
  let totalMass = 0;
  masses.forEach(mass => {
     totalMass += Math.floor(mass / 3) - 2;
  });
  return totalMass;
};

const main = () => {
  const content = fs.readFileSync('./mass.txt','utf8');
  console.log(calculateFuel(content));
};

main();
