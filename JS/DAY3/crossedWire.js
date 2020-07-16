const fs = require('fs');

const findDistance = crossPoints => {
  let minDis = Math.abs(0 - crossPoints[0].x) + Math.abs(0 - crossPoints[0].y);
  crossPoints.forEach(point => {
    const distance = Math.abs(0 - point.x) + Math.abs(0 - point.y);
    if (minDis > distance) {
      minDis = distance;
    }
  });
  return minDis;
};

const getPoint = (p1, q1, p2, q2) => {
  const point = {};
  if (p1.x == q1.x) {
    point.x = p1.x;
    point.y = p2.y;
    point.steps = p1.steps + Math.abs(point.y - p1.y) + p2.steps + Math.abs(p2.x - point.x);
    return point;
  }
  point.x = p2.x;
  point.y = p1.y;
  point.steps = p1.steps + Math.abs(point.x - p1.x) + p2.steps + Math.abs(point.y - p2.y);
  return point;
};

const orientation = (p, q, r) => {
  const value = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  if (value > 0) return 1;
  if (value < 0) return 2;
  return 0;
};

const doIntersect = (p1, q1, p2, q2) => {
  const o1 = orientation(p1, q1, p2);
  const o2 = orientation(p1, q1, q2);
  const o3 = orientation(p2, q2, p1);
  const o4 = orientation(p2, q2, q1);
  if (o1 != o2 && o3 != o4) return 1;
  return 0;
};

const findCoordinates = wirePaths => {
  let paths = [];
  let point = { x: 0, y: 0, steps: 0 };
  wirePaths.map(path => {
    const dir = path.slice(0, 1);
    const value = +path.slice(1);
    if (dir == 'R') point.x += value;
    if (dir == 'L') point.x -= value;
    if (dir == 'U') point.y += value;
    if (dir == 'D') point.y -= value;
    const isStepPresent = paths.some(
      ({ x, y }) => point.x === x && point.y === y
    );
    if (!isStepPresent) point.steps += value; 
    paths.push({ ...point });
  });
  return paths;
};

const findClosestPoint = (blueWire, redWire) => {
  const blueWireCord = findCoordinates(blueWire);
  const redWireCord = findCoordinates(redWire);
  const crossPoint = [];
  for (let i = 0; i < blueWireCord.length - 1; i++) {
    const p1 = blueWireCord[i];
    const q1 = blueWireCord[i + 1];
    for (let j = 0; j < redWireCord.length - 1; j++) {
      const p2 = redWireCord[j];
      const q2 = redWireCord[j + 1];
      if (doIntersect(p1, q1, p2, q2)) {
        const point = getPoint(p1, q1, p2, q2);
        crossPoint.push({ ...point });
      }
    }
  }
  let minSteps = crossPoint[0].steps;
  crossPoint.forEach(point => {
    if (minSteps > point.steps) minSteps = point.steps;
  });
  console.log(minSteps);
  const closestDistance = findDistance(crossPoint);
  return closestDistance;
};

const main = () => {
  const content = fs.readFileSync('./DATA/wireCode.txt', 'utf8');
  const paths = content.split('\n');
  const blueWire = paths[0].split(',');
  const redWire = paths[1].split(',');
  findClosestPoint(blueWire, redWire);
};

main();
