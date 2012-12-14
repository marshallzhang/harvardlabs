from bs4 import BeautifulSoup

soup = BeautifulSoup(open("tags.html"))
mapping = {}
#temp = open('temp.txt','a')
#for topic in soup('tr'):
#	for professor in soup('tr'):
#		for line in professor:
#			line = str(line)
#			temp.write(line)
#	temp.close()
	
temp = BeautifulSoup(open('temp.txt'))
for topics in temp('td'):
	topic = topics.string
	labs = []
	if str(topic) != 'None' or str(topic) == 'Zhou Laboratory':
		for profs in temp('td'):
			prof = profs.find('a')
			labs.append(profs)
	mapping[topic] = [labs]
print(mapping)

	#topics = topic.string
	#if str(topics) != 'None' or str(topics) == 'Zhou Laboratory':
	#	mapping[topics] = [1,2]
#print(mapping)
