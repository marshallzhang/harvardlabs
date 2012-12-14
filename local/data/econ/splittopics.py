raw = open('raw.txt','r')
x = 1
topics = open('topics.txt','a')
interests = open('interests.txt','a')
for line in raw:
	if x % 2 == 1:
		topics.write(line)
		x = x + 1
		print(x)
	else:
		interests.write(line)
		x = x + 1
		print(x)
		
topics.close()
interests.close()
		
		