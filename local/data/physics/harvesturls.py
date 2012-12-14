from bs4 import BeautifulSoup

soup = BeautifulSoup(open("facultylist.html"))

bydepartments = {}
bylinks = {}

for block in soup('p'):
	for department in block('span'):
		links = []
		for a in block('a'):
			links.append(a['href'])
		bydepartments[department.string] = links

for topic in bydepartments:
	for x in range(0,len(bydepartments[topic])):
		professor = bydepartments[topic][x]
		ticker = 0
		for link in bylinks:
			if str(professor) != str(link):
				continue
			elif str(professor) == str(link):
				ticker = 1
		if ticker == 1:
			bylinks[professor].append(topic)
		elif ticker == 0:
			bylinks[professor] = [topic]
sorted(bylinks.items())
links = open('urls.txt','a')
for prof in bylinks:
	links.write('http://www.physics.harvard.edu' + prof + '\n')
links.close()