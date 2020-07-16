def restore_code(codes):
  limit = range(0,len(codes)-1,4)
  for index in limit: 
    num_1_pos = codes[index + 1]
    num_2_pos = codes[index + 2]
    output_pos = codes[index + 3]
    if codes[index] is 1:
      codes[output_pos] = codes[num_1_pos] + codes[num_2_pos]
      continue
    if codes[index] is 2:
      codes[output_pos] = codes[num_1_pos] * codes[num_2_pos]
  return codes

def update_code(content):
  i = j = range(100)
  for x in i:
    for y in j:
      codes = list(content)
      codes[1] = x
      codes[2] = y
      result = restore_code(codes)
      if result[0] == 19690720:
        return result

f = open('alarm_code.txt')
content = f.read()
content = content.split(',')
codes = list(map(lambda x: int(x),content))      
result = update_code(codes)
print(result[1],result[2])

  