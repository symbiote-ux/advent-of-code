import math

def calc_fuel(content):
  mass = content.splitlines()
  total_fuel = 0
  for x in mass:
    total_fuel += math.floor(float(x) / 3) - 2
  return total_fuel  

f = open('mass.txt')
print(calc_fuel(f.read()))
f.close()