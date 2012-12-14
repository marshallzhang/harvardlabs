from bs4 import BeautifulSoup

soup = BeautifulSoup(open("facultylist.html"))

bydepartments = {}
byprofs = {'Cohen':['hi']}

for block in soup('p'):
	for department in block('span'):
		profs = []
		for a in block('a'):
			profs.append(a.string)
		bydepartments[department.string] = profs

for topic in bydepartments:
	for x in range(0,len(bydepartments[topic])):
		professor = bydepartments[topic][x]
		ticker = 0
		for prof in byprofs:
			if str(professor) != str(prof):
				continue
			elif str(professor) == str(prof):
				ticker = 1
		if ticker == 1:
			byprofs[professor].append(topic)
		elif ticker == 0:
			byprofs[professor] = [topic]
				
profs = open('professors.txt','a')
for prof in byprofs:
	profs.write(prof + '\n')
profs.close()

topics = open('topics.txt','a')
for prof in byprofs:
	for x in range(0,len(byprofs[prof])):
		topics.write(byprofs[prof][x] + ', ')
	topics.write('\n')
topics.close()