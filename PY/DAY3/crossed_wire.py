def callback( paths, path, point ):
  direction = path[0] 
  value = int(path.slice(1))
  if(direction is 'R') : point.x += value
  if(direction is 'L') : point.x -= value
  if(direction is 'U') : point.y += value
  if(direction is 'D') : point.y -= value
  def check_if_match( prev_point ) :
    return prev_point.x is point.x and prev_point.y is point.y
  is_step_present = any( check_if_match for prev_point in paths)
  if( not is_step_present): point.steps += value
  paths.append(point.copy())
  return paths

def find_cord( wire ):
  paths = []
  point = { 'x': 0, 'y': 0, 'steps': 0 }
  result = list(map( lambda path: callback( paths, path, point), wire))
  return result

def find_closest_point(wire1,wire2) :
  wire1_cord = find_cord(wire1)
  wire2_cord = find_cord(wire2)
  print(wire1_cord)
  print(wire2_cord)

f = open('./wireCode.txt')
content = f.read()
paths = content.splitlines()
wire1,wire2 = paths
wire1 = wire1.split(',')
wire2 = wire2.split(',')
find_closest_point(wire1, wire2)