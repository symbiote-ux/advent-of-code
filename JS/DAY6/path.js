const fs = require('fs');

const calcDirectPath = (yourPath, santaPath) => {
  for (let i = 0; i < yourPath.length; i++) {
    for (let j = 0; j < santaPath.length; j++) {
      if (yourPath[i] === santaPath[j]) {
        const path1 = yourPath.slice(1, i);
        const path2 = santaPath.slice(1, j);
        const totalOrbit = path1.length + path2.length;
        return totalOrbit;
      }
    }
  }
};

const getNext = (orbits, start) => {
  let next = '';
  orbits.forEach(orbit => {
    if (start.includes(orbit[1])) next = orbit[0];
  });
  return next;
};

const getPath = (orbits, start) => {
  let path = [start];
  let next = '';
  while (start != 'COM') {
    next = getNext(orbits, start);
    path.push(next);
    start = next;
  }
  return path;
};

const calcTotalOrbits = orbits => {
  const yourPath = getPath(orbits, 'YOU');
  const santaPath = getPath(orbits, 'SAN');
  const directPath = calcDirectPath(yourPath, santaPath);
  return directPath;
};

const main = () => {
  const content = fs.readFileSync('./orbit.txt', 'utf8');
  const orbits = content.split('\n').map(e => e.split(')'));
  console.log(calcTotalOrbits(orbits));
};

main();
