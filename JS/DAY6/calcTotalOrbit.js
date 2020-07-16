const fs = require('fs');

const countOrbit = pathList => {
  let count = 0;
  pathList.forEach((path, index) => {
    count += index * path.length;
  });
  return count;
};

const getNext = (orbits, start) => {
  let next = [];
  orbits.forEach(orbit => {
    if (start.includes(orbit[0])) next.push(orbit[1]);
  });
  return next;
};

const calcTotalOrbits = orbits => {
  let pathList = [['COM']];
  let start = ['COM'];
  let next = [];
  let index = 0;
  while (index < orbits.length) {
    next = getNext(orbits, start);
    pathList.push([...next]);
    start = next;
    index++;
  }
  console.log(pathList);
  const totalOrbit = countOrbit(pathList);
  return totalOrbit;
};

const main = () => {
  const content = fs.readFileSync('./sample.txt', 'utf8');
  const orbits = content.split('\n').map(e => e.split(')'));
  console.log(calcTotalOrbits(orbits));
};

main();
