import urllib.request

urls = open("urls.txt","r")

# for each professor's page
for prof in urls:
	
	print(prof)
	
	# get full address of page
	url = "https://www.seas.harvard.edu/directory/" + prof
	
	# get site data
	page = urllib.request.urlopen(url)
	tempdata = page.read()
	data = tempdata.decode("utf8")
	
	links = open("links.txt","a")
	start = data.find('<ul class="websitesList">') + 39
	tempend = data.rfind("</a></li>")
	end = int(start + (((tempend - start) / 2) - 2))
	link = data[start:end]
	links.write(link + '\n')
	links.close()
	
	# put data into temp.txt
	temppage = open("temp.txt","w")
	temppage.write(data)
	temppage.close()
	
	# open temppage to read
	temppage = open("temp.txt","r")
	
	#for each line, find research topics of professor
	interests = open("interests.txt","a")
	topics = open("topics.txt","a")
	topics.write('\n')
	interests.write('\n')
	for line in temppage:
		if ('researchParent' in line) and ('</li>' in line):
			topic = line[line.find('researchParent') + 16:line.find('</li>')]
			topics.write(topic + ', ')		
		if ('researchChild' in line) and ('</li>' in line):
			interest = line[line.find('researchChild') + 16:line.find('</li>')]
			interests.write(interest + ', ')
	links.close()
	interests.close()
		
	