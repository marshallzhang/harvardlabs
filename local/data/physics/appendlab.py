profs = open('professors.txt','r')
newprofs = open('newprofs.txt','w')
for line in profs:
	newprofs.write(line[:-1] + ' Lab\n')
profs.close()
newprofs.close()