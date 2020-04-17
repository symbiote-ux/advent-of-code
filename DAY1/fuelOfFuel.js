const fs = require('fs');

const calculateFuelOfFuel = (fuel,fuelOfFuel) => {
  if(fuel <=6) {
    return fuelOfFuel;
  }
   const currentFuel = Math.floor(fuel/3)- 2;
   fuelOfFuel += currentFuel;
  return calculateFuelOfFuel(currentFuel,fuelOfFuel);
}

const calculateFuel = content => {
  const masses = content.split('\n');
  let totalFuel = 0;
  masses.forEach(mass => {
      totalFuel += calculateFuelOfFuel(mass,0);
  })
  return totalFuel;
}

const main = () => {
  const content = fs.readFileSync('./DATA/mass.txt', 'utf8');
  console.log(calculateFuel(content));
};

main();
