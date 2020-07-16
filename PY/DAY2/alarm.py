def restore_code(content):
  content = content.split(',')
  codes = list(map(lambda x: int(x),content))
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
  return codes[0]    

f = open('alarm_code.txt')
print(restore_code(f.read()))
f.close()