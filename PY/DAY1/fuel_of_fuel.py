import math

def calc_fuel_of_fuel(fuel,fuel_of_fuel):
  if fuel <= 6:
    return fuel_of_fuel
  current_fuel = math.floor(fuel/3)-2
  fuel_of_fuel += current_fuel
  return calc_fuel_of_fuel(current_fuel,fuel_of_fuel)

def calc_fuel(content):
  total_fuel = 0
  mass = content.splitlines()
  for x in mass:
    total_fuel += calc_fuel_of_fuel(float(x),0)
  return total_fuel

f = open('mass.txt')
print(calc_fuel(f.read()))
f.close()