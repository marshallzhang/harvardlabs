f = open('interestslist','r')
o = open('finalinterestlist.txt','w')
for line in f:
	for ending in ['.\n',',\n']:
		if line.endswith(ending):
			print("hello")
			line = line[:-2] + '.\n'
	for ending in ['. \n',', \n']:
		if line.endswith(ending):
			line = line[:-3] + '.\n'
	if not line.endswith('.\n'):
		line = line[:-1] + '.\n'
	line.strip()
	o.write(line)